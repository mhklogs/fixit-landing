'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import Logo from '@/components/logo';
import { ScrollProgress } from '@/components/motion';
import { HOME_BRAND } from '@/shared';

export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Homeowners', href: '/for-homeowners' },
  { label: 'Contractors', href: '/for-pros' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export default function NavShell({ authed = false }: { authed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Main"
          className={cn(
            'flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-500 sm:px-5',
            scrolled
              ? 'glass-gold border-ember/25 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]'
              : 'border-transparent bg-transparent'
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-10 w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight text-white">
                {HOME_BRAND}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ember">
                Live bidding
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-ember to-ember-deep transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            {authed && (
              <>
                <Link
                  href="/messages"
                  className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  Messages
                </Link>
                <Link
                  href="/notifications"
                  className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  Alerts
                </Link>
              </>
            )}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/admin"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-ember"
            >
              Admin
            </Link>
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Log in
            </Link>
            <Link href="/signup" className="btn-ember min-h-[40px] px-5 py-2 text-sm">
              Post a job
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl glass-gold lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  'block h-0.5 w-5 bg-ember transition-all',
                  open && 'translate-y-2 rotate-45'
                )}
              />
              <span className={cn('block h-0.5 w-5 bg-ember transition-all', open && 'opacity-0')} />
              <span
                className={cn(
                  'block h-0.5 w-5 bg-ember transition-all',
                  open && '-translate-y-2 -rotate-45'
                )}
              />
            </div>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-4 top-[5.5rem] overflow-hidden rounded-2xl border border-ember/25 bg-night-900/95 p-4 backdrop-blur-md lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-ember"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="btn-ember-ghost justify-center px-4 py-2.5 text-sm"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="btn-ember justify-center px-4 py-2.5 text-sm"
                  >
                    Post a job
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}