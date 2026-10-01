'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TRADE_CATEGORIES, TRADE_LABELS } from '@/shared';

export default function PostJobForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [openBidding, setOpenBidding] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description || !category) {
      setError('Please fill in title, description, and category.');
      return;
    }
    if (!address || !city || !state || !postal) {
      setError('Job location is required so nearby pros can find you.');
      return;
    }

    setLoading(true);
    setError(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError('Please log in first.');
      setLoading(false);
      return;
    }

    const { data: loc, error: locError } = await supabase
      .from('geo_points')
      .insert({ lat: 0, lng: 0, address_line1: address, city, state, postal_code: postal })
      .select('*')
      .single();
    if (locError || !loc) {
      setError('Could not save location.');
      setLoading(false);
      return;
    }

    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        homeowner_id: user.id,
        title,
        description,
        category,
        is_urgent: urgent,
        price_basis: openBidding ? 'open_bidding' : 'target',
        target_price_cents: openBidding || !targetPrice ? null : Math.round(Number(targetPrice) * 100),
        location_id: loc.id,
        media: [],
      })
      .select('*')
      .single();

    setLoading(false);
    if (jobError) {
      setError(jobError.message);
      return;
    }
    router.push(`/dashboard/homeowner/jobs/${job.id}`);
  }

  return (
    <form onSubmit={submit} className="card max-w-2xl space-y-6 p-8">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div>
        <label className="label" htmlFor="title">What needs fixing?</label>
        <input
          id="title"
          className="input"
          placeholder="e.g. Water heater leaking in garage"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor="desc">Describe the problem</label>
        <textarea
          id="desc"
          className="input min-h-[110px]"
          placeholder="Add details like brand, symptoms, access…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <span className="label">Trade</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TRADE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                category === cat
                  ? 'border-brand bg-brand-soft text-brand'
                  : 'border-slate-200 bg-white text-ink-muted hover:border-slate-300'
              }`}
            >
              {TRADE_LABELS[cat as keyof typeof TRADE_LABELS]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="label">Pricing</span>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={openBidding}
            onChange={(e) => setOpenBidding(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          Let pros compete on price (recommended)
        </label>
        {!openBidding && (
          <input
            className="input mt-3"
            placeholder="Target price ($)"
            type="number"
            min={1}
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
          />
        )}
      </div>

      <div className="rounded-xl border border-red-100 bg-red-50/60 p-4">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-brand"
          />
          <span>
            <span className="font-semibold text-red-600">🚨 It&apos;s urgent</span>
            <span className="mt-0.5 block text-ink-muted">
              Burst pipe, electrical failure, lockout? Emergency jobs jump the queue and
              clamp onto available pros nearby.
            </span>
          </span>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="address">Street address</label>
          <input
            id="address"
            className="input"
            placeholder="123 Maple Ave"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="city">City</label>
          <input id="city" className="input" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="state">State</label>
            <input id="state" className="input" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="zip">ZIP</label>
            <input id="zip" className="input" value={postal} onChange={(e) => setPostal(e.target.value)} />
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? 'Publishing…' : '📡 Broadcast request'}
      </button>
    </form>
  );
}