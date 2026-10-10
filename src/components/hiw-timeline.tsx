'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eyebrow, Reveal } from '@/components/motion';

const STEPS = [
  {
    no: '01',
    title: 'Describe what is broken',
    body: 'Write it in your own words — "water dripping through the ceiling", "AC blows warm air", "garage door will not close". Add a photo if it helps, set a target price or let pros bid freely. Free, unlimited, about 60 seconds.',
    meta: 'Free · About 60 seconds',
  },
  {
    no: '02',
    title: 'Watch the offers come in',
    body: 'Verified contractors near you send a price and an arrival time. Every new offer pushes a notification to your phone. Compare side by side: price, speed and how past customers rated them.',
    meta: 'First offer usually within 11 minutes',
  },
  {
    no: '03',
    title: 'Pay after the job is finished',
    body: 'Your money is held safely by Stripe, not by the contractor. When the work is done you confirm it with a photo and the money is released. If something is wrong, you do not release it yet.',
    meta: 'Escrow protected · 96–97% reaches the pro',
  },
];

export default function HiwTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="dot-grid-ember grid-fade absolute inset-0 opacity-25" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <Reveal>
            <Eyebrow>From broken to fixed in three steps</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
              A marketplace that <span className="text-gradient-ember">works while you sleep</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
              No phone tag, no waiting for a call back, and nobody charging you to find out who is
              available.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20 pl-10 sm:pl-16">
          <div className="absolute left-[14px] top-2 h-full w-px bg-white/10 sm:left-[22px]">
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-ember-soft via-ember to-ember-deep shadow-[0_0_12px_rgba(233,196,106,0.6)]"
            />
          </div>

          <div className="space-y-16">
            {STEPS.map((s, i) => (
              <Reveal key={s.no} delay={i * 0.05}>
                <div className="relative">
                  <div className="absolute -left-10 top-0 grid h-7 w-7 place-items-center rounded-full border border-ember/40 bg-night-900 sm:-left-16">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-ember-soft via-ember to-ember-deep shadow-[0_0_12px_rgba(233,196,106,0.8)]" />
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="font-display text-5xl font-extrabold leading-none text-white/10">
                      {s.no}
                    </span>
                    <div className="sm:pt-2">
                      <h3 className="font-display text-2xl font-semibold text-white">{s.title}</h3>
                      <p className="mt-2 max-w-xl text-zinc-400">{s.body}</p>
                      <p className="mt-3 text-sm font-medium text-ember">{s.meta}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}