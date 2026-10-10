import Link from 'next/link';
import Logo from '@/components/logo';
import { HOME_BRAND } from '@/shared';
import { createClient } from '@/lib/supabase/server';

const LINKS: { label: string; href: string; pro?: boolean }[] = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Homeowners', href: '/for-homeowners' },
  { label: 'Contractors', href: '/for-pros', pro: true },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export default async function Nav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authed = !!user;

  return (
    <header className="sticky top-0 z-50">
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>

      {/* Announcement strip */}
      <div className="bg-pro-dark text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 text-[13px] sm:px-6">
          <p className="flex items-center gap-2.5 font-medium tracking-wide text-pro-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-light" />
            </span>
            <span className="hidden sm:inline">Free for homeowners · Escrow-protected payments</span>
            <span className="sm:hidden">Free for homeowners</span>
          </p>
          <Link
            href="/for-pros"
            className="font-semibold tracking-wide text-white transition-colors hover:text-brand-light"
          >
            Contractors: $0.30 per bid <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex flex-none items-center gap-2.5">
            <Logo />
            <span className="text-lg font-extrabold tracking-tight">{HOME_BRAND}</span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-8 text-[15px] font-medium text-ink-muted lg:flex"
          >
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`relative transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300 ${
                  l.pro
                    ? 'hover:after:w-full after:w-0 hover:text-pro'
                    : 'hover:after:w-full after:w-0'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {authed && (
              <>
                <Link href="/messages" className="transition-colors hover:text-ink">Messages</Link>
                <Link href="/notifications" className="transition-colors hover:text-ink">Alerts</Link>
              </>
            )}
          </nav>

          <div className="flex flex-none items-center gap-1">
            <Link
              href="/admin"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink md:inline-flex"
            >
              Admin
            </Link>
            <Link
              href="/login"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink sm:inline-flex"
            >
              Log in
            </Link>
            <Link href="/signup" className="btn-primary min-h-[40px] px-5 py-2 text-sm">
              Post a job
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}