import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import DarkBg from '@/components/dark-bg';
import { Reveal, Eyebrow } from '@/components/motion';
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
    <div className="theme-dark min-h-screen bg-night-950 text-white">
      <DarkBg />
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden bg-night-950">
        <div aria-hidden className="dot-grid-ember grid-fade pointer-events-none absolute inset-0 opacity-50" />
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-ember-mid/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
          <div>
            <Reveal>
              <Eyebrow>The homeowner side of {HOME_BRAND}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
                Get your home fixed by{' '}
                <span className="text-gradient-ember">real locals</span> who compete for your job.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-xl text-lg text-zinc-400">
                No call centers. No $25 “lead fees” for a random company to call you back.
                You post one photo, watch verified pros bid live with price and ETA,
                and pay only when the work is done — held safe in escrow until you sign off.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/signup" className="btn-ember text-base">Post a job — it’s free</a>
                <a
                  href="https://github.com/mhklogs/fixit-home-android/releases/latest/download/FixItHome.apk"
                  className="btn-ember-ghost text-base"
                >
                  Download the FixIt app
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {[
                  { value: '20', label: 'trades covered' },
                  { value: '$0', label: 'for homeowners' },
                  { value: 'Escrow', label: 'money safe till done' },
                  { value: '4.9★', label: 'from real jobs' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-extrabold text-gradient-ember">{s.value}</p>
                    <p className="text-sm text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-ember-soft">
              <Image
                src={IMG.hero}
                alt="A homeowner watching pros bid live for their home repair"
                width={1200}
                height={900}
                className="h-[420px] w-full object-cover lg:h-[520px]"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-72 rounded-2xl glass p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:block">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ember">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
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
                    <span className="font-medium text-zinc-200">{b.name}</span>
                    <span className="font-bold text-ember">{b.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 rounded-lg border border-ember/25 bg-ember/10 px-3 py-2 text-xs font-medium text-ember">
                You pay $0 — your money sits in escrow until done.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-night-900 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              From broke to fixed in under an hour
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="h-full">
                <div className="glass h-full p-7 transition-colors duration-500 hover:border-ember/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-ember-soft via-ember to-ember-deep font-extrabold text-ember-ink">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BETTER THAN THEY KNOW */}
      <section className="relative overflow-hidden bg-night-950 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_65%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow>Made for homes, not lead-gen</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Why {HOME_BRAND} beats the old lead platforms
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-3 text-zinc-400">
                Angi, Thumbtack, HomeAdvisor — they make money selling homeowners to pros.
                We make money only when a job is actually done right.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {compares.map((c, i) => (
              <Reveal key={c.us} delay={i * 0.06}>
                <div className="glass grid gap-4 p-6 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-ember">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-ember/15">✓</span>
                      {HOME_BRAND}
                    </p>
                    <p className="mt-2 text-sm text-zinc-200">{c.us}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <p className="text-sm font-bold text-zinc-500 line-through">Them</p>
                    <p className="mt-2 text-sm text-zinc-500">{c.them}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-night-900 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Real uses</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the jobs you actually have
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u, i) => (
              <Reveal key={u.t} delay={(i % 4) * 0.06} className="h-full">
                <div className="glass h-full p-6 transition-colors duration-500 hover:border-ember/40">
                  <p className="text-3xl">{u.e}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold">{u.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{u.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section className="relative overflow-hidden bg-night-950 py-24 text-white">
        <div aria-hidden className="dot-grid-ember grid-fade pointer-events-none absolute inset-0 opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_60%)] blur-2xl"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <Reveal>
              <Eyebrow>Get the app</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                FixIt for homeowners — your whole home, one app
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-3 max-w-lg text-zinc-400">
                Post jobs, watch bids land live, chat with pros, confirm work, rate and tip —
                all from your phone. Android APK below; iOS coming to the App Store.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://github.com/mhklogs/fixit-home-android/releases/latest/download/FixItHome.apk"
                className="btn-ember px-6 py-4 text-base"
              >
                Download FixIt for Android
              </a>
              <span className="text-xs text-zinc-500">Direct APK · ~95 MB · Android 8.0+</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-night-900 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Questions, answered
              </h2>
            </Reveal>
          </div>
          <div className="mt-10 space-y-3">
            {faq.map((f) => (
              <Reveal key={f.q}>
                <details className="group glass px-6 py-5 open:border-ember/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex-none text-ember transition-transform group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-zinc-500">
            A contractor? See the{' '}
            <Link href="/for-pros" className="font-semibold text-ember hover:text-ember-soft">
              {PRO_BRAND} side
            </Link>{' '}
            — keep 97% of every job.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}