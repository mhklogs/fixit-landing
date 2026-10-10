import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import FadeIn from '@/components/fade-in';
import RadarMockup from '@/components/radar-mockup';
import { IMG } from '@/lib/images';
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

// Industry photography, mapped so a card never shows a picture that
// contradicts its own label.
const TRADE_IMAGES: Record<string, string> = {
  plumbing: IMG.plumbing,
  electrical: IMG.electrical,
  hvac: IMG.hvac,
  hvac_repair: IMG.hvac,
  roofing: IMG.roofing,
  painting: IMG.painting,
  cleaning: IMG.cleaning,
  landscaping: IMG.landscapingExterior,
  pest_control: IMG.pestControl,
  kitchen_remodel: IMG.kitchenRemodel,
  bathroom_remodel: IMG.kitchenAndBath,
  flooring: IMG.floorTimberTiling,
  garage_door: IMG.garageDoor,
  windows_doors: IMG.windowsDoors,
  handyman: IMG.contractorOnSite,
  renovation: IMG.concretePavingMasonry,
  general: IMG.team,
};

const SERVICES = TRADE_CATEGORIES.map((cat) => {
  const name = TRADE_LABELS[cat] ?? cat;
  return {
    cat,
    name,
    emoji: TRADE_EMOJI[cat] ?? '🛠️',
    img: TRADE_IMAGES[cat] ?? null,
  };
});

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

const HERO_CHIPS = ['Plumbing', 'Electrical', 'HVAC & AC', 'Roofing', 'Handyman', 'Landscaping'];

const HERO_BIDS = [
  { name: 'Marcus · HVAC Pro', price: '$349', eta: '14 min' },
  { name: 'Brighton Plumbing', price: '$395', eta: '22 min' },
  { name: 'Ace Handyman Co.', price: '$275', eta: '45 min' },
];

const HOME_STEPS = [
  {
    n: '01',
    t: 'Describe what is broken',
    b: 'Write it in your own words — "water dripping through the bathroom ceiling", "AC blows warm air", "garage door will not close". Add a photo if it helps. You can set a target price, or just let pros bid freely.',
    meta: 'Free · Unlimited · About 60 seconds',
  },
  {
    n: '02',
    t: 'Watch the offers come in',
    b: 'Verified contractors near you send you a price and an arrival time. Every new offer pushes a notification to your phone. Compare side by side: price, how fast they can come, and how past customers rated them.',
    meta: 'First offer usually within 11 minutes',
  },
  {
    n: '03',
    t: 'Pay after the job is finished',
    b: 'Your money is held safely by Stripe, not by the contractor. When the work is done you confirm it with a photo, and the money is released. If something is wrong you do not release it yet.',
    meta: 'Escrow protected · 96–97% reaches the pro',
  },
];

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
    b: 'Nobody can review themselves or buy a better score. Every star on FixIt traces back to work that was actually completed and paid.',
  },
  {
    t: 'You can hold back or dispute a payment',
    b: 'If the work is incomplete or does not match what you agreed, do not confirm completion and our support team steps in.',
  },
];

const PRO_FEATURES = [
  {
    t: 'A flat $0.30 per bid',
    b: 'Preload a small credit wallet once. Every offer you send deducts $0.30. That is the only fee — no subscriptions, no monthly membership, no minimum ad spend.',
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

// One pass of the trade catalogue. Rendered twice so the CSS translate
// animation loops without a visible seam.
function TickerGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {SERVICES.map((s) => (
        <span
          key={s.cat}
          className="flex items-center gap-3 whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.2em]"
        >
          <span aria-hidden className="text-base">{s.emoji}</span>
          {s.name}
          <span aria-hidden className="text-white/30">&#10022;</span>
        </span>
      ))}
    </div>
  );
}

function TradeTicker() {
  return (
    <section
      aria-label="Trades we cover"
      className="border-y border-brand-dark/20 bg-brand py-4 text-white"
    >
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          <TickerGroup />
          <TickerGroup hidden />
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
    <>
      <JsonLd />
      <Nav />

      <main id="main">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-canvas">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-44 -right-32 h-[36rem] w-[36rem] rounded-full opacity-80 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(194,65,12,0.10) 0%, transparent 68%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-48 -left-40 h-[32rem] w-[32rem] rounded-full opacity-80 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(20,51,122,0.08) 0%, transparent 68%)' }}
          />

          <div className="shell relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-24 lg:pt-20">
            <div>
              <FadeIn>
                <p className="eyebrow">Live-bidding home services</p>
              </FadeIn>

              <FadeIn delay={80}>
                <h1 className="mt-6 text-[2.5rem] leading-[1.05] tracking-tight sm:text-[3.4rem] lg:text-[4.15rem]">
                  Post a home repair job once.{' '}
                  <span className="italic text-brand">Watch pros bid live.</span>{' '}
                  Pay when it&rsquo;s done.
                </h1>
              </FadeIn>

              <FadeIn delay={160}>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  {HOME_BRAND} connects you with verified plumbers, electricians, HVAC technicians
                  and handymen working near you. Describe what is broken once — they send you their
                  price and arrival time, you compare every offer side by side, and your payment is
                  held safely until the work is finished.
                </p>
              </FadeIn>

              <FadeIn delay={240}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/signup" className="btn-primary flex min-h-[52px] px-8 text-base">
                    Post a job — it is free
                  </Link>
                  <a href="#how-it-works" className="btn-outline flex min-h-[52px] px-7 text-base">
                    See how it works
                  </a>
                </div>
                <p className="mt-5 text-sm text-ink-muted">
                  Are you a contractor?{' '}
                  <Link href="/for-pros" className="font-semibold text-brand hover:text-brand-dark">
                    Join {PRO_BRAND} and pay $0.30 per bid
                  </Link>
                  .
                </p>
              </FadeIn>

              <FadeIn delay={320}>
                <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-3 border-t border-line pt-6 text-sm">
                  {[
                    { value: '20', label: 'trades covered' },
                    { value: '$0', label: 'for homeowners' },
                    { value: '96–97%', label: 'paid to the pro' },
                  ].map((s) => (
                    <span key={s.label}>
                      <span className="font-bold text-ink">{s.value}</span>{' '}
                      <span className="text-ink-muted">{s.label}</span>
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={160} className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-tint shadow-card">
                <Image
                  src={IMG.hero}
                  alt="A contractor working at a residential job site"
                  width={1200}
                  height={900}
                  className="h-80 w-full object-cover sm:h-[26rem] lg:h-[30rem]"
                  priority
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.45), transparent 55%)' }}
                />

                {/* Floating live-offers card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-ink/60 px-4 py-3 text-white backdrop-blur-md sm:right-auto sm:max-w-[19rem]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-80" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-light" />
                    </span>
                    Live offers on your job
                  </div>
                  <ul className="mt-2.5 space-y-1.5">
                    {HERO_BIDS.map((b) => (
                      <li key={b.name} className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="truncate font-medium text-white/90">{b.name}</span>
                        <span className="flex-none font-semibold text-brand-light">
                          {b.price} <span className="font-normal text-white/60">· {b.eta}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Start with a service */}
              <div className="mt-6 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Start with a service
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {HERO_CHIPS.map((name) => (
                    <Link key={name} href="/signup" className="chip">
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <TradeTicker />

        {/* ============ IN PLAIN WORDS ============ */}
        <section aria-labelledby="plain-words" className="section section-tint">
          <div className="shell">
            <FadeIn>
              <p className="eyebrow">The short version</p>
              <h2 id="plain-words" className="mt-4 max-w-2xl text-3xl tracking-tight sm:text-4xl">
                No jargon, no call centres, <span className="italic text-brand">no lead fees</span>
              </h2>
            </FadeIn>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {[
                {
                  h: 'What it is',
                  p: 'A marketplace for home repairs. Instead of ringing round five companies and hoping one answers, you post the job once and the contractors come to you.',
                },
                {
                  h: 'Who it is for',
                  p: 'Homeowners who need something fixed, and independent tradespeople who want jobs without paying for leads or running their own advertising.',
                },
                {
                  h: 'What it costs',
                  p: 'Free for homeowners, always. Contractors pay a flat $0.30 for each offer they send. There are no subscriptions on either side.',
                },
              ].map((b, i) => (
                <FadeIn key={b.h} delay={i * 90}>
                  <div className="border-t border-brand/20 pt-6">
                    <span className="font-display text-4xl font-semibold text-brand/60">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 text-xl">{b.h}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{b.p}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section id="services" aria-labelledby="services-heading" className="section bg-white">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <FadeIn className="max-w-2xl">
                <p className="eyebrow">Twenty trades</p>
                <h2 id="services-heading" className="mt-4 text-3xl tracking-tight sm:text-4xl">
                  Every trade, <span className="italic text-brand">on call</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  From a leaking tap to a full renovation. Post the job once and professionals in
                  your area compete for it.
                </p>
              </FadeIn>
              <FadeIn delay={120}>
                <Link href="/signup" className="btn-outline">
                  Post a job
                </Link>
              </FadeIn>
            </div>

            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <li key={s.cat}>
                  <FadeIn delay={(i % 4) * 70} className="h-full">
                    <Link
                      href="/signup"
                      className="card card-hover group flex h-full flex-col overflow-hidden"
                    >
                      <div className="relative h-40 overflow-hidden">
                        {s.img ? (
                          <Image
                            src={s.img}
                            alt={`${s.name} services`}
                            width={800}
                            height={500}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div
                            aria-hidden
                            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/15 via-brand/10 to-brand-vivid/25"
                          >
                            <span className="text-5xl">{s.emoji}</span>
                          </div>
                        )}
                        <span
                          aria-hidden
                          className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-white/90 text-lg shadow-sm backdrop-blur"
                        >
                          {s.emoji}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg">{s.name}</h3>
                        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                          {SERVICE_COPY[s.cat] ?? s.name}
                        </p>
                        <span className="mt-4 text-sm font-semibold text-brand">
                          Post this job <span aria-hidden>&rarr;</span>
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how-it-works" aria-labelledby="how-heading" className="section section-tint">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <FadeIn className="max-w-2xl">
                <p className="eyebrow">How it works</p>
                <h2 id="how-heading" className="mt-4 text-3xl tracking-tight sm:text-4xl">
                  From broken to fixed in <span className="italic text-brand">three steps</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  No account juggling, no phone tag, and nobody charging you to be told who is
                  available.
                </p>
              </FadeIn>
              <FadeIn delay={120}>
                <Link href="/signup" className="btn-primary">
                  Post your first job — free
                </Link>
              </FadeIn>
            </div>

            <ol className="mt-14 grid gap-8 md:grid-cols-3">
              {HOME_STEPS.map((s, i) => (
                <li key={s.n} className="relative">
                  <FadeIn delay={i * 100} className="h-full">
                    <div className="card card-hover flex h-full flex-col p-8">
                      <div className="flex items-start justify-between">
                        <span className="font-display text-5xl font-semibold text-brand/70">
                          {s.n}
                        </span>
                        {i < HOME_STEPS.length - 1 && (
                          <span aria-hidden className="mt-3 hidden text-ink-muted/50 md:block">
                            &rarr;
                          </span>
                        )}
                      </div>
                      <h3 className="mt-6 text-xl">{s.t}</h3>
                      <p className="mt-3 leading-relaxed text-ink-muted">{s.b}</p>
                      <p className="mt-5 text-sm font-semibold text-brand">{s.meta}</p>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>

            <FadeIn className="relative mt-14 overflow-hidden rounded-2xl">
              <Image
                src={IMG.homeInterior}
                alt="A homeowner inspecting an issue in a kitchen"
                width={1600}
                height={700}
                className="h-[260px] w-full object-cover sm:h-[340px]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <p className="absolute bottom-6 left-6 max-w-md text-lg text-white sm:bottom-9 sm:left-9 sm:text-xl">
                One job post reaches every verified pro in your area — all at once.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ============ LIVE BIDS ============ */}
        <section aria-labelledby="live-heading" className="section bg-white">
          <div className="shell grid items-center gap-14 lg:grid-cols-2">
            <FadeIn className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-10">
              <RadarMockup />
            </FadeIn>
            <FadeIn delay={120}>
              <p className="eyebrow">Live bidding</p>
              <h2 id="live-heading" className="mt-4 text-3xl tracking-tight sm:text-4xl">
                Offers arrive <span className="italic text-brand">while you watch</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Your job goes out to verified contractors in your area and they respond straight
                away. Every new offer shows up on your phone with a price and an arrival time, so
                you can judge who is genuinely competitive instead of waiting on a call back.
              </p>

              <dl className="mt-10 space-y-6">
                {RADAR_POINTS.map((p, i) => (
                  <FadeIn key={p.t} delay={i * 70}>
                    <div className="flex gap-4">
                      <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                        {i + 1}
                      </span>
                      <div>
                        <dt className="font-semibold">{p.t}</dt>
                        <dd className="mt-1 leading-relaxed text-ink-muted">{p.b}</dd>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </dl>
            </FadeIn>
          </div>
        </section>

        {/* ============ SAFETY ============ */}
        <section aria-labelledby="safety-heading" className="section section-tint">
          <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn>
              <p className="eyebrow">Protection</p>
              <h2 id="safety-heading" className="mt-4 text-3xl tracking-tight sm:text-4xl">
                Your money is <span className="italic text-brand">protected</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Handing over cash before the work is finished is the thing everyone worries about.
                FixIt takes that risk off you.
              </p>
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand text-white">
                  <ShieldIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold">Held by Stripe, released by you</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Nothing reaches the contractor until you confirm the work with a photo.
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2">
              {SAFETY_POINTS.map((p, i) => (
                <FadeIn key={p.t} delay={(i % 2) * 80} className="h-full">
                  <div className="card card-hover h-full p-7">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                      <CheckIcon />
                    </span>
                    <h3 className="mt-5 text-lg">{p.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.b}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FOR PROS ============ */}
        <section
          id="for-pros"
          aria-labelledby="pros-heading"
          className="relative overflow-hidden bg-pro-dark text-white"
        >
          <div aria-hidden className="dot-grid-light pointer-events-none absolute inset-0 opacity-40" />
          <div className="shell relative section">
            <div className="grid items-start gap-14 lg:grid-cols-2">
              <FadeIn>
                <span className="badge bg-white/10 text-white">
                  For contractors and tradespeople
                </span>
                <h2 id="pros-heading" className="mt-6 text-3xl tracking-tight sm:text-4xl">
                  Stop buying leads.{' '}
                  <span className="italic text-brand-light">Keep 96–97% of every job.</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-pro-light">
                  The big marketplaces charge contractors $20–$80 for a single lead, and the lead is
                  often shared with three to eight other companies. On {PRO_BRAND} you pay a flat $
                  {BID_FEE_USD.toFixed(2)} per offer and compete only against local contractors who
                  can genuinely do the work.
                </p>

                <dl className="mt-10 space-y-7">
                  {PRO_FEATURES.map((f, i) => (
                    <FadeIn key={f.t} delay={i * 70}>
                      <div className="flex gap-4 border-t border-white/10 pt-6">
                        <span className="mt-1 flex-none text-brand-light">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        <div>
                          <dt className="font-semibold text-white">{f.t}</dt>
                          <dd className="mt-1.5 leading-relaxed text-pro-light">{f.b}</dd>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </dl>

                <div className="mt-10">
                  <Link href="/onboarding" className="btn bg-white text-pro-dark hover:bg-pro-soft">
                    Start earning with {PRO_BRAND}
                  </Link>
                  <p className="mt-4 text-sm text-pro-light">
                    Not a contractor yet?{' '}
                    <Link href="/for-pros" className="font-semibold text-white underline underline-offset-4">
                      Read how it works first
                    </Link>
                    .
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={120} className="lg:pt-16">
                <div className="overflow-hidden rounded-2xl shadow-card">
                  <Image
                    src={IMG.contractorOnSite}
                    alt="A professional contractor working on site"
                    width={1000}
                    height={800}
                    className="h-[340px] w-full object-cover"
                  />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pro-light">
                      Lead marketplace
                    </p>
                    <p className="mt-2 text-3xl text-white/40 line-through">$280</p>
                    <p className="mt-2 text-sm text-pro-light">
                      Take-home after lead fees and commission
                    </p>
                  </div>
                  <div className="rounded-2xl bg-brand p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                      On {PRO_BRAND}
                    </p>
                    <p className="mt-2 text-3xl text-white">$383.70</p>
                    <p className="mt-2 text-sm text-white/90">
                      Take-home after a flat $0.30 per offer
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ============ DIFFERENCES ============ */}
        <section aria-labelledby="differences-heading" className="section bg-white">
          <div className="shell">
            <FadeIn className="max-w-2xl">
              <p className="eyebrow">The difference</p>
              <h2 id="differences-heading" className="mt-4 text-3xl tracking-tight sm:text-4xl">
                How this differs from <span className="italic text-brand">paying for leads</span>
              </h2>
            </FadeIn>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {DIFFERENCES.map((d, i) => (
                <FadeIn key={d.h} delay={i * 80} className="h-full">
                  <div className="card card-hover flex h-full flex-col border-t-2 border-t-brand/30 p-8">
                    <span className="font-display text-4xl font-semibold text-brand/60">
                      0{i + 1}
                    </span>
                    <h3 className="mt-5 text-xl">{d.h}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{d.p}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section id="pricing" aria-labelledby="pricing-heading" className="section section-tint">
          <div className="shell">
            <FadeIn className="max-w-2xl">
              <p className="eyebrow">Pricing</p>
              <h2 id="pricing-heading" className="mt-4 text-3xl tracking-tight sm:text-4xl">
                Free for homeowners. <span className="italic text-brand">$0.30 per offer</span> for
                contractors.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                There are no subscriptions, no listing fees and no commissions on the homeowner
                side. Ever.
              </p>
            </FadeIn>

            <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
              {PLANS.map((p, i) => (
                <FadeIn key={p.name} delay={i * 80} className="h-full">
                  <div
                    className={`relative flex h-full flex-col rounded-2xl p-8 ${
                      p.highlight
                        ? 'bg-pro-dark text-white shadow-card-hover'
                        : 'card'
                    }`}
                  >
                    {p.highlight && (
                      <span className="badge absolute -top-3 left-8 bg-brand text-white">
                        Most chosen by contractors
                      </span>
                    )}
                    <h3 className={`text-sm font-semibold ${p.highlight ? 'text-pro-light' : 'text-ink-muted'}`}>
                      {p.name}
                    </h3>
                    <p className="mt-2 text-4xl">
                      {p.price}
                      <span className={`text-sm font-medium ${p.highlight ? 'text-pro-light' : 'text-ink-muted'}`}>
                        {' '}
                        {p.note}
                      </span>
                    </p>
                    <ul
                      className={`mt-6 flex-1 space-y-3 ${p.highlight ? 'text-pro-light' : 'text-ink-muted'}`}
                    >
                      {p.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className={`mt-0.5 flex-none ${p.highlight ? 'text-brand-light' : 'text-brand'}`}
                          >
                            <CheckIcon />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={p.href}
                      className={`${
                        p.highlight ? 'btn bg-white text-pro-dark hover:bg-pro-soft' : 'btn-outline'
                      } mt-8 w-full`}
                    >
                      {p.cta}
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" aria-labelledby="faq-heading" className="section bg-white">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeIn className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-heading" className="mt-4 text-3xl tracking-tight sm:text-4xl">
                Questions people <span className="italic text-brand">actually ask</span>
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Everything you need to know before posting your first job.
              </p>
              <Link href="/signup" className="btn-outline mt-8">
                Post a job — it is free
              </Link>
            </FadeIn>

            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <FadeIn key={f.q} delay={Math.min(i * 40, 240)}>
                  <details className="group rounded-2xl border border-line bg-surface px-6 py-5 open:shadow-card">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg [&::-webkit-details-marker]:hidden">
                      <span className="font-semibold">{f.q}</span>
                      <span
                        aria-hidden
                        className="mt-1 flex-none text-xl font-normal text-brand transition-transform group-open:rotate-45"
                      >
                        ＋
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-ink-muted">{f.a}</p>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-vivid to-brand-dark py-24 text-white">
          <div aria-hidden className="dot-grid-light pointer-events-none absolute inset-0 opacity-50" />
          <div className="shell relative text-center">
            <FadeIn>
              <h2 className="mx-auto max-w-3xl text-3xl tracking-tight sm:text-5xl">
                The next leak will not wait <span className="italic text-brand-soft">for a call back.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
                Post the job now and see offers arrive within minutes. It is free, and your payment
                stays protected until the work is finished.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/signup" className="btn bg-white text-brand-dark hover:bg-brand-soft">
                  Post your first job — free
                </Link>
                <Link href="/for-pros" className="btn border border-white/40 text-white hover:bg-white/10">
                  I am a contractor
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}