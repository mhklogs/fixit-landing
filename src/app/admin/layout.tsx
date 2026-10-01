import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const ADMIN_NAV = [
  { href: '/admin', label: 'Overview', icon: '📊' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/jobs', label: 'Jobs', icon: '🛠️' },
  { href: '/admin/wallets', label: 'Wallets', icon: '💳' },
  { href: '/admin/promos', label: 'Promo codes', icon: '🎟️' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-slate-950 text-slate-300 lg:flex">
          <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-light to-brand text-white text-sm font-extrabold">
              P
            </span>
            <div>
              <p className="font-bold leading-tight text-white">ProFixit</p>
              <p className="text-[11px] text-slate-500">Admin portal</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {ADMIN_NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-white/10 hover:text-white"
              >
                <span>{n.icon}</span> {n.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <p className="truncate text-xs text-slate-400">{profile.full_name ?? user.email}</p>
            <form action="/auth/signout" method="post">
              <button type="submit" className="mt-2 text-xs font-semibold text-slate-400 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="flex-1 lg:pl-60">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur lg:hidden">
            <nav className="flex gap-2 overflow-x-auto px-4 py-3 text-sm">
              {ADMIN_NAV.map((n) => (
                <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-1.5 font-medium">
                  {n.icon} {n.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}