import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function AdminWallets() {
  const admin = createServerSupabaseAdmin();

  const { data: wallets } = await admin
    .from('wallets')
    .select('id, contractor_id, balance_cents, bonus_credits_cents, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  const total = (wallets ?? []).reduce((s, w: any) => s + w.balance_cents, 0);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Wallets</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Total pre-funded credits: <span className="font-bold">${(total / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </p>

      <div className="card mt-8 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-5 py-3">Contractor</th>
              <th className="px-5 py-3">Balance</th>
              <th className="px-5 py-3">Bonus credits</th>
              <th className="px-5 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {wallets?.map((w: any) => (
              <tr key={w.id}>
                <td className="px-5 py-3 font-semibold">{w.contractor_id?.slice(0, 8)}…</td>
                <td className="px-5 py-3 font-bold">${(w.balance_cents / 100).toFixed(2)}</td>
                <td className="px-5 py-3 text-green-600">
                  ${(w.bonus_credits_cents / 100).toFixed(2)}
                </td>
                <td className="px-5 py-3 text-ink-muted">
                  {new Date(w.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}