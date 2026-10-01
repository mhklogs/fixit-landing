'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const QUICK_AMOUNTS = [2000, 5000, 10000, 25000];

function TopUpForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amountCents, setAmountCents] = useState(5000);
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [promoPreview, setPromoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function applyPromo() {
    setError(null);
    setPromoPreview(null);
    if (!promoCode.trim()) return;

    const res = await fetch('/api/promos/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: promoCode.trim(),
        baseAmountCents: amountCents,
        refType: 'topup',
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Invalid promo code.');
      return;
    }
    if (data.grantedCreditsCents > 0) {
      setPromoPreview(`+${(data.grantedCreditsCents / 100).toFixed(2)} free credits on payment`);
    } else {
      setError('This code is not valid for top-ups.');
      setPromoCode('');
    }
  }

  async function pay() {
    if (!stripe || !elements) return;
    setError(null);
    setLoading(true);

    const res = await fetch('/api/stripe/topup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountCents, promoCode: promoCode.trim() || null }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Failed to start checkout.');
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      confirmParams: { return_url: `${location.origin}/dashboard/contractor/wallet` },
    });
    setLoading(false);
    if (confirmError) setError(confirmError.message ?? 'Payment failed.');
  }

  return (
    <div className="card p-6">
      <h2 className="font-bold">Top up wallet</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Add credits to bid. Your first balanced recharge can earn bonus credits.
      </p>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {QUICK_AMOUNTS.map((a) => (
          <button
            key={a}
            onClick={() => setAmountCents(a)}
            className={`rounded-xl border px-2 py-2.5 text-sm font-bold transition-colors ${
              amountCents === a
                ? 'border-brand bg-brand-soft text-brand'
                : 'border-slate-200 text-ink-muted hover:border-slate-300'
            }`}
          >
            ${(a / 100).toFixed(0)}
          </button>
        ))}
      </div>
      <input
        type="number"
        value={amountCents / 100}
        onChange={(e) => setAmountCents(Math.round(Number(e.target.value) * 100) || 0)}
        min={1}
        max={10000}
        className="field mt-3"
        placeholder="Custom amount ($)"
      />

      <div className="mt-5">
        <label className="block text-xs font-semibold text-ink-muted">
          Promo / referral code <span className="font-normal">(optional)</span>
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="field flex-1 uppercase"
            placeholder="e.g. NEWPRO"
          />
          <button onClick={applyPromo} className="btn-secondary px-4 py-3 text-sm" type="button">
            Apply
          </button>
        </div>
        {promoPreview && (
          <p className="mt-2 text-sm font-semibold text-green-600">{promoPreview}</p>
        )}
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <PaymentElement />
      </div>

      <button onClick={pay} disabled={loading || !stripe} className="btn-primary mt-4 w-full">
        {loading ? 'Processing…' : `Add $${(amountCents / 100).toFixed(2)}`}
      </button>
    </div>
  );
}

export default function WalletTopUp() {
  return (
    <Elements stripe={stripePromise}>
      <TopUpForm />
    </Elements>
  );
}