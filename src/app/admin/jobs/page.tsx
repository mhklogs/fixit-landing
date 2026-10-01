import { createServerSupabaseAdmin } from '@/lib/supabase/admin';
import { TRADE_LABELS, JOB_STATUS_LABELS } from '@/shared';

export const dynamic = 'force-dynamic';

export default async function AdminJobs() {
  const admin = createServerSupabaseAdmin();

  const { data: jobs } = await admin
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Jobs</h1>
      <p className="mt-1 text-sm text-ink-muted">Latest 100 broadcasts.</p>

      <div className="card mt-8 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Trade</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Target</th>
              <th className="px-5 py-3">Posted</th>
              <th className="px-5 py-3">Homeowner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs?.map((j: any) => (
              <tr key={j.id}>
                <td className="max-w-[240px] truncate px-5 py-3 font-semibold">{j.title}</td>
                <td className="px-5 py-3 capitalize text-ink-muted">
                  {TRADE_LABELS[j.category as keyof typeof TRADE_LABELS] ?? j.category}
                </td>
                <td className="px-5 py-3">
                  <span className="badge bg-brand-soft text-brand">
                    {JOB_STATUS_LABELS[j.status as keyof typeof JOB_STATUS_LABELS] ?? j.status}
                  </span>
                </td>
                <td className="px-5 py-3 font-semibold">
                  {j.target_price_cents != null ? `$${(j.target_price_cents / 100).toFixed(2)}` : 'Open'}
                </td>
                <td className="px-5 py-3 text-ink-muted">
                  {new Date(j.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-ink-muted">{j.homeowner_id?.slice(0, 8)}…</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}