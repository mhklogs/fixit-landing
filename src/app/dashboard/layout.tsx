import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { PLATFORM_NAME } from '@/shared';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, account_status')
    .eq('id', user.id)
    .single();

  if (!profile || profile.account_status !== 'active') {
    // Homeowners are auto-active; contractors must finish onboarding.
    if (!profile) {
      const { error } = await supabase
        .from('profiles')
        .insert({ id: user.id, role: 'homeowner', full_name: user.user_metadata?.full_name ?? 'New user' });
      redirect(error ? '/login' : '/dashboard');
    }
  }

  const role = profile?.role ?? 'homeowner';
  const href = role === 'contractor' ? '/dashboard/contractor' : '/dashboard/homeowner';

  const nav = [
    { href, label: role === 'contractor' ? 'Job Feed' : 'My Jobs' },
    ...(role === 'contractor'
      ? [
          { href: '/dashboard/contractor/wallet', label: 'Wallet' },
          { href: '/dashboard/contractor/earnings', label: 'Earnings' },
        ]
      : [{ href: '/dashboard/homeowner/post', label: 'Post a Job' }]),
  ];

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-light to-brand text-white font-bold">P</span>
            <span className="font-bold">{PLATFORM_NAME}</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-ink-muted hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="badge bg-brand-soft text-brand hidden sm:inline-flex">
              {profile?.full_name} · {role}
            </span>
            <form action="/auth/signout" method="post">
              <button type="submit" className="btn-ghost py-2">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}