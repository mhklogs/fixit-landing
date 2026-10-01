import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function AdminUsers() {
  const admin = createServerSupabaseAdmin();

  const { data: users } = await admin
    .from('profiles')
    .select(
      'id, role, full_name, account_status, created_at, contractor_profiles(rating, jobs_completed, trades)',
    )
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Users</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {users?.length ?? 0} most recent accounts · role is set on profiles.
      </p>

      <div className="card mt-8 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Jobs done</th>
              <th className="px-5 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users?.map((u: any) => (
              <tr key={u.id}>
                <td className="px-5 py-3 font-semibold">{u.full_name ?? '—'}</td>
                <td className="px-5 py-3 capitalize">
                  <span className={`badge ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : u.role === 'contractor' ? 'bg-brand-soft text-brand' : 'bg-slate-100 text-slate-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3 capitalize text-ink-muted">{u.account_status}</td>
                <td className="px-5 py-3">
                  {u.contractor_profiles ? Number(u.contractor_profiles.rating ?? 0).toFixed(1) : '—'}
                </td>
                <td className="px-5 py-3">{u.contractor_profiles?.jobs_completed ?? '—'}</td>
                <td className="px-5 py-3 text-ink-muted">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}