import { NextResponse } from 'next/server';
import { getOrCreateConnectAccount, stripe } from '@/lib/stripe';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { contractorId } = await req.json();
    if (!contractorId) {
      return NextResponse.json({ error: 'contractorId required' }, { status: 400 });
    }

    // Resolve email from profiles
    const supabase = createServerSupabaseAdmin();
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .eq('id', contractorId)
      .single();

    // Profiles table may not mirror email; fetch from auth when needed.
    const email = profile?.email ?? (await resolveAuthEmail(supabase, contractorId));

    const { account, fresh } = await getOrCreateConnectAccount(contractorId, email);

    if (fresh) {
      const { error: updateError } = await supabase
        .from('contractor_profiles')
        .update({ stripe_connect_id: account.id })
        .eq('id', contractorId);
      if (updateError) throw updateError;
    }

    // If account is already complete, no need to re-onboard.
    const chargeEnabled =
      account.capabilities?.transfers === 'active' &&
      account.charges_enabled !== false;

    let url: string | null = null;
    if (!chargeEnabled) {
      const link = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${req.headers.get('origin') ?? 'http://localhost:3000'}/onboarding?error=refresh`,
        return_url: `${req.headers.get('origin') ?? 'http://localhost:3000'}/dashboard?stripe=complete`,
        type: 'account_onboarding',
      });
      url = link.url;
    }

    return NextResponse.json({ url, accountId: account.id, complete: chargeEnabled });
  } catch (err) {
    console.error('stripe/connect error', err);
    return NextResponse.json({ error: 'Failed to create Stripe account' }, { status: 500 });
  }
}

async function resolveAuthEmail(
  supabase: ReturnType<typeof createServerSupabaseAdmin>,
  userId: string,
): Promise<string> {
  const { data } = await supabase.auth.admin.getUserById(userId);
  return data.user?.email ?? 'contractor@fixit.local';
}