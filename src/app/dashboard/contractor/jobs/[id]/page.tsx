import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { TRADE_LABELS, JOB_STATUS_LABELS, BID_FEE_USD } from '@/shared';
import BidForm from './bid-form';
import JobLifecycle from './job-lifecycle';

export const dynamic = 'force-dynamic';

export default async function BidPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: job } = await supabase.from('jobs').select('*').eq('id', params.id).single();
  if (!job) notFound();

  const [{ data: bids }, { data: wallet }] = await Promise.all([
    supabase
      .from('bids')
      .select('*')
      .eq('job_id', params.id)
      .order('price_cents', { ascending: true }),
    user
      ? supabase
          .from('wallets')
          .select('balance_cents')
          .eq('contractor_id', user.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const myBid = bids?.find((b: any) => b.contractor_id === user?.id);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <LinkBack />
        <p className="text-xs font-medium text-ink-muted uppercase">
          {TRADE_LABELS[job.category as keyof typeof TRADE_LABELS] ?? job.category}
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{job.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.is_urgent && <span className="badge bg-red-600 text-white">🚨 Urgent</span>}
          <span className="badge bg-brand-soft text-brand">
            {JOB_STATUS_LABELS[job.status as keyof typeof JOB_STATUS_LABELS] ?? job.status}
          </span>
          {job.is_urgent && <span className="badge bg-amber-100 text-amber-700">Priority dispatch</span>}
        </div>

        <p className="mt-6 whitespace-pre-wrap text-ink-muted">{job.description}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {job.target_price_cents != null && (
            <div className="card p-4">
              <dt className="text-xs text-ink-muted uppercase">Homeowner target</dt>
              <dd className="mt-1 text-xl font-extrabold text-brand">
                ${(job.target_price_cents / 100).toFixed(2)}
              </dd>
            </div>
          )}
          <div className="card p-4">
            <dt className="text-xs text-ink-muted uppercase">Broadcast at</dt>
            <dd className="mt-1 font-semibold">{new Date(job.created_at).toLocaleString()}</dd>
          </div>
          <div className="card p-4">
            <dt className="text-xs text-ink-muted uppercase">Bid fee</dt>
            <dd className="mt-1 font-semibold">${BID_FEE_USD.toFixed(2)} flat, from wallet</dd>
          </div>
          <div className="card p-4">
            <dt className="text-xs text-ink-muted uppercase">Your wallet balance</dt>
            <dd className="mt-1 font-extrabold">
              ${((wallet?.balance_cents ?? 0) / 100).toFixed(2)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="space-y-6">
        <JobLifecycle jobId={params.id} status={job.status} />

        <div className="card border-brand/20 bg-brand-soft/40 p-5">
          <p className="text-sm font-bold text-brand-dark">🤖 AI Tech Brief</p>
          <p className="mt-1 text-sm text-ink-muted">
            Shows when the AI assistant is active. Summarizes the issue, urgency, and
            homeowner answers before you arrive.
          </p>
        </div>

        {myBid ? (
          <div className="card border-green-200 bg-green-50 p-6">
            <p className="font-bold text-green-700">Your bid is live</p>
            <p className="mt-2 text-sm text-green-700/80">
              ${(myBid.price_cents / 100).toFixed(2)} · ETA {myBid.eta_minutes} min
            </p>
          </div>
        ) : (
          <BidForm
            jobId={params.id}
            walletBalanceCents={wallet?.balance_cents ?? 0}
          />
        )}

        <div className="card p-5">
          <h2 className="font-bold">Current bids</h2>
          {(!bids || bids.length === 0) ? (
            <p className="mt-2 text-sm text-ink-muted">No bids yet — be the first.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {bids.map((b: any) => (
                <li key={b.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-sm">
                  <span className="font-semibold">${(b.price_cents / 100).toFixed(2)}</span>
                  <span className="text-ink-muted">ETA {b.eta_minutes} min</span>
                  <span className="text-xs text-ink-muted">{new Date(b.created_at).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function LinkBack() {
  return (
    <a href="/dashboard/contractor" className="mb-4 inline-block text-sm font-medium text-ink-muted hover:text-ink">
      ← Back to feed
    </a>
  );
}