import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TRADE_LABELS, BID_FEE_USD } from '@/shared';

export const dynamic = 'force-dynamic';

export default async function ContractorFeed() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .in('status', ['open', 'bid_placed'])
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Job Feed</h1>
          <p className="mt-1 text-ink-muted">
            Opening bids with a flat ${BID_FEE_USD.toFixed(2)} fee from your credit wallet.
          </p>
        </div>
        <Link href="/dashboard/contractor/wallet" className="btn-primary">
          💳 Top up wallet
        </Link>
      </div>

      {(!jobs || jobs.length === 0) ? (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-200 p-16 text-center">
          <p className="text-4xl">📡</p>
          <p className="mt-4 font-semibold">No open jobs in your area</p>
          <p className="mt-1 text-sm text-ink-muted">
            New jobs appear here in real time as homeowners broadcast them.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job: any) => (
            <Link
              key={job.id}
              href={`/dashboard/contractor/jobs/${job.id}`}
              className="card p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-ink-muted uppercase">
                    {TRADE_LABELS[job.category as keyof typeof TRADE_LABELS] ?? job.category}
                  </p>
                  <h2 className="mt-1 font-bold">{job.title}</h2>
                </div>
                <span className="badge bg-green-100 text-green-700">Open</span>
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{job.description}</p>
              <div className="mt-4 flex items-center justify-between">
                {job.target_price_cents != null ? (
                  <span className="font-bold text-brand">
                    Target ${(job.target_price_cents / 100).toFixed(2)}
                  </span>
                ) : (
                  <span className="text-sm text-ink-muted">Open bidding</span>
                )}
                <span className="text-xs text-ink-muted">
                  {new Date(job.created_at).toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}