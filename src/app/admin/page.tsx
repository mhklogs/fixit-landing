import { createServerSupabaseAdmin } from '@/lib/supabase/admin';
import { PLATFORM_COMMISSION_BPS, BID_FEE_USD } from '@/shared';

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  const admin = createServerSupabaseAdmin();

  const [{ count: userCount }, { count: contractorCount }, { count: jobCount }, { count: escrowCount }] =
    await Promise.all([
      admin.from('profiles').select('id', { count: 'exact', head: true }),
      admin.from('contractor_profiles').select('id', { count: 'exact', head: true }),
      admin.from('jobs').select('id', { count: 'exact', head: true }),
      admin.from('escrows').select('id', { count: 'exact', head: true }),
    ]);

  const { data: wallets } = await admin.from('wallets').select('balance_cents');
  const { data: paidEscrows } = await admin
    .from('escrows')
    .select('amount_cents, platform_fee_cents, status')
    .in('status', ['held', 'released']);

  const walletBalance = (wallets ?? []).reduce((s, w: any) => s + w.balance_cents, 0);
  const escrowValue = (paidEscrows ?? []).reduce((s, e: any) => s + e.amount_cents, 0);
  const collectedFees = (paidEscrows ?? []).reduce((s, e: any) => s + (e.platform_fee_cents ?? 0), 0);

  const cards = [
    { label: 'Total users', value: (userCount ?? 0).toLocaleString(), sub: `${contractorCount ?? 0} contractors` },
    { label: 'Active jobs', value: (jobCount ?? 0).toLocaleString(), sub: `${escrowCount ?? 0} escrows` },
    { label: 'Wallet balances', value: `$${(walletBalance / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, sub: `$${BID_FEE_USD.toFixed(2)}/bid fees` },
    { label: 'Jobs in escrow', value: `$${(escrowValue / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, sub: `${PLATFORM_COMMISSION_BPS / 100}% platform rate` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Marketplace at a glance · {new Date().toLocaleString()}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{c.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-brand">{c.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <h2 className="font-bold">Platform fees collected</h2>
        <p className="mt-2 text-3xl font-extrabold">${(collectedFees / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        <p className="mt-1 text-sm text-ink-muted">
          Sum of commission routed from completed escrows (incl. held).
        </p>
      </div>
    </div>
  );
}