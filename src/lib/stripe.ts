import Stripe from 'stripe';
import { createServerSupabaseAdmin } from './supabase/admin';

let _stripe: Stripe | undefined;
function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
    });
  }
  return _stripe;
}
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const s = getStripe();
    const value = (s as any)[prop];
    return typeof value === 'function' ? value.bind(s) : value;
  },
});

export const PLATFORM_FEE_BPS = Number(
  process.env.NEXT_PUBLIC_PLATFORM_COMMISSION_BPS ?? 400,
);

export function supportedCurrency(ccy: string): boolean {
  const supported = new Set(['usd', 'cad', 'gbp', 'eur', 'aud']);
  return supported.has(ccy.toLowerCase());
}

export async function getOrCreateConnectAccount(
  contractorId: string,
  email: string,
): Promise<{ account: Stripe.Account; fresh: boolean }> {
  // Look up existing account id from contractor profile first, then Stripe.
  const supabase = createServerSupabaseAdmin();
  const { data: profile } = await supabase
    .from('contractor_profiles')
    .select('stripe_connect_id, stripe_account_status')
    .eq('id', contractorId)
    .single();

  if (profile?.stripe_connect_id) {
    const account = await stripe.accounts.retrieve(profile.stripe_connect_id);
    return { account, fresh: false };
  }

  const account = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email,
    capabilities: { transfers: { requested: true } },
    business_type: 'individual',
    metadata: { contractor_id: contractorId },
  });

  return { account, fresh: true };
}