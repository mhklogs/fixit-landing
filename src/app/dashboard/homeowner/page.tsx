import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { JOB_STATUS_LABELS, TRADE_LABELS } from '@/shared';

export const dynamic = 'force-dynamic';

export default async function HomeownerDashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('homeowner_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">My Jobs</h1>
          <p className="mt-1 text-ink-muted">
            Post a job and watch verified pros bid on it live.
          </p>
        </div>
        <Link href="/dashboard/homeowner/post" className="btn-primary">
          📡 Post a Job
        </Link>
      </div>

      {(!jobs || jobs.length === 0) ? (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-200 p-16 text-center">
          <p className="text-4xl">💧</p>
          <p className="mt-4 font-semibold">No jobs yet</p>
          <p className="mt-1 text-sm text-ink-muted">
            Leaky faucet, dead AC, cracked tile — broadcast it and watch pros compete.
          </p>
          <Link href="/dashboard/homeowner/post" className="btn-primary mt-6">
            Broadcast your first job
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job: any) => (
            <Link
              key={job.id}
              href={
                ['open', 'bid_placed'].includes(job.status)
                  ? `/dashboard/homeowner/jobs/${job.id}`
                  : `/dashboard/homeowner/jobs/${job.id}`
              }
              className="card p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-ink-muted uppercase">
                    {TRADE_LABELS[job.category as keyof typeof TRADE_LABELS] ?? job.category}
                  </p>
                  <h2 className="mt-1 font-bold">{job.title}</h2>
                </div>
                <span className="badge bg-brand-soft text-brand">
                  {JOB_STATUS_LABELS[job.status as keyof typeof JOB_STATUS_LABELS] ?? job.status}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{job.description}</p>
              <div className="mt-4 flex items-center justify-between">
                {job.target_price_cents != null ? (
                  <span className="font-bold text-brand">
                    Target ${(job.target_price_cents / 100).toFixed(2)}
                  </span>
                ) : (
                  <span className="text-sm text-ink-muted">Open bidding</span>
                )}
                <span className="text-xs text-ink-muted">
                  {job.media?.length ?? 0} media · {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}