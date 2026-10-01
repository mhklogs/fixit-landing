import { createClient } from '@/lib/supabase/server';
import { PRO_BRAND, BID_FEE_USD } from '@/shared';
import WalletTopUp from './wallet-topup';

export const dynamic = 'force-dynamic';

export default async function ContractWalletPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: wallet }, { data: txns }] = await Promise.all([
    supabase
      .from('wallets')
      .select('balance_cents, bonus_credits_cents')
      .eq('contractor_id', user.id)
      .maybeSingle(),
    supabase
      .from('wallet_transactions')
      .select('*')
      .eq('wallet_id', (await supabase.from('wallets').select('id').eq('contractor_id', user.id).maybeSingle()).data?.id ?? '')
      .order('created_at', { ascending: false })
      .limit(25),
  ]);

  const balance = wallet?.balance_cents ?? 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Credit Wallet</h1>
        <p className="mt-1 text-ink-muted">
          {PRO_BRAND} credits — {`$${BID_FEE_USD.toFixed(2)}`}/bid, fast payouts.
        </p>

        <div className="mt-6 card p-6">
          <p className="text-sm text-ink-muted">Available balance</p>
          <p className="mt-1 text-4xl font-extrabold text-brand">
            ${(balance / 100).toFixed(2)}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink-muted">
            <span className="badge bg-brand-soft text-brand">
              ≈ {(balance / Math.round(BID_FEE_USD * 100)).toFixed(0)} bids available
            </span>
            {wallet?.bonus_credits_cents ? (
              <span className="badge bg-green-100 text-green-700">
                +${(wallet.bonus_credits_cents / 100).toFixed(2)} bonus
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-bold">Recent transactions</h2>
          {(!txns || txns.length === 0) ? (
            <p className="mt-3 rounded-xl border-2 border-dashed border-slate-200 p-8 text-center text-sm text-ink-muted">
              No transactions yet. Top up below to get started.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white">
              {txns.map((t: any) => (
                <li key={t.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
                  <div>
                    <p className="font-medium capitalize">{t.type.replace('_', ' ')}</p>
                    <p className="text-xs text-ink-muted">{new Date(t.created_at).toLocaleString()}</p>
                  </div>
                  <span
                    className={`font-bold ${t.amount_cents >= 0 ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {t.amount_cents >= 0 ? '+' : ''}$
                    {(t.amount_cents / 100).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <WalletTopUp />
    </div>
  );
}