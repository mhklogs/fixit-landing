'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BID_FEE_USD } from '@/shared';

export default function BidForm({
  jobId,
  walletBalanceCents,
}: {
  jobId: string;
  walletBalanceCents: number;
}) {
  const [price, setPrice] = useState('');
  const [eta, setEta] = useState('30');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const insufficient = walletBalanceCents < Math.round(BID_FEE_USD * 100);

  async function placeBid() {
    setError(null);
    const priceCents = Math.round(Number(price) * 100);
    const etaMin = parseInt(eta, 10);
    if (!priceCents || priceCents < 100) return setError('Enter a valid bid amount.');
    if (!etaMin || etaMin < 1) return setError('Enter estimated minutes to arrive.');
    if (insufficient) return setError('Insufficient wallet balance for the bid fee.');

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    const { error: rpcError } = await supabase.rpc('place_bid', {
      p_job_id: jobId,
      p_contractor_id: user.id,
      p_price_cents: priceCents,
      p_eta_minutes: etaMin,
      p_message: message || null,
      p_bid_fee_cents: Math.round(BID_FEE_USD * 100),
    });
    setLoading(false);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    router.refresh();
  }

  return (
    <div className="card p-6">
      <h2 className="font-bold">Place your bid</h2>

      {insufficient && (
        <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Balance too low. Top up at least ${' '}
          <a href="/dashboard/contractor/wallet" className="underline">
            your wallet
          </a>{' '}
          to place this bid.
        </div>
      )}

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-ink-muted">Your price ($)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="decimal"
            placeholder="e.g. 350"
            className="field mt-1.5"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted">
            ETA to arrive (minutes)
          </label>
          <input
            value={eta}
            onChange={(e) => setEta(e.target.value)}
            inputMode="numeric"
            className="field mt-1.5"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted">
            Message to homeowner (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Why you're the right pro for this job…"
            className="field mt-1.5 resize-none"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      <button
        onClick={placeBid}
        disabled={loading}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {loading ? 'Placing…' : `Submit bid · $${BID_FEE_USD.toFixed(2)} fee`}
      </button>
    </div>
  );
}