import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

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

// Read-only preview of a promo code benefit (no redemption yet).
// Actual redemption happens at payment time via redeem_promo.
export async function POST(req: Request) {
  try {
    const { code, baseAmountCents } = await req.json();
    if (!code || !Number.isInteger(baseAmountCents) || baseAmountCents <= 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const supabase = routeClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createServerSupabaseAdmin();
    const { data: promo, error } = await admin.rpc('peek_promo', { p_code: code });

    if (error || !promo || !promo.length || !promo[0].valid) {
      return NextResponse.json(
        { error: promo?.[0]?.reason ?? 'Invalid promo code' },
        { status: 400 },
      );
    }

    const p = promo[0];
    const grantedCreditsCents =
      p.promo_type === 'contractor_bonus'
        ? Math.round((baseAmountCents * p.bonus_bps) / 10000)
        : 0;
    const grantedOffCents =
      p.promo_type === 'homeowner_discount'
        ? Math.round((baseAmountCents * p.discount_bps) / 10000)
        : 0;

    return NextResponse.json({
      valid: true,
      code: p.code,
      promoType: p.promo_type,
      discountBps: p.discount_bps,
      bonusBps: p.bonus_bps,
      grantedOffCents,
      grantedCreditsCents,
    });
  } catch (err) {
    console.error('promos/apply error', err);
    return NextResponse.json({ error: 'Failed to validate promo' }, { status: 500 });
  }
}