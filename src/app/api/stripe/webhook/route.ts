import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic'; // exclude from caching

// Handle Stripe webhooks:
//  - payment_intent.succeeded (wallet top-up)  -> credit wallet
//  - payment_intent.amount_capturable_updated  -> escrow held (money present)
//  - payment_intent.succeeded (job capture)    -> already released via RPC
//  - account.updated                           -> contractor stripe status sync
export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'missing signature' }, { status: 400 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error('webhook signature verification failed', err);
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  const supabase = createServerSupabaseAdmin();

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        const meta = pi.metadata ?? {};
        const id = pi.id ?? event.data.object.id;

        if (meta.purpose === 'wallet_topup') {
          await creditWalletTopUp(supabase, { id, amount_received: pi.amount_received }, meta);
        }
        break;
      }

      case 'payment_intent.amount_capturable_updated': {
        // Funds are now actually held by Stripe for the escrow.
        const pi = event.data.object;
        const customId = pi.metadata?.escrow_id;
        if (customId) {
          await supabase
            .from('escrows')
            .update({ status: 'held', updated_at: new Date().toISOString() })
            .eq('id', customId);
        }
        break;
      }

      case 'account.updated': {
        const account = event.data.object;
        const contractorId = account.metadata?.contractor_id;
        if (contractorId && account.id) {
          const transfersActive = account.capabilities?.transfers === 'active';
          await supabase
            .from('contractor_profiles')
            .update({
              stripe_account_status: transfersActive ? 'active' : account.details_submitted ? 'submitted' : 'incomplete',
            })
            .eq('id', contractorId);
        }
        break;
      }

      default:
        // unknown event — acknowledge
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('webhook handler error', err);
    return NextResponse.json({ error: 'webhook failed' }, { status: 500 });
  }
}

async function creditWalletTopUp(
  supabase: ReturnType<typeof createServerSupabaseAdmin>,
  paymentIntent: { id: string; amount_received: number },
  metadata: Record<string, string>,
) {
  const { wallet_id: walletId, contractor_id: contractorId } = metadata;
  if (!walletId || !contractorId) return;

  // Idempotency guard: skip if already journaled.
  const { data: existing } = await supabase
    .from('wallet_transactions')
    .select('id')
    .eq('stripe_payment_intent', paymentIntent.id)
    .maybeSingle();

  if (existing) return;

  const { error } = await supabase.rpc('credit_wallet', {
    p_wallet_id: walletId,
    p_type: 'topup',
    p_amount_cents: paymentIntent.amount_received,
    p_stripe_payment_intent: paymentIntent.id,
    p_ref_type: 'topup',
    p_ref_id: null,
  });

  if (error) {
    console.error('Failed to credit wallet for top-up', error);
    return;
  }

  // Promo bonus: +X% free credits on the recharge (e.g. +3% first top-up)
  const bonusCents = Number(metadata.promo_bonus_cents ?? '0');
  const redemptionId = metadata.promo_redemption_id;
  if (bonusCents > 0 && redemptionId) {
    await supabase.rpc('credit_wallet', {
      p_wallet_id: walletId,
      p_type: 'adjustment',
      p_amount_cents: bonusCents,
      p_stripe_payment_intent: `${paymentIntent.id}-bonus`,
      p_ref_type: 'promo',
      p_ref_id: redemptionId,
    });
  }
}