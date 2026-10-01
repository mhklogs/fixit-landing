import Link from 'next/link';
import Logo from '@/components/logo';
import { HOME_BRAND } from '@/shared';
import { createClient } from '@/lib/supabase/server';

export default async function Nav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authed = !!user;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="flex flex-none items-center gap-2.5">
          <Logo />
          <span className="text-lg font-extrabold tracking-tight">{HOME_BRAND}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold text-ink-muted lg:flex">
          <Link href="/#services" className="hover:text-brand">Services</Link>
          <Link href="/#how-it-works" className="hover:text-brand">How it works</Link>
          <Link href="/for-homeowners" className="hover:text-brand">For homeowners</Link>
          <Link href="/for-pros" className="hover:text-pro">For contractors</Link>
          <Link href="/#pricing" className="hover:text-brand">Pricing</Link>
          <Link href="/#faq-heading" className="hover:text-brand">FAQ</Link>
          {authed && (
            <>
              <Link href="/messages" className="hover:text-brand">Messages</Link>
              <Link href="/notifications" className="hover:text-brand">Alerts</Link>
            </>
          )}
        </nav>

        <div className="flex flex-none items-center gap-2">
          <Link href="/admin" className="btn-ghost hidden text-sm md:inline-flex">Admin</Link>
          <Link href="/login" className="btn-ghost hidden text-sm sm:inline-flex">Log in</Link>
          <Link href="/signup" className="btn-primary text-sm">Get started free</Link>
        </div>
      </div>
    </header>
  );
}