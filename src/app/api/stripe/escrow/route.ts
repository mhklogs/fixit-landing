import { NextResponse } from 'next/server';
import { stripe, PLATFORM_FEE_BPS } from '@/lib/stripe';
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

// Homeowner authorizes payment for an accepted bid.
// Funds are HELD (manual capture) in escrow until the job completes.
export async function POST(req: Request) {
  try {
    const { jobId, bidId, promoCode } = await req.json();
    if (!jobId || !bidId) {
      return NextResponse.json({ error: 'jobId and bidId required' }, { status: 400 });
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
      .select('id, job_id, amount_cents, platform_fee_cents, contractor_share_cents, status')
      .eq('job_id', jobId)
      .eq('bid_id', bidId)
      .single();

    if (!escrow || escrow.status !== 'pending') {
      return NextResponse.json({ error: 'No pending escrow' }, { status: 400 });
    }

    // Verify this homeowner owns the job (defense in depth against RLS bypass)
    const { data: job } = await admin
      .from('jobs')
      .select('homeowner_id')
      .eq('id', jobId)
      .single();

    if (!job || job.homeowner_id !== user.id) {
      return NextResponse.json({ error: 'Not your job' }, { status: 403 });
    }

    // application_fee_amount is deducted by Stripe at capture and routed to platform
    let amountToCharge = escrow.amount_cents;
    let promoRedemptionId: string | null = null;
    let promoAppliedCents = 0;

    if (promoCode) {
      const { data: redemption, error: promoError } = await admin.rpc('redeem_promo', {
        p_code: promoCode,
        p_user_id: user.id,
        p_base_amount_cents: escrow.amount_cents,
        p_ref_type: 'escrow',
        p_ref_id: escrow.id,
      });
      if (promoError) {
        return NextResponse.json({ error: promoError.message }, { status: 400 });
      }
      promoRedemptionId = redemption.id;
      promoAppliedCents = redemption.granted_off_cents;
      amountToCharge = escrow.amount_cents - promoAppliedCents;
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountToCharge,
      currency: 'usd',
      capture_method: 'manual',
      automatic_payment_methods: { enabled: true },
      metadata: {
        purpose: 'job_escrow',
        job_id: jobId,
        escrow_id: escrow.id,
        promo_redemption_id: promoRedemptionId ?? '',
        promo_applied_cents: String(promoAppliedCents),
      },
    });

    await admin
      .from('escrows')
      .update({
        stripe_payment_intent: intent.id,
        status: 'held',
      })
      .eq('id', escrow.id);

    return NextResponse.json({
      clientSecret: intent.client_secret,
      fullAmountCents: escrow.amount_cents,
      promoAppliedCents,
    });
  } catch (err) {
    console.error('stripe/escrow error', err);
    return NextResponse.json({ error: 'Failed to hold escrow' }, { status: 500 });
  }
}