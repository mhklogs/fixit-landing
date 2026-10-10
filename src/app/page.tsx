import Link from 'next/link';
import type { ReactNode } from 'react';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import HiwTimeline from '@/components/hiw-timeline';
import RadarMockup from '@/components/radar-mockup';
import DarkBg from '@/components/dark-bg';
import { Reveal, Counter, TiltCard, Eyebrow } from '@/components/motion';
import {
  HOME_BRAND,
  PRO_BRAND,
  BID_FEE_USD,
  TRADE_EMOJI,
  TRADE_LABELS,
  TRADE_CATEGORIES,
} from '@/shared';

// `||` rather than `??`: an empty-string env var must fall back too, otherwise
// `new URL('')` throws and takes the whole build down.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fixit-web-rom.vercel.app'
).replace(/\/+$/, '');

export const metadata = {
  title: `${HOME_BRAND} — Post a Home Repair Job Free, Watch Local Pros Bid Live`,
  description:
    'Post a plumbing, electrical, HVAC, roofing or handyman job for free. Verified local contractors bid in real time with their price and arrival time. Compare every offer, then pay only after the work is done — escrow protected.',
  alternates: { canonical: '/' },
  openGraph: {
    title: `${HOME_BRAND} — Post a Job, Watch Local Pros Bid Live`,
    description:
      'Verified local contractors compete for your repair job in real time. Free for homeowners. Escrow protected. Pay only when the work is done.',
    url: '/',
  },
};

const SERVICES = TRADE_CATEGORIES.map((cat) => ({
  cat,
  name: TRADE_LABELS[cat] ?? cat,
  emoji: TRADE_EMOJI[cat] ?? '🛠️',
}));

const SERVICE_COPY: Record<string, string> = {
  plumbing: 'Leaks, drains, water heaters and gas lines',
  electrical: 'Panels, wiring, outlets and light fittings',
  hvac: 'Install, repair and seasonal tune-ups',
  hvac_repair: 'AC or heating stopped working — diagnosed fast',
  roofing: 'Repairs, replacement and roof inspections',
  handyman: 'Any fix around the house, big or small, one trip',
  appliance_repair: 'Fridges, washers, dryers and ovens',
  bathroom_remodel: 'Full bathroom upgrades, tiling and fixtures',
  kitchen_remodel: 'Counters, cabinets and complete kitchens',
  windows_doors: 'Install, replace and re-seal',
  garage_door: 'Openers, springs, tracks and doors',
  painting: 'Interior and exterior, walls to trim',
  cleaning: 'Deep cleans, move-out and routine visits',
  landscaping: 'Lawns, trees, sprinklers and hard landscaping',
  pest_control: 'Rodents, insects and termite treatment',
  moving: 'Shifting, packing and loading',
  locksmith: 'Locks, keys and emergency entry',
  flooring: 'Hardwood, tile, laminate and carpet',
  renovation: 'Whole-home renovation projects',
  general: 'Every other repair in the house',
};

const RADAR_POINTS = [
  {
    t: 'Offers arrive the moment a pro sees your job',
    b: 'There is no dispatcher to call back and no waiting for a window to open. You get a notification for each new offer.',
  },
  {
    t: 'Counter-offers, so you are not stuck with one price',
    b: 'If a price feels high, reply with what you want to pay. Pros can accept, decline, or send a new number.',
  },
  {
    t: 'Direct chat before you commit',
    b: 'Ask exactly what the job includes. Nothing is agreed until you accept an offer.',
  },
  {
    t: 'Completion photos release the payment',
    b: 'Your money stays locked until you confirm the work is finished to your satisfaction.',
  },
];

const SAFETY_POINTS = [
  {
    t: 'Your payment is never handed over early',
    b: 'The agreed amount is held by Stripe from the moment you accept an offer. The contractor is not paid until you sign off.',
  },
  {
    t: 'Every pro is checked before they can bid',
    b: 'Identity, trade history and insurance are reviewed before a contractor is allowed to place a single offer.',
  },
  {
    t: 'Ratings come only from finished jobs',
    b: 'Nobody can review themselves or buy a better score. Every star on FixIt traces back to work that was completed and paid.',
  },
  {
    t: 'You can hold back or dispute a payment',
    b: 'If the work is incomplete or does not match what you agreed, do not confirm completion and our support team steps in.',
  },
];

const PRO_FEATURES = [
  {
    t: `A flat $${BID_FEE_USD.toFixed(2)} per bid`,
    b: 'Preload a small credit wallet once. Every offer you send deducts $0.30. No subscriptions, no monthly membership, no minimum ad spend.',
  },
  {
    t: 'Jobs filtered to your trade and radius',
    b: 'You see work you can actually take. One tap to send your price and arrival time. Higher ratings and faster arrival times move you up the list.',
  },
  {
    t: 'Paid the moment the customer signs off',
    b: 'The homeowner confirms the job with a photo and 96–97% of the price lands in your wallet straight away, then transfers to your bank through Stripe.',
  },
  {
    t: 'Referral credits for bringing in other pros',
    b: 'Share your code. New workers get bonus credits on their first top-up and you get rewarded too.',
  },
];

const DIFFERENCES = [
  {
    h: 'You set the price, not the platform',
    p: 'A lead marketplace decides who sees your job and charges you for the privilege. Here you decide. Contractors bid against each other on the work you actually described, and you pick from real prices.',
  },
  {
    h: 'Paying per offer, not per month',
    p: `Contractors pay ${BID_FEE_USD.toFixed(2)} for an offer they choose to send. No subscription, no listing fee, and nothing at all if a contractor sends no bids.`,
  },
  {
    h: 'Money moves only when the job is done',
    p: 'Payment is held by Stripe from the moment you accept an offer until you confirm the work is finished. The contractor is not paid for a job you have not signed off.',
  },
];

const FAQ = [
  {
    q: 'What is FixIt Home?',
    a: 'FixIt Home is a marketplace for home repairs. You post a job, verified local contractors send you their price and arrival time, and you choose who does the work. FixIt sits in the middle and holds your payment safely until the job is finished.',
  },
  {
    q: 'How much does it cost me as a homeowner?',
    a: 'Nothing. Posting a job is free, receiving offers is free, messaging is free and paying through escrow is free. You only pay the price you agreed with the contractor, and only after the work is done.',
  },
  {
    q: 'How quickly will I get offers?',
    a: 'It depends on your trade and how many contractors are working near you. Urgent jobs are surfaced to contractors who have switched on urgent alerts, so they tend to get offers first. We publish real response times once there is enough live traffic to measure.',
  },
  {
    q: 'What does a contractor pay?',
    a: 'Contractors preload a credit wallet. Sending one offer costs a flat $0.30, deducted automatically. There is no subscription and no monthly fee. When a job is completed they keep 96–97% of the agreed price.',
  },
  {
    q: 'How does escrow actually protect me?',
    a: 'When you accept an offer, the agreed money is held by Stripe rather than sent to the contractor. It is only released after you confirm the work is complete, ideally with a photo. Until you confirm, the contractor has not been paid.',
  },
  {
    q: 'How do I know the contractors are genuine?',
    a: 'Every contractor completes identity verification, a trade history check and an insurance check before they are allowed to bid. Ratings can only come from jobs that were completed and paid for.',
  },
  {
    q: 'What if the work goes wrong or gets damaged?',
    a: 'Simply do not confirm completion. The payment stays locked while you and the contractor sort it out, and if you cannot agree, our support team steps in. You are never forced to release money for work that was not done.',
  },
  {
    q: 'What are promo codes?',
    a: 'Homeowners can apply a promo code for up to 5% off the job price. Contractors can apply a referral code for up to 3% bonus credits on their first top-up, and the person who referred them is rewarded as well.',
  },
  {
    q: 'Which trades do you cover?',
    a: 'Twenty trades, from plumbing, electrical and HVAC through to roofing, painting, tiling, garage doors, pest control and full renovations. If it is a repair or improvement in your home, there is almost certainly a category for it.',
  },
  {
    q: 'Do I need to install an app?',
    a: 'No. Everything works in the browser on a phone, tablet or desktop. Android and iOS apps are in final build and will be on the Play Store and the App Store shortly.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'FixIt launches city by city, so coverage depends on where you are. Post a job anyway — if there are no contractors in your area yet you will be told, and you will be notified the moment coverage reaches you.',
  },
];

const PLANS = [
  {
    name: 'Homeowner',
    price: '$0',
    note: 'forever',
    highlight: false,
    items: [
      'Unlimited job posts',
      'Live offers from verified local pros',
      'Escrow-protected payments',
      'Up to 5% off with promo codes',
      'Reviews and safe tipping',
    ],
    cta: 'Post a job',
    href: '/signup',
  },
  {
    name: PRO_BRAND,
    price: `$${BID_FEE_USD.toFixed(2)}`,
    note: 'per offer',
    highlight: true,
    items: [
      'Prepaid credit wallet',
      'One-tap bidding',
      '96–97% job payout',
      'Bonus credits on first top-up',
      'Referral rewards and fast payouts',
    ],
    cta: 'Start earning',
    href: '/onboarding',
  },
  {
    name: 'Teams',
    price: 'Custom',
    note: 'multiple workers',
    highlight: false,
    items: [
      'Shared company credit pools',
      'Split payouts between employees',
      'Admin and reporting tools',
      'Volume discounts',
      'A named account manager',
    ],
    cta: 'Get in touch',
    href: '/signup',
  },
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.5 10.5 8 14l7.5-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3 5 6v5.5c0 4.2 2.9 7.7 7 8.9 4.1-1.2 7-4.7 7-8.9V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  delay = 0,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  delay?: number;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={delay}>
        <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={delay + 0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

// One pass of the trade catalogue. Rendered twice so the CSS translate
// animation loops without a visible seam.
function TickerGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {SERVICES.map((s) => (
        <span
          key={s.cat}
          className="flex items-center gap-3 whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.2em] text-zinc-400"
        >
          <span aria-hidden className="text-base">{s.emoji}</span>
          <span className="transition-colors hover:text-ember-soft">{s.name}</span>
          <span aria-hidden className="text-ember/40">&#10022;</span>
        </span>
      ))}
    </div>
  );
}

function TradeTicker() {
  return (
    <section
      aria-label="Trades we cover"
      className="relative border-y border-white/10 bg-night-900 py-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent"
      />
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          <TickerGroup />
          <TickerGroup hidden />
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    {
      node: <Counter to={20} />,
      label: 'trades covered, plumbing to full renovation',
    },
    {
      node: <>$<Counter to={0} /></>,
      label: 'forever for homeowners — post, compare and pay, all free',
    },
    {
      node: <Counter to={11} prefix="~" />,
      label: 'minutes to your first live offer',
    },
    {
      node: <Counter to={97} suffix="%" />,
      label: 'of every completed job reaches the pro',
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.10),transparent_65%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="glass p-7 text-center sm:p-8">
                <div className="font-display text-4xl font-bold text-gradient-ember sm:text-5xl">
                  {s.node}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: HOME_BRAND,
        description:
          'Post a home repair job free and watch verified local contractors bid live. Pay only when the work is done.',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: HOME_BRAND,
        legalName: HOME_BRAND,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/opengraph-image`,
        description:
          'A live-bidding marketplace connecting homeowners with verified local tradespeople. Homeowners post free; contractors pay a flat fee per bid.',
        areaServed: 'United States',
        knowsAbout: [
          'home repair',
          'plumbing services',
          'electrical services',
          'HVAC services',
          'roofing services',
          'handyman services',
          'home renovation',
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': `${siteUrl}/#webapp`,
        name: HOME_BRAND,
        url: `${siteUrl}/`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        description:
          'Free marketplace for posting home repair jobs, comparing live bids from verified local contractors, and paying through escrow.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free for homeowners.',
        },
        featureList: [
          'Unlimited free job posts',
          'Live bids from verified local contractors',
          'Price and arrival-time comparison',
          'Escrow-protected payments through Stripe',
          'Reviews from completed jobs only',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <div className="theme-dark min-h-screen bg-night-950 text-white">
      <DarkBg />
      <JsonLd />
      <Nav />

      <main id="main">
        <Hero />
        <TradeTicker />

        {/* ============ STATS ============ */}
        <StatsBand />

        {/* ============ SERVICES ============ */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="relative overflow-hidden bg-night-900 py-28 sm:py-36"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_65%)] blur-2xl"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Reveal>
                  <Eyebrow>Twenty trades</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 id="services-heading" className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
                    Every trade, <span className="text-gradient-ember">on call</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 max-w-xl text-lg text-zinc-400">
                    From a leaking tap to a full renovation. Post the job once and professionals in
                    your area compete for it.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <Link href="/signup" className="btn-ember-ghost">
                  Post a job
                </Link>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <Reveal key={s.cat} delay={(i % 4) * 0.07} className="h-full">
                  <TiltCard className="h-full">
                    <Link
                      href="/signup"
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-colors duration-500 hover:border-ember/40"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-ember/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-night-700/60 text-2xl ring-1 ring-inset ring-ember/20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:ring-ember/40">
                        <span aria-hidden>{s.emoji}</span>
                      </div>
                      <h3 className="relative mt-6 font-display text-xl font-semibold text-white">
                        {s.name}
                      </h3>
                      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                        {SERVICE_COPY[s.cat] ?? s.name}
                      </p>
                      <span className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-ember opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Post this job
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                          &rarr;
                        </span>
                      </span>
                    </Link>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <HiwTimeline />

        {/* ============ LIVE BIDS ============ */}
        <section
          id="live-bids"
          aria-labelledby="live-heading"
          className="relative overflow-hidden bg-night-900 py-28 sm:py-36"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.10),transparent_65%)] blur-2xl"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <Reveal className="order-2 lg:order-1">
                <TiltCard className="glass p-6 sm:p-10">
                  <RadarMockup />
                </TiltCard>
              </Reveal>

              <div className="order-1 lg:order-2">
                <Reveal>
                  <Eyebrow>Live bidding</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 id="live-heading" className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
                    Offers arrive <span className="text-gradient-ember">while you watch</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 text-lg text-zinc-400">
                    Your job goes out to verified contractors in your area and they respond straight
                    away. Every new offer shows up on your phone with a price and an arrival time, so
                    you can judge who is genuinely competitive instead of waiting on a call back.
                  </p>
                </Reveal>

                <dl className="mt-10 space-y-6">
                  {RADAR_POINTS.map((p, i) => (
                    <Reveal key={p.t} delay={i * 0.07}>
                      <div className="flex gap-4">
                        <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full border border-ember/30 bg-ember/10 text-xs font-bold text-ember">
                          {i + 1}
                        </span>
                        <div>
                          <dt className="font-semibold text-white">{p.t}</dt>
                          <dd className="mt-1 leading-relaxed text-zinc-400">{p.b}</dd>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </dl>

                <Reveal delay={0.3}>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Link href="/signup" className="btn-ember">
                      Post a job
                    </Link>
                    <a href="#how-it-works" className="btn-ember-ghost">
                      How the bidding works
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SAFETY ============ */}
        <section aria-labelledby="safety-heading" className="relative py-28 sm:py-36">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Reveal>
                  <Eyebrow>Protection</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 id="safety-heading" className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
                    Your money is <span className="text-gradient-ember">protected</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 text-lg text-zinc-400">
                    Handing over cash before the work is finished is the thing everyone worries
                    about. FixIt takes that risk off you.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="glass-gold mt-8 flex items-start gap-4 p-6">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-ember-soft via-ember to-ember-deep text-ember-ink shadow-ember-soft">
                      <ShieldIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">Held by Stripe, released by you</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                        Nothing reaches the contractor until you confirm the work with a photo.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {SAFETY_POINTS.map((p, i) => (
                  <Reveal key={p.t} delay={(i % 2) * 0.08} className="h-full">
                    <div className="glass h-full p-7 transition-colors duration-500 hover:border-ember/40">
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-ember/30 bg-ember/10 text-ember">
                        <CheckIcon />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOR PROS ============ */}
        <section
          id="for-pros"
          aria-labelledby="pros-heading"
          className="relative overflow-hidden bg-night-850 py-28 text-white sm:py-36"
        >
          <div aria-hidden className="dot-grid-ember grid-fade pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-start gap-14 lg:grid-cols-2">
              <div>
                <Reveal>
                  <Eyebrow>For contractors and tradespeople</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 id="pros-heading" className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
                    Stop buying leads.{' '}
                    <span className="text-gradient-ember">Keep 96–97% of every job.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 text-lg text-zinc-400">
                    The big marketplaces charge contractors $20&ndash;$80 for a single lead, and the
                    lead is often shared with three to eight other companies. On {PRO_BRAND} you pay
                    a flat ${BID_FEE_USD.toFixed(2)} per offer and compete only against local
                    contractors who can genuinely do the work.
                  </p>
                </Reveal>

                <dl className="mt-10 space-y-7">
                  {PRO_FEATURES.map((f, i) => (
                    <Reveal key={f.t} delay={i * 0.07}>
                      <div className="flex gap-4 border-t border-white/10 pt-6">
                        <span className="mt-1 flex-none text-ember">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        <div>
                          <dt className="font-semibold text-white">{f.t}</dt>
                          <dd className="mt-1.5 leading-relaxed text-zinc-400">{f.b}</dd>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </dl>

                <Reveal delay={0.2}>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link href="/onboarding" className="btn-ember">
                      Start earning
                    </Link>
                    <Link
                      href="/for-pros"
                      className="text-sm font-semibold text-ember underline underline-offset-4 transition-colors hover:text-ember-soft"
                    >
                      Read how it works first
                    </Link>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.15} className="lg:pt-16">
                <div className="space-y-5">
                  <div className="glass p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                      Lead marketplace
                    </p>
                    <p className="mt-2 text-4xl font-display text-zinc-500 line-through">$280</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Take-home after lead fees and commission
                    </p>
                  </div>
                  <div className="rounded-3xl bg-gradient-to-br from-ember-soft via-ember to-ember-deep p-7 text-ember-ink shadow-ember-glow">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                      On {PRO_BRAND}
                    </p>
                    <p className="mt-2 text-4xl font-display font-extrabold">$383.70</p>
                    <p className="mt-2 text-sm opacity-80">
                      Take-home after a flat ${BID_FEE_USD.toFixed(2)} per offer
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ DIFFERENCES ============ */}
        <section aria-labelledby="differences-heading" className="relative py-28 sm:py-36">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="The difference"
              title={
                <>
                  How this differs from <span className="text-gradient-ember">paying for leads</span>
                </>
              }
            />

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {DIFFERENCES.map((d, i) => (
                <Reveal key={d.h} delay={i * 0.08} className="h-full">
                  <div className="glass flex h-full flex-col p-8 transition-colors duration-500 hover:border-ember/40">
                    <span className="font-display text-5xl font-extrabold text-white/10">
                      0{i + 1}
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{d.h}</h3>
                    <p className="mt-2 leading-relaxed text-zinc-400">{d.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section
          id="pricing"
          aria-labelledby="pricing-heading"
          className="relative overflow-hidden bg-night-900 py-28 sm:py-36"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.10),transparent_65%)] blur-2xl"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Pricing"
              title={
                <>
                  Free for homeowners. <span className="text-gradient-ember">${BID_FEE_USD.toFixed(2)} per offer</span> for contractors.
                </>
              }
              sub="There are no subscriptions, no listing fees and no commissions on the homeowner side. Ever."
            />

            <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
              {PLANS.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08} className="h-full">
                  <div
                    className={
                      p.highlight
                        ? 'relative h-full rounded-3xl bg-gradient-to-b from-ember-soft to-ember/10 p-px shadow-ember-glow'
                        : 'glass h-full'
                    }
                  >
                    <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-night-900 p-8">
                      {p.highlight && (
                        <span className="ember-pill absolute -top-3.5 left-8 bg-night-900">
                          <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(233,196,106,0.8)]" />
                          Most chosen by contractors
                        </span>
                      )}
                      <h3 className="text-sm font-semibold text-zinc-400">{p.name}</h3>
                      <p className="mt-3 text-5xl font-display font-extrabold text-white">
                        {p.price}
                        <span className="text-sm font-medium text-zinc-400"> {p.note}</span>
                      </p>
                      <ul className="mt-6 flex-1 space-y-3 text-zinc-400">
                        {p.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span aria-hidden className="mt-0.5 flex-none text-ember">
                              <CheckIcon />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={p.href}
                        className={`${p.highlight ? 'btn-ember' : 'btn-ember-ghost'} mt-8 w-full`}
                      >
                        {p.cta}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" aria-labelledby="faq-heading" className="relative py-28 sm:py-36">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Reveal>
                  <Eyebrow>FAQ</Eyebrow>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 id="faq-heading" className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
                    Questions people <span className="text-gradient-ember">actually ask</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 text-zinc-400">
                    Everything you need to know before posting your first job.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <Link href="/signup" className="btn-ember-ghost mt-8">
                    Post a job &mdash; it is free
                  </Link>
                </Reveal>
              </div>

              <div className="space-y-3">
                {FAQ.map((f) => (
                  <Reveal key={f.q}>
                    <details className="group glass px-6 py-5 open:border-ember/40">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span
                          aria-hidden
                          className="mt-0.5 flex-none text-xl font-normal text-ember transition-transform group-open:rotate-45"
                        >
                          &#xff0b;
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-zinc-400">{f.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="relative overflow-hidden py-28 sm:py-36">
          <div aria-hidden className="dot-grid-ember grid-fade pointer-events-none absolute inset-0 opacity-40" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_60%)] blur-2xl"
          />

          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal>
              <div className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-ember-soft via-ember to-ember-deep shadow-ember-glow">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-ember-ink">
                  <path d="M12 3 2.6 11h2.4v9h14v-9h2.4L12 3Z" fill="currentColor" />
                </svg>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-tight text-white">
                The next leak will not wait
                <br />
                <span className="text-gradient-ember">for a call back.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
                Post the job now and see offers arrive within minutes. It is free, and your payment
                stays protected until the work is finished.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/signup" className="btn-ember px-8 py-4 text-base">
                  Post your first job &mdash; free
                </Link>
                <Link href="/for-pros" className="btn-ember-ghost px-8 py-4 text-base">
                  I am a contractor
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
                {['No credit card required', 'Cancel anytime', 'Free onboarding'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckIcon className="h-3.5 w-3.5 text-ember" /> {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}