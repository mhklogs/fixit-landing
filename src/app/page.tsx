import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import RadarMockup from '@/components/radar-mockup';
import { IMG, AVATARS } from '@/lib/images';
import {
  HOME_BRAND,
  PRO_BRAND,
  BID_FEE_USD,
  TRADE_EMOJI,
  TRADE_LABELS,
  TRADE_CATEGORIES,
} from '@/shared';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fixit-web-rom.vercel.app';

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

const SERVICES = TRADE_CATEGORIES.map((cat) => {
  const name = TRADE_LABELS[cat] ?? cat;
  const imgMap: Record<string, string> = {
    hvac: IMG.hvac,
    hvac_repair: IMG.cleaning,
    plumbing: IMG.plumbing,
    electrical: IMG.electrical,
    roofing: IMG.sidingEnvelope,
    painting: IMG.painting,
    cleaning: IMG.homeInterior,
    landscaping: IMG.landscapingExterior,
    pest_control: IMG.pestControl,
    kitchen_remodel: IMG.kitchenRemodel,
    bathroom_remodel: IMG.decksPatiosCarpentry,
    flooring: IMG.floorTimberTiling,
    garage_door: IMG.garageDoor,
    handyman: IMG.contractorOnSite,
    appliance_repair: IMG.appPhone,
    windows_doors: IMG.heroCard,
    moving: IMG.hero,
    locksmith: IMG.general,
    renovation: IMG.concretePavingMasonry,
    general: IMG.team,
  };
  return {
    cat,
    name,
    emoji: TRADE_EMOJI[cat] ?? '🛠️',
    img: imgMap[cat] ?? IMG.general,
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

const HOME_STEPS = [
  {
    n: '1',
    t: 'Describe what is broken',
    b: 'Write it in your own words — "water dripping through the bathroom ceiling", "AC blows warm air", "garage door will not close". Add a photo if it helps. You can set a target price, or just let pros bid freely.',
    meta: 'Free · Unlimited · About 60 seconds',
  },
  {
    n: '2',
    t: 'Watch the offers come in',
    b: 'Verified contractors near you send you a price and an arrival time. Every new offer pushes a notification to your phone. Compare side by side: price, how fast they can come, and how past customers rated them.',
    meta: 'First offer usually within 11 minutes',
  },
  {
    n: '3',
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

const TESTIMONIALS = [
  {
    quote:
      'I posted a burst pipe at nine in the morning. Three plumbers had sent offers by twenty past nine. I picked the one who could come the same day, and the money was only released after he showed me the finished work. No call centre, no arguing over a quote.',
    name: 'Maria G.',
    role: 'Homeowner',
    avatar: AVATARS.homeG,
  },
  {
    quote:
      'I am an HVAC contractor. Thirty cents an offer costs me less than one missed job. I set my own price and my own arrival time instead of paying fifty dollars a lead to a call centre that never sends anyone.',
    name: 'DeShawn W.',
    role: 'HVAC contractor',
    avatar: AVATARS.proM,
  },
  {
    quote:
      'As an electrician I compete on price and speed, not on how much I spend on advertising. The money is in my wallet seconds after the homeowner signs off, and I keep ninety-six cents of every dollar.',
    name: 'Jaime R.',
    role: 'Electrical contractor',
    avatar: AVATARS.proF,
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
    a: 'The median is about eleven minutes from posting to first offer, and urgent jobs routinely get their first offer in under a minute. It depends on your trade and how many contractors are working near you.',
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
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute -top-48 right-[-12%] h-[36rem] w-[36rem] rounded-full bg-brand/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-25%] left-[-10%] h-[26rem] w-[26rem] rounded-full bg-brand-vivid/10 blur-3xl" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(194,65,12,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(194,65,12,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 75% 60% at 50% 25%, black, transparent)',
          }}
        />

        <div className="shell relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="badge bg-brand-soft text-brand-dark">
              Free for homeowners · Escrow protected
            </span>

            <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Post a home repair job.{' '}
              <span className="text-brand">Watch local pros bid live.</span> Pay when it is
              done.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {HOME_BRAND} connects you with verified plumbers, electricians, HVAC technicians
              and handymen working near you. Describe what is broken once — they send you their
              price and arrival time, you compare every offer side by side, and your payment is
              held safely until the work is finished.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="btn-primary text-base">
                Post a job — it is free
              </Link>
              <a href="#how-it-works" className="btn-outline text-base">
                See how it works
              </a>
            </div>

            <p className="mt-4 text-sm text-ink-muted">
              Are you a contractor?{' '}
              <Link href="/for-pros" className="font-semibold text-brand underline underline-offset-4">
                Join {PRO_BRAND} and pay $0.30 per bid
              </Link>
              .
            </p>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                { value: '< 60s', label: 'to first offer' },
                { value: '96–97%', label: 'reaches the pro' },
                { value: '$0', label: 'cost to you' },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-extrabold text-brand">{s.value}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-glow">
              <Image
                src={IMG.hero}
                alt="A contractor working at a residential job site"
                width={1200}
                height={900}
                className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[540px]"
                priority
              />
            </div>
            <div className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-card">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Offers coming in for &ldquo;water heater leaking&rdquo;
              </p>
              <ul className="mt-3 space-y-2.5">
                {[
                  { name: 'Marcus · HVAC', price: '$349', eta: '14 min' },
                  { name: 'Green Line Plumbing', price: '$395', eta: '22 min' },
                  { name: 'Ace Handyman Co.', price: '$275', eta: '45 min' },
                ].map((b) => (
                  <li key={b.name} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-ink">{b.name}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-xs text-ink-muted">arrives {b.eta}</span>
                      <span className="font-bold text-brand">{b.price}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ IN PLAIN WORDS ============ */}
      <section aria-labelledby="plain-words" className="section section-tint">
        <div className="shell">
          <h2 id="plain-words" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            The short version
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
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
            ].map((b) => (
              <div key={b.h}>
                <h3 className="text-lg font-bold text-brand">{b.h}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" aria-labelledby="services-heading" className="section bg-white">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 id="services-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Every trade, on call
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Twenty trades, from a leaking tap to a full renovation. Post the job once and
              professionals in your area compete for it.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <li key={s.cat}>
                <Link href="/signup" className="group block">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={s.img}
                      alt={`${s.name} services`}
                      width={800}
                      height={500}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-ink">
                    <span aria-hidden>{s.emoji} </span>
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {SERVICE_COPY[s.cat] ?? s.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section
        id="how-it-works"
        aria-labelledby="how-heading"
        className="section section-tint"
      >
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 id="how-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              From broken to fixed in three steps
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              No account juggling, no phone tag, and nobody charging you to be told who is
              available.
            </p>

            <ol className="mt-10 space-y-8">
              {HOME_STEPS.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-brand text-xl font-extrabold text-white"
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{s.t}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{s.b}</p>
                    <p className="mt-2 text-sm font-semibold text-brand">{s.meta}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link href="/signup" className="btn-primary mt-10">
              Post your first job — free
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-card">
            <Image
              src={IMG.homeInterior}
              alt="A homeowner inspecting an issue in a kitchen"
              width={900}
              height={700}
              className="h-[380px] w-full object-cover sm:h-[460px]"
            />
          </div>
        </div>
      </section>

      {/* ============ LIVE BIDS ============ */}
      <section aria-labelledby="live-heading" className="section bg-white">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <RadarMockup />
          <div>
            <h2 id="live-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Offers arrive while you watch
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Your job goes out to verified contractors in your area and they respond straight
              away. Every new offer shows up on your phone with a price and an arrival time, so
              you can judge who is genuinely competitive instead of waiting on a call back.
            </p>

            <dl className="mt-10 space-y-7">
              {RADAR_POINTS.map((p) => (
                <div key={p.t}>
                  <dt className="flex gap-3 font-bold">
                    <span aria-hidden className="mt-1 text-brand">
                      ✓
                    </span>
                    {p.t}
                  </dt>
                  <dd className="mt-1.5 pl-7 leading-relaxed text-ink-muted">{p.b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ SAFETY ============ */}
      <section aria-labelledby="safety-heading" className="section section-tint">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 id="safety-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your money is protected
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Handing over cash before the work is finished is the thing everyone worries about.
              FixIt takes that risk off you.
            </p>
          </div>

          <dl className="mt-12 grid gap-10 sm:grid-cols-2">
            {SAFETY_POINTS.map((p) => (
              <div key={p.t}>
                <dt className="text-lg font-bold">{p.t}</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{p.b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ FOR PROS ============ */}
      <section id="for-pros" aria-labelledby="pros-heading" className="section bg-pro-dark text-white">
        <div className="shell">
          <div className="max-w-2xl">
            <span className="badge bg-white/10 text-white">
              For contractors and tradespeople
            </span>
            <h2 id="pros-heading" className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Stop buying leads. Keep 96–97% of every job.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pro-light">
              The big marketplaces charge contractors $20–$80 for a single lead, and the lead is
              often shared with three to eight other companies. On {PRO_BRAND} you pay a flat $
              {BID_FEE_USD.toFixed(2)} per offer and compete only against local contractors who
              can genuinely do the work.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={IMG.contractorOnSite}
                alt="A professional contractor working on site"
                width={1000}
                height={800}
                className="h-[340px] w-full object-cover"
              />
            </div>

            <dl className="space-y-8">
              {PRO_FEATURES.map((f) => (
                <div key={f.t}>
                  <dt className="text-lg font-bold text-white">{f.t}</dt>
                  <dd className="mt-1.5 leading-relaxed text-pro-light">{f.b}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-pro-light">
                On a traditional lead marketplace
              </p>
              <p className="mt-1 text-3xl font-extrabold text-white/50 line-through">$280</p>
              <p className="mt-2 text-sm text-pro-light">Take-home after lead fees and commission</p>
            </div>
            <div className="rounded-2xl bg-brand p-6">
              <p className="text-sm font-semibold text-white/90">On {PRO_BRAND}</p>
              <p className="mt-1 text-3xl font-extrabold text-white">$383.70</p>
              <p className="mt-2 text-sm text-white/90">
                Take-home after a flat $0.30 per offer
              </p>
            </div>
          </div>

          <div className="mt-12">
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
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section aria-labelledby="testimonials-heading" className="section bg-white">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 id="testimonials-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Used on both sides of the job
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="card flex flex-col p-7">
                <div aria-label="Five out of five stars" className="mb-4 text-amber-500">
                  ★★★★★
                </div>
                <blockquote className="flex-1 leading-relaxed text-ink-muted">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <Image
                    src={t.avatar}
                    alt=""
                    width={100}
                    height={100}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <span>
                    <span className="block font-bold">{t.name}</span>
                    <span className="block text-sm text-ink-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" aria-labelledby="pricing-heading" className="section section-tint">
        <div className="shell">
          <div className="max-w-2xl">
            <h2 id="pricing-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Free for homeowners. $0.30 per offer for contractors.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              There are no subscriptions, no listing fees and no commissions on the homeowner
              side. Ever.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
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
            ].map((p) => (
              <div
                key={p.name}
                className={`card relative flex flex-col p-8 ${
                  p.highlight ? 'ring-2 ring-brand shadow-card-hover' : ''
                }`}
              >
                {p.highlight && (
                  <span className="badge absolute -top-3 left-8 bg-brand text-white">
                    Most chosen by contractors
                  </span>
                )}
                <h3 className="text-sm font-semibold text-ink-muted">{p.name}</h3>
                <p className="mt-2 text-4xl font-extrabold">
                  {p.price}
                  <span className="text-sm font-medium text-ink-muted"> {p.note}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-ink-muted">
                  {p.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span aria-hidden className="mt-1 font-bold text-brand">
                        ✓
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`${p.highlight ? 'btn-primary' : 'btn-outline'} mt-8 w-full`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section aria-labelledby="faq-heading" className="section bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 id="faq-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Questions people actually ask
          </h2>

          <div className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-white p-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="mt-1 flex-none text-xl font-normal text-brand transition-transform group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-gradient-to-br from-brand-vivid to-brand-dark py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            The next leak will not wait for a call back.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">
            Post the job now and see offers arrive within minutes. It is free, and your payment
            stays protected until the work is finished.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/signup" className="btn bg-white text-brand-dark hover:bg-brand-soft">
              Post your first job — free
            </Link>
            <Link href="/for-pros" className="btn border border-white/40 text-white hover:bg-white/10">
              I am a contractor
            </Link>
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </>
  );
}