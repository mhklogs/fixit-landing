import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { IMG } from '@/lib/images';
import { HOME_BRAND, PRO_BRAND } from '@/shared';

const steps = [
  {
    n: '1',
    t: 'Snap & broadcast',
    b: 'Tell us what’s broken — text, photo, or voice. Your job goes live to verified local pros in your radius in seconds. Free and unlimited, forever.',
  },
  {
    n: '2',
    t: 'Watch pros bid live',
    b: 'Real contractors fight for your job with price + ETA on a live radar. Compare every offer side-by-side, ask questions in chat, pick the best.',
  },
  {
    n: '3',
    t: 'Pay only when it’s done',
    b: 'Your money sits in Stripe escrow — released only after you confirm the work with a completion photo. 96–97% goes to the pro. A refund or a dispute is always available.',
  },
];

const compares = [
  {
    us: 'Live bids from verified local pros within minutes',
    them: 'Pay $20–120 per shared lead to 3–8 companies at once, then wait for call-backs',
  },
  {
    us: 'Stripe escrow — money released on YOUR sign-off',
    them: 'Most platforms never hold money; you pay pros directly, often before work is done',
  },
  {
    us: '$0 for homeowners — ever',
    them: 'Lead fees, subscriptions ($300+/yr) and 10–25% fees baked into your quote',
  },
  {
    us: 'Price you can see competed down in real time',
    them: 'Price you get told after paying for the lead',
  },
];

const useCases = [
  { e: '🚰', t: 'Burst pipe at 9am', b: 'Broadcast once — three plumbers bid within 20 minutes. Pick by price and ETA, pay on completion.' },
  { e: '❄️', t: 'Dead AC in summer', b: 'Set a target price or open bidding. Pros compete on speed so you’re not roasting for a week.' },
  { e: '🎨', t: 'Whole-house painting', b: 'Get competing fixed quotes from painters who show their rating and past jobs — no estimators to sit through.' },
  { e: '🔑', t: 'Locked out at midnight', b: '24/7 urgent jobs are flagged up top; emergency pros bid with fastest-ETA priority.' },
];

const faq = [
  { q: 'How much does it cost homeowners?', a: 'Nothing. Broadcasting, receiving bids, chatting, and paying through escrow are free. You only pay the agreed job price once the work is done to your sign-off.' },
  { q: 'How do I know a pro is real?', a: 'Every bidder is verified — identity, trade history, and insurance are checked before they can place a single bid. Ratings are only from actual completed jobs.' },
  { q: 'What if the job goes wrong?', a: 'Money is held in escrow until you confirm completion with photos. If it’s not right, hold it back and work it out with the pro or our support team.' },
  { q: 'Is this app free to install?', a: 'Yes — download FixIt and start posting within a minute. No card, no subscription, no surprise fees.' },
];

export const metadata = {
  title: 'FixIt for Homeowners — Post a Job, Watch Pros Bid Live',
  description:
    'Post a free job, get live competing bids from verified local pros, and pay through Stripe escrow only when the work is done. No call centers, no lead fees.',
};

export default function ForHomeownersPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/70 to-canvas">
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="badge bg-white text-brand border border-brand/10 shadow-sm">
              The homeowner side of {HOME_BRAND}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Get your home fixed by <span className="text-brand">real locals</span> who compete for your job.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted">
              No call centers. No $25 “lead fees” for a random company to call you back.
              You post one photo, watch verified pros bid live with price and ETA,
              and pay only when the work is done — held safe in escrow until you sign off.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/signup" className="btn-primary text-base">Post a job — it’s free</a>
              <a href="https://github.com/mhklogs/fixit-home-android/releases/latest/download/FixItHome.apk" className="btn-secondary text-base">
                Download the FixIt app
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { value: '20', label: 'trades covered' },
                { value: '$0', label: 'for homeowners' },
                { value: 'Escrow', label: 'money safe till done' },
                { value: '4.9★', label: 'from real jobs' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold">{s.value}</p>
                  <p className="text-sm text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-brand/20">
              <Image
                src={IMG.hero}
                alt="A homeowner watching pros bid live for their home repair"
                width={1200}
                height={900}
                className="h-[420px] w-full object-cover lg:h-[520px]"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-72 rounded-2xl bg-white p-5 shadow-xl sm:block">
              <p className="flex items-center gap-2 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Live bids on your job
              </p>
              <div className="mt-3 space-y-2">
                {[
                  { name: 'Marcus · HVAC', price: '$349' },
                  { name: 'Brighton PL', price: '$395' },
                  { name: 'Ace Handyman', price: '$275' },
                ].map((b) => (
                  <div key={b.name} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{b.name}</span>
                    <span className="font-bold text-brand">{b.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 rounded-lg bg-brand-soft px-3 py-2 text-xs font-medium text-brand">
                You pay $0 — your money sits in escrow until done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="badge bg-brand-soft text-brand">How it works</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From broke to fixed in under an hour
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card relative p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand font-extrabold">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-ink-muted">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BETTER THAN THEY KNOW */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge bg-brand-soft text-brand">Made for homes, not lead-gen</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why {HOME_BRAND} beats the old lead platforms
            </h2>
            <p className="mt-3 text-ink-muted">
              Angi, Thumbtack, HomeAdvisor — they make money selling homeowners to pros.
              We make money only when a job is actually done right.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {compares.map((c) => (
              <div key={c.us} className="card grid gap-4 p-6 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-brand">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-soft text-[11px]">✓</span>
                    {HOME_BRAND}
                  </p>
                  <p className="mt-2 text-sm text-ink">{c.us}</p>
                </div>
                <div className="border-t border-slate-100 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <p className="text-sm font-bold text-ink-muted line-through">Them</p>
                  <p className="mt-2 text-sm text-ink-muted">{c.them}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="badge bg-brand-soft text-brand">Real uses</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built for the jobs you actually have
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.t} className="card p-6">
                <p className="text-3xl">{u.e}</p>
                <h3 className="mt-3 font-bold">{u.t}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{u.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <span className="badge bg-brand text-white">Get the app</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              FixIt for homeowners — your whole home, one app
            </h2>
            <p className="mt-3 max-w-lg text-slate-400">
              Post jobs, watch bids land live, chat with pros, confirm work, rate and tip —
              all from your phone. Android APK below; iOS coming to the App Store.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/mhklogs/fixit-home-android/releases/latest/download/FixItHome.apk"
              className="btn bg-white px-6 py-4 text-base text-slate-950 hover:bg-brand-soft"
            >
              Download FixIt for Android
            </a>
            <span className="text-xs text-slate-500">Direct APK · ~95 MB · Android 8.0+</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="badge bg-brand-soft text-brand">FAQ</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Questions, answered
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="card group p-5 open:ring-1 open:ring-brand/30">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-brand transition-transform group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 text-sm text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">
            A contractor? See the <Link href="/for-pros" className="font-semibold text-pro hover:underline">{PRO_BRAND} side</Link> — keep 97% of every job.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}