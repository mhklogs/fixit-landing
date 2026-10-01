'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createClient } from '@/lib/supabase/client';
import { JOB_STATUS_LABELS, BID_FEE_USD } from '@/shared';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Bid {
  id: string;
  job_id: string;
  contractor_id: string;
  price_cents: number;
  eta_minutes: number;
  message: string | null;
  status: string;
  contractor?: {
    full_name: string;
    rating: number;
    rating_count: number;
    jobs_completed: number;
  };
}

interface Job {
  id: string;
  title: string;
  description: string;
  status: string;
  is_urgent: boolean;
  price_basis: string;
  target_price_cents: number | null;
  accepted_bid_id: string | null;
  created_at: string;
}

function EscrowCheckout({ jobId, bidId, priceCents }: { jobId: string; bidId: string; priceCents: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoPreview, setPromoPreview] = useState<string | null>(null);
  const [promoAppliedCents, setPromoAppliedCents] = useState(0);

  async function createIntent(code?: string) {
    const res = await fetch('/api/stripe/escrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, bidId, promoCode: code }),
    });
    const d = await res.json();
    if (!res.ok) {
      setError(d.error ?? 'Failed to prepare checkout.');
      return;
    }
    setError(null);
    setClientSecret(d.clientSecret ?? null);
    setPromoAppliedCents(d.promoAppliedCents ?? 0);
  }

  useEffect(() => {
    createIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, bidId]);

  async function applyPromo() {
    setError(null);
    setPromoPreview(null);
    if (!promoCode.trim()) return;

    const res = await fetch('/api/promos/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: promoCode.trim(), baseAmountCents: priceCents, refType: 'escrow' }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Invalid promo code.');
      return;
    }
    if (data.grantedOffCents > 0) {
      setPromoPreview(`5% off applied — you save $${(data.grantedOffCents / 100).toFixed(2)}`);
      await createIntent(promoCode.trim());
    } else {
      setError('This code is not valid for homeowner discounts.');
      setPromoCode('');
    }
  }

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/homeowner/jobs/${jobId}`,
      },
      redirect: 'if_required',
    });
    setProcessing(false);
    if (confirmError) setError(confirmError.message ?? 'Payment failed.');
    else setDone(true);
  }

  if (done) {
    return (
      <p className="rounded-xl bg-brand-soft px-4 py-3 text-sm font-semibold text-brand">
        ✓ Payment authorized — funds are safely held in escrow until the job is confirmed complete.
      </p>
    );
  }

  return (
    <form onSubmit={pay} className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-muted">Due today</span>
          <span className="font-bold">${((priceCents - promoAppliedCents) / 100).toFixed(2)}</span>
        </div>
        {promoAppliedCents > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Promo applied</span>
            <span className="font-semibold text-green-600">
              −${(promoAppliedCents / 100).toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Promo code"
            className="field flex-1 uppercase"
          />
          <button type="button" onClick={applyPromo} className="btn-secondary px-4 py-2 text-sm">
            Apply
          </button>
        </div>
        {promoPreview && <p className="text-xs font-semibold text-green-600">{promoPreview}</p>}
      </div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
          <PaymentElement />
        </Elements>
      ) : (
        <p className="text-sm text-ink-muted">Preparing secure payment…</p>
      )}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={processing || !clientSecret} className="btn-primary mt-4 w-full">
        {processing ? 'Securing funds…' : '🔒 Hold funds in escrow'}
      </button>
    </form>
  );
}

export default function JobDetail({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [windowTab, setWindowTab] = useState('');
  const [acting, setActing] = useState<string | null>(null);
  const [acceptingBid, setAcceptingBid] = useState<Bid | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function load() {
      const [{ data: jobData }, { data: bidData }] = await Promise.all([
        supabase.from('jobs').select('*').eq('id', jobId).single(),
        supabase
          .from('bids')
          .select('*, contractor:contractor_profiles(full_name, rating, rating_count, jobs_completed, profiles!inner(full_name))')
          .eq('job_id', jobId)
          .order('price_cents', { ascending: true }),
      ]);
      if (mounted && jobData) setJob(jobData as Job);
      if (mounted && bidData) setBids(bidData as unknown as Bid[]);
    }
    load();

    const channel = supabase
      .channel(`job-detail-${jobId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bids', filter: `job_id=eq.${jobId}` }, async (payload) => {
        const b = payload.new as Bid;
        const { data: profile } = await supabase
          .from('contractor_profiles')
          .select('full_name, rating, rating_count, jobs_completed, profiles!inner(full_name)')
          .eq('id', b.contractor_id)
          .single();
        setBids((prev) => {
          if (prev.some((p) => p.id === b.id)) return prev;
          return [...prev, { ...b, contractor: profile as any }].sort((x, y) => x.price_cents - y.price_cents);
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'jobs', filter: `id=eq.${jobId}` }, (payload) => setJob(payload.new as Job))
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [jobId]);

  async function acceptBid(bid: Bid) {
    if (window.innerWidth < 768) {
      setWindowTab('pay');
    }
    setActing(bid.id);
    const supabase = createClient();
    const { error } = await supabase.rpc('accept_bid', { p_job_id: jobId, p_bid_id: bid.id });
    setActing(null);
    if (error) {
      alert(error.message);
      return;
    }
    setAcceptingBid(bid);
    setBids((prev) => prev.map((b) => ({ ...b, status: b.id === bid.id ? 'accepted' : 'declined' })));
  }

  const canAccept = job && ['open', 'bid_placed'].includes(job.status);
  const accepted = acceptingBid ?? bids.find((b) => b.status === 'accepted');

  return (
    <div>
      <Link href="/dashboard/homeowner" className="text-sm font-medium text-brand hover:underline">
        ← Back to My Jobs
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{job?.title ?? '…'}</h1>
          <p className="mt-1 text-ink-muted">{job?.description}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          {job?.is_urgent && (
            <span className="badge bg-red-600 text-white">🚨 Urgent</span>
          )}
          {job && (
            <span className="badge bg-brand-soft text-brand">
              {JOB_STATUS_LABELS[job.status as keyof typeof JOB_STATUS_LABELS] ?? job.status}
            </span>
          )}
        </div>
      </div>

      {accepted && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/messages?job=${jobId}`}
            className="btn-secondary px-4 py-2 text-sm"
          >
            💬 Message the contractor
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Bid list */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold">
            Incoming bids{' '}
            <span className="ml-1 text-xs font-normal text-ink-muted">(${BID_FEE_USD.toFixed(2)} flat fee paid by pros)</span>
          </h2>

          {bids.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center">
              <p className="text-3xl">📡</p>
              <p className="mt-3 font-semibold">Waiting for local pros to bid…</p>
              <p className="mt-1 text-sm text-ink-muted">
                Live bids will appear here in real time.
              </p>
            </div>
          )}

          {bids.map((bid) => (
            <div
              key={bid.id}
              className={`card p-5 ${bid.status === 'accepted' ? '!border-brand ring-2 ring-brand/20' : ''}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold">{bid.contractor?.full_name ?? 'Verified contractor'}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">
                    ⭐ {Number(bid.contractor?.rating ?? 0).toFixed(1)} ·{' '}
                    {bid.contractor?.jobs_completed ?? 0} jobs · {bid.eta_minutes} min out
                  </p>
                </div>
                <p className="text-2xl font-extrabold text-brand">
                  ${(bid.price_cents / 100).toFixed(2)}
                </p>
              </div>
              {bid.message && (
                <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-ink-muted">“{bid.message}”</p>
              )}
              {canAccept && bid.status === 'pending' && (
                <button onClick={() => acceptBid(bid)} disabled={acting === bid.id} className="btn-primary mt-4 w-full">
                  {acting === bid.id ? 'Accepting…' : `Accept & pay ${(bid.price_cents / 100).toFixed(2)}`}
                </button>
              )}
              {bid.status === 'accepted' && accepted?.id !== acceptingBid?.id && (
                <p className="mt-4 text-center text-sm font-semibold text-brand">✓ Accepted</p>
              )}
            </div>
          ))}
        </div>

        {/* Escrow column */}
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="font-bold">Escrow</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-muted">You pay</span>
                <span className="font-bold">${(accepted?.price_cents ?? 0) / 100}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Held securely</span>
                <span className="font-bold text-brand">Until job completes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Released on sign-off</span>
                <span className="font-semibold">96–97% → contractor</span>
              </div>
            </div>
          </div>

          {acceptingBid && <EscrowCheckout jobId={jobId} bidId={acceptingBid.id} priceCents={acceptingBid.price_cents} />}
        </div>
      </div>

      <ReviewsPanel jobId={jobId} contractorId={accepted?.contractor_id ?? null} jobStatus={job?.status ?? ''} />
    </div>
  );
}

interface ReviewRow {
  id: string;
  author_id: string;
  contractor_id: string;
  rating: number;
  comment: string | null;
  tip_cents: number | null;
  created_at: string;
}

function ReviewsPanel({ jobId, contractorId, jobStatus }: { jobId: string; contractorId: string | null; jobStatus: string }) {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const alreadyReviewed = reviews.length > 0;
  const canReview = jobStatus === 'completed' && contractorId && !alreadyReviewed;

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('reviews')
      .select('*')
      .eq('job_id', jobId)
      .then(({ data }) => setReviews((data ?? []) as ReviewRow[]));
  }, [jobId]);

  async function submitReview() {
    if (!contractorId) return;
    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from('reviews').insert({
      job_id: jobId,
      author_id: user?.id,
      homeowner_id: user?.id,
      contractor_id: contractorId,
      rating,
      comment: comment || null,
      tip_cents: null,
    });
    setSaving(false);
    if (error) {
      alert(error.message);
      return;
    }
    const { data } = await supabase.from('reviews').select('*').eq('job_id', jobId);
    setReviews((data ?? []) as ReviewRow[]);
    setComment('');
  }

  return (
    <div className="mt-10">
      <h2 className="font-bold text-lg">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="mt-2 text-sm text-ink-muted">
          {jobStatus === 'completed' ? 'No review yet for this completed job.' : 'Reviews unlock after the job is completed.'}
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="card p-4">
              <div className="flex items-center justify-between">
                <span className="text-amber-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <span className="text-xs text-ink-muted">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              {r.comment && <p className="mt-2 text-sm text-ink-muted">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}

      {canReview && (
        <div className="card mt-5 p-6">
          <p className="font-bold">Rate this contractor</p>
          <div className="mt-3 flex gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} className={n <= rating ? 'text-amber-500' : 'text-slate-200'}>
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was the work? (optional)"
            className="field mt-4 min-h-[80px]"
          />
          <button onClick={submitReview} disabled={saving} className="btn-primary mt-4">
            {saving ? 'Submitting…' : 'Submit review'}
          </button>
        </div>
      )}
    </div>
  );
}