import { createServerSupabaseAdmin } from '@/lib/supabase/admin';
import CreatePromoForm from './create-promo-form';

export const dynamic = 'force-dynamic';

export default async function AdminPromos() {
  const admin = createServerSupabaseAdmin();

  const [{ data: promos }, { data: redemptions }] = await Promise.all([
    admin.from('promo_codes').select('*').order('created_at', { ascending: false }),
    admin
      .from('promo_redemptions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Promo codes</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Homeowner discounts (5% off escrow) &amp; contractor bonuses (+3% credits on top-up).
          Referral codes reward the referrer in credits.
        </p>

        <div className="card mt-8 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-5 py-3">Code</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Benefit</th>
                <th className="px-5 py-3">Uses</th>
                <th className="px-5 py-3">Referral</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {promos?.map((p: any) => (
                <tr key={p.id}>
                  <td className="px-5 py-3 font-mono text-xs font-bold uppercase">{p.code}</td>
                  <td className="px-5 py-3 capitalize">
                    <span className={`badge ${p.type === 'homeowner_discount' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.type === 'homeowner_discount' ? 'Discount' : 'Bonus'}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold">
                    {p.discount_bps > 0 ? `${p.discount_bps / 100}% off` : `${p.bonus_bps / 100}% credits`}
                  </td>
                  <td className="px-5 py-3 text-ink-muted">{p.used_count}/{p.max_uses}</td>
                  <td className="px-5 py-3 text-ink-muted">
                    {p.referrer_bonus_credits_cents > 0
                      ? `+$${(p.referrer_bonus_credits_cents / 100).toFixed(2)}`
                      : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge ${p.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-muted">
                    {p.expires_at ? new Date(p.expires_at).toLocaleDateString() : 'Never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {redemptions && redemptions.length > 0 && (
          <div className="card mt-8 overflow-hidden">
            <h2 className="px-5 pt-5 font-bold">Recent redemptions</h2>
            <table className="mt-3 w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Off</th>
                  <th className="px-5 py-3">Credits</th>
                  <th className="px-5 py-3">Referrer paid</th>
                  <th className="px-5 py-3">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {redemptions.map((r: any) => (
                  <tr key={r.id}>
                    <td className="px-5 py-3 font-mono text-xs">{r.user_id?.slice(0, 8)}…</td>
                    <td className="px-5 py-3 capitalize">{r.ref_type}</td>
                    <td className="px-5 py-3">
                      {r.granted_off_cents > 0 ? `$${(r.granted_off_cents / 100).toFixed(2)}` : '—'}
                    </td>
                    <td className="px-5 py-3">
                      {r.granted_credits_cents > 0 ? `+$${(r.granted_credits_cents / 100).toFixed(2)}` : '—'}
                    </td>
                    <td className="px-5 py-3">{r.referrer_credited ? '✓' : '—'}</td>
                    <td className="px-5 py-3 text-ink-muted">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <CreatePromoForm />
      </div>
    </div>
  );
}