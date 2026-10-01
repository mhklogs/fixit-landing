'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePromoForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    code: '',
    type: 'homeowner_discount',
    benefitBps: 500,
    maxUses: 100,
    referrerId: '',
    referrerBonusCreditsCents: 0,
    expiresAt: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function create() {
    setError(null);
    setSuccess(null);
    if (!form.code.trim()) return setError('Code is required.');

    setLoading(true);
    const res = await fetch('/api/promos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? 'Failed to create promo.');
      return;
    }
    setSuccess(`Created ${data.code.toUpperCase()}`);
    router.refresh();
  }

  return (
    <div className="card p-6">
      <h2 className="font-bold">Create a promo code</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Referral bonus applies on contractor top-ups only.
      </p>

      <div className="mt-4 space-y-4 text-sm">
        <div>
          <label className="block text-xs font-semibold text-ink-muted">Code</label>
          <input
            value={form.code}
            onChange={(e) => set('code', e.target.value.toUpperCase())}
            className="field mt-1.5 uppercase"
            placeholder="e.g. NEWPRO"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted">Type</label>
          <select
            value={form.type}
            onChange={(e) => set('type', e.target.value as typeof form.type)}
            className="field mt-1.5"
          >
            <option value="homeowner_discount">Homeowner discount (off escrow)</option>
            <option value="contractor_bonus">Contractor bonus (top-up credits)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted">
            Benefit (basis points — 500 = 5%, 300 = 3%)
          </label>
          <input
            type="number"
            value={form.benefitBps}
            onChange={(e) => set('benefitBps', Number(e.target.value) || 0)}
            className="field mt-1.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-ink-muted">Max uses</label>
            <input
              type="number"
              value={form.maxUses}
              onChange={(e) => set('maxUses', Number(e.target.value) || 1)}
              className="field mt-1.5"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-muted">Expires</label>
            <input
              type="date"
              value={form.expiresAt}
              onChange={(e) => set('expiresAt', e.target.value)}
              className="field mt-1.5"
            />
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-bold text-ink-muted">Worker→worker referral (optional)</p>
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-ink-muted">
                Referrer user ID (contractor)
              </label>
              <input
                value={form.referrerId}
                onChange={(e) => set('referrerId', e.target.value)}
                className="field mt-1.5 font-mono text-xs"
                placeholder="uuid"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-muted">
                Referrer bonus (cents)
              </label>
              <input
                type="number"
                value={form.referrerBonusCreditsCents}
                onChange={(e) => set('referrerBonusCreditsCents', Number(e.target.value) || 0)}
                className="field mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      {success && <p className="mt-3 text-sm font-semibold text-green-600">{success}</p>}

      <button onClick={create} disabled={loading} className="btn-primary mt-5 w-full">
        {loading ? 'Creating…' : 'Create promo code'}
      </button>
    </div>
  );
}