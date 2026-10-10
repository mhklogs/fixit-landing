'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eyebrow } from '@/components/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FloatingBadge({
  className,
  title,
  sub,
  delay,
}: {
  className?: string;
  title: string;
  sub: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: EASE }}
      className={`pointer-events-none absolute z-10 ${className ?? ''}`}
    >
      <div className="animate-float-slow">
        <div className="glass rounded-2xl px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
          <div className="font-display text-2xl font-bold text-gradient-ember">{title}</div>
          <div className="text-xs text-zinc-400">{sub}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-night-950"
    >
      <div className="dot-grid-ember grid-fade absolute inset-0 opacity-60" aria-hidden />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_60%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-ember-deep/20 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-ember-mid/10 blur-[130px]" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Eyebrow>Home repairs, turned live</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
          className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]"
        >
          Post it once.
          <br />
          <span className="text-gradient-ember">Watch local pros bid live.</span>
          <br />
          Pay when it&rsquo;s done.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.46 }}
          className="mt-7 max-w-2xl text-base text-zinc-300 sm:text-lg"
        >
          Describe what is broken &mdash; verified plumbers, electricians, HVAC techs and handymen
          near you respond with their price and arrival time. Compare every offer, then pay only
          when the work is finished. Escrow-protected by Stripe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="pointer-events-auto mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/signup" className="btn-ember px-8 py-4 text-base">
            Post a job &mdash; it&rsquo;s free
          </Link>
          <Link href="#how-it-works" className="btn-ember-ghost px-7 py-4 text-base">
            See how it works
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex items-center gap-3 text-sm text-zinc-400"
        >
          <div className="flex -space-x-2">
            {['#E9C46A', '#B8941F', '#8A6F12', '#F8EBC3', '#F2D48F'].map((c, i) => (
              <span
                key={i}
                className="h-7 w-7 rounded-full border-2 border-night-950"
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-ember">
                <path d="M10 1.5 12.6 7l6 .7-4.5 4.1 1.2 5.9-5.3-2.9-5.3 2.9 1.2-5.9L1.4 7.7l6-.7L10 1.5Z" />
              </svg>
            ))}
          </div>
          <span>
            Free forever &middot; <span className="font-semibold text-white">escrow protected</span>
          </span>
        </motion.div>
      </motion.div>

      <FloatingBadge
        className="left-[6%] top-[26%] hidden lg:block"
        delay={1}
        title="+96–97%"
        sub="of every job reaches the pro"
      />
      <FloatingBadge
        className="right-[7%] top-[32%] hidden lg:block"
        delay={1.2}
        title="~11 min"
        sub="to your first offer"
      />
      <FloatingBadge
        className="left-[10%] bottom-[18%] hidden xl:block"
        delay={1.4}
        title="$0"
        sub="forever for homeowners"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-ember/30 p-1.5">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-ember"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}