import Link from 'next/link';
import Logo from '@/components/logo';
import { HOME_BRAND, PLATFORM_NAME, PRO_BRAND } from '@/shared';

const COLUMNS = [
  {
    heading: 'Homeowners',
    links: [
      { label: 'Post a job', href: '/signup' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Every trade we cover', href: '/#services' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Common questions', href: '/#faq' },
    ],
  },
  {
    heading: 'Contractors',
    links: [
      { label: `Why join ${PRO_BRAND}`, href: '/for-pros' },
      { label: 'Start earning', href: '/onboarding' },
      { label: 'Referral credits', href: '/for-pros' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Sign in', href: '/login' },
      { label: 'Create an account', href: '/signup' },
      { label: 'Admin portal', href: '/admin' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night-950 text-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.10),transparent_60%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  {HOME_BRAND}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ember">
                  Live bidding
                </span>
              </span>
            </Link>
            <p className="mt-4 leading-relaxed text-zinc-400">
              A live-bidding marketplace for home repairs. Homeowners post for free, verified
              contractors compete in real time, and every payment is held until the work is done.
            </p>
            <Link href="/signup" className="btn-ember mt-6 min-h-[40px] px-5 py-2 text-sm">
              Post a job &mdash; it&rsquo;s free
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-zinc-400 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {PLATFORM_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(233,196,106,0.8)]" />
            Android and iPhone apps coming soon
          </p>
        </div>
      </div>
    </footer>
  );
}