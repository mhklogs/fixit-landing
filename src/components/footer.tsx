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
    <footer className="bg-pro-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-lg font-extrabold tracking-tight text-white">{HOME_BRAND}</span>
            </Link>
            <p className="mt-4 leading-relaxed text-pro-light">
              A live-bidding marketplace for home repairs. Homeowners post for free, verified
              contractors compete in real time, and every payment is held until the work is done.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-pro-light transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 text-sm text-pro-light sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {PLATFORM_NAME}. All rights reserved.
          </p>
          <p>Android and iPhone apps coming soon.</p>
        </div>
      </div>
    </footer>
  );
}