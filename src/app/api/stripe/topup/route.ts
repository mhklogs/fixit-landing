import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

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

// Contractors top up their prepaid wallet via Stripe.
// A $0.30 bid fee is later deducted per bid from this balance.
export async function POST(req: Request) {
  try {
    const { amountCents, promoCode } = await req.json();
    if (!Number.isInteger(amountCents) || amountCents < 100 || amountCents > 1_000_000) {
      return NextResponse.json(
        { error: 'amountCents must be between 100 and 1,000,000' },
        { status: 400 },
      );
    }

    const supabase = routeClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createServerSupabaseAdmin();
    const { data: profile } = await admin
      .from('contractor_profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { error: 'Only contractors can top up a wallet' },
        { status: 403 },
      );
    }

    const { data: wallet } = await admin
      .from('wallets')
      .select('id')
      .eq('contractor_id', user.id)
      .single();

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not created' }, { status: 500 });
    }

    // If a promo code is supplied, redeem it for bonus credits now.
    // The bonus is credited to the wallet in the webhook when payment succeeds.
    let promoBonusCents = 0;
    let promoRedemptionId: string | null = null;

    if (promoCode) {
      const { data: redemption, error: promoError } = await admin.rpc('redeem_promo', {
        p_code: promoCode,
        p_user_id: user.id,
        p_base_amount_cents: amountCents,
        p_ref_type: 'topup',
        p_ref_id: null,
      });
      if (promoError) {
        return NextResponse.json({ error: promoError.message }, { status: 400 });
      }
      promoRedemptionId = redemption.id;
      promoBonusCents = redemption.granted_credits_cents;
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        purpose: 'wallet_topup',
        wallet_id: wallet.id,
        contractor_id: user.id,
        promo_redemption_id: promoRedemptionId ?? '',
        promo_bonus_cents: String(promoBonusCents),
      },
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      promoBonusCents,
      promoApplied: promoBonusCents > 0,
    });
  } catch (err) {
    console.error('stripe/topup error', err);
    return NextResponse.json({ error: 'Failed to create top-up' }, { status: 500 });
  }
}