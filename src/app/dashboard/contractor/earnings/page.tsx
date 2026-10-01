import { createClient } from '@/lib/supabase/server';
import { PRO_BRAND } from '@/shared';

export const dynamic = 'force-dynamic';

export default async function EarningsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: wallet } = await supabase
    .from('wallets')
    .select('id, balance_cents')
    .eq('contractor_id', user.id)
    .maybeSingle();

  if (!wallet) {
    return (
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Earnings</h1>
        <p className="mt-3 text-ink-muted">
          You haven&apos;t set up your {PRO_BRAND} wallet yet.
        </p>
      </div>
    );
  }

  const { data: txns } = await supabase
    .from('wallet_transactions')
    .select('*')
    .eq('wallet_id', wallet.id)
    .order('created_at', { ascending: false })
    .limit(100);

  const earned = (txns ?? [])
    .filter((t: any) => ['escrow_payout', 'bonus', 'adjustment'].includes(t.type))
    .reduce((sum, t: any) => sum + (t.amount_cents > 0 ? t.amount_cents : 0), 0);

  const spent = (txns ?? [])
    .filter((t: any) => ['bid_fee', 'refund'].includes(t.type) || t.amount_cents < 0)
    .reduce((sum, t: any) => sum + Math.abs(t.amount_cents), 0);

  const payoutTotal = (txns ?? [])
    .filter((t: any) => t.type === 'escrow_payout')
    .reduce((sum, t: any) => sum + t.amount_cents, 0);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight">Earnings</h1>
      <p className="mt-1 text-ink-muted">
        A snapshot of what you&apos;ve earned, {PRO_BRAND}.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[
          { label: 'Wallet balance', value: (wallet.balance_cents / 100).toFixed(2) },
          { label: 'Payouts received', value: (payoutTotal / 100).toFixed(2) },
          { label: 'Net (lifetime)', value: ((earned - spent) / 100).toFixed(2) },
        ].map((s) => (
          <div key={s.label} className="card p-6">
            <p className="text-sm text-ink-muted">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-brand">${s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}