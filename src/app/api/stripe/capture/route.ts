import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function routeClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    },
  );
}

// Homeowner confirms completion → capture the held PaymentIntent
// so Stripe routes 96–97% to the contractor and the fee to the platform.
// The DB escrow release + wallet payout is orchestrated by RPC release_escrow().
export async function POST(req: Request) {
  try {
    const { jobId, rating, reviewComment, tipCents } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: 'jobId required' }, { status: 400 });
    }

    const supabase = routeClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createServerSupabaseAdmin();

    const { data: escrow } = await admin
      .from('escrows')
      .select('id, stripe_payment_intent, amount_cents, platform_fee_cents, contractor_id, jobs!inner(homeowner_id, contractor_id)')
      .eq('job_id', jobId)
      .eq('status', 'held')
      .single();

    if (!escrow?.stripe_payment_intent) {
      return NextResponse.json({ error: 'No held escrow to release' }, { status: 400 });
    }

    const job = Array.isArray(escrow.jobs) ? escrow.jobs[0] : escrow.jobs;
    if (!job || job.homeowner_id !== user.id) {
      return NextResponse.json({ error: 'Not your job' }, { status: 403 });
    }

    // Capture the previously-held funds. Stripe transfers the contractor
    // share to their Connect account minus the platform fee automatically
    // because we created the PaymentIntent with application_fee_amount.
    const intent = await stripe.paymentIntents.capture(escrow.stripe_payment_intent);

    // Journal the payout to the contractor's internal wallet + release escrow.
    const { error: rpcError } = await admin.rpc('release_escrow', {
      p_job_id: jobId,
      p_rating: rating ?? null,
      p_review_comment: reviewComment ?? null,
      p_tip_cents: tipCents ?? null,
    });

    if (rpcError) {
      console.error('release_escrow RPC failed', rpcError);
      // Do not fail the whole request; funds are captured. Surface to support.
      return NextResponse.json(
        { success: true, warning: 'funds captured but payout journal failed', rpcError },
        { status: 200 },
      );
    }

    return NextResponse.json({ success: true, intent: intent.id });
  } catch (err) {
    console.error('stripe/capture error', err);
    return NextResponse.json({ error: 'Failed to release escrow' }, { status: 500 });
  }
}