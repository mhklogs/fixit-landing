'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TRADE_CATEGORIES, TRADE_LABELS } from '@/shared';

export default function OnboardingPage() {
  const [tradeCategory, setTradeCategory] = useState<string>('');
  const [bio, setBio] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [radius, setRadius] = useState('25');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

    const { error: contractorError } = await supabase
      .from('contractor_profiles')
      .insert({
        id: user.id,
        trade_category: tradeCategory,
        bio,
        years_experience: yearsExperience ? Number(yearsExperience) : null,
        service_radius_km: Number(radius),
      });

    if (contractorError) {
      setError(contractorError.message);
      setLoading(false);
      return;
    }

    // Create Stripe Connect account server-side, then redirect to onboarding
    const res = await fetch('/api/stripe/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractorId: user.id }),
    });
    const data = await res.json();

    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <main className="min-h-screen bg-canvas px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white font-bold">F</span>
          <span className="text-lg font-bold">FixIt</span>
        </Link>

        <div className="mt-8 card p-8">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Contractor signup
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Get verified, top up your wallet, and start bidding on live jobs
            near you. This takes about 5 minutes.
          </p>

          <div className="mt-6 flex gap-2">
            <span className="badge bg-brand text-white">1 · Profile</span>
            <span className="badge bg-slate-100 text-ink-muted">2 · Verification</span>
            <span className="badge bg-slate-100 text-ink-muted">3 · Payout setup</span>
            <span className="badge bg-slate-100 text-ink-muted">4 · Top up wallet</span>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="label">Primary trade</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {TRADE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setTradeCategory(cat)}
                    className={`rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                      tradeCategory === cat
                        ? 'border-brand bg-brand-soft text-brand'
                        : 'border-slate-200 bg-white text-ink-muted hover:border-slate-300'
                    }`}
                  >
                    {TRADE_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label" htmlFor="bio">Professional bio</label>
              <textarea
                id="bio"
                className="input min-h-[100px]"
                placeholder="Licensed & insured HVAC tech with 12 years serving the metro area…"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="years">Years of experience</label>
                <input
                  id="years"
                  type="number"
                  min={0}
                  max={80}
                  className="input"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="radius">Service radius (mi)</label>
                <input
                  id="radius"
                  type="number"
                  min={1}
                  max={200}
                  className="input"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Setting up your account…' : 'Continue to verification'}
            </button>
            <p className="text-center text-xs text-ink-muted">
              You&apos;ll be redirected to Stripe to complete identity verification
              and banking setup for instant payouts.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}