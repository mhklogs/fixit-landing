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
    t: 'Top up your wallet',
    b: 'Load credits once — a flat $0.30 is auto-deducted per bid to keep the feed spam-free. No subscriptions. No $20–80 per lead. No lock-in.',
  },
  {
    n: '2',
    t: 'Bid on live local jobs',
    b: 'A real-time feed filtered by your trade and radius. One-tap bid with your price + ETA. Higher ratings and faster ETAs float you to the top of every radar.',
  },
  {
    n: '3',
    t: 'Get paid the second they sign off',
    b: 'Homeowner confirms with a photo and 96–97% of the job lands in your wallet instantly. You keep the vast majority of every dollar you earn.',
  },
];

const compares = [
  {
    us: `Flat $0.30 per bid from a prepaid wallet`,
    them: `$20–80 per lead that may ghost you, plus $300–2,500/mo membership and ad spend on Angi/HomeAdvisor`,
  },
  {
    us: 'Keep 96–97% of every job, paid on the spot',
    them: 'Platforms take 10–28% plus lead costs; standard payouts take 3–4 days',
  },
  {
    us: 'One-tap bidding on jobs you choose',
    them: 'Buying shared leads aimed at 3–8 competitors AND you, bidding unseen',
  },
  {
    us: 'Your rating and ETA earned from real jobs',
    them: 'Listings that anyone with a credit card can buy visibility for',
  },
];

const useCases = [
  { e: '🚰', t: 'Day-rate plumbers', b: 'Bid on burst-pipe and water-heater jobs in your radius seconds after they post — fill slow days in real time.' },
  { e: '❄️', t: 'HVAC pros', b: 'Zero lead fees year-round. Bid price + ETA, win by speed and rating, get paid at the door.' },
  { e: '🔨', t: 'Handymen', b: 'One trip, one bid, one payout. Bundle small jobs on the same day via the live feed.' },
  { e: '⚡', t: 'Electricians', b: 'Compete on price and ETA instead of paying to be listed — your wallet fills faster.' },
];

const faq = [
  { q: 'How much does it cost me to start?', a: 'Nothing to sign up. Top up a prepaid credit wallet whenever you want — the only cost is a flat $0.30 deducted per bid. No membership, no ad spend requirement.' },
  { q: 'What do I keep from each job?', a: '96–97% of every job lands in your wallet the moment the homeowner confirms completion. Compare that to Angi-style lead fees stacked on top of platform commissions.' },
  { q: 'How fast are payouts?', a: 'Instant to your wallet on homeowner sign-off, with bank transfers through Stripe Connect. No weekly-payout waiting games.' },
  { q: 'Is the ProFixit app free?', a: 'Yes — download it, verify your license and insurance, and start bidding. You only pay the $0.30-per-bid fee when you actually bid.' },
];

export const metadata = {
  title: 'ProFixit for Contractors — Keep 97% of Every Job',
  description:
    'ProFixit is the contractor earning engine: no lead fees, a flat $0.30 per bid, live local jobs, and 96–97% payouts the moment the homeowner signs off.',
};

export default function ForProsPage() {
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
              <Eyebrow>The worker side of {HOME_BRAND}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
                Own your lead flow.{' '}
                <span className="text-gradient-ember">Keep 97%</span> of every job.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-xl text-lg text-zinc-400">
                Stop paying $20–80 for leads that never pick up. {PRO_BRAND} is a flat
                $0.30 per bid from your own wallet — you pick the jobs, you set the
                price, and 96–97% hits your bank the moment the homeowner signs off.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/onboarding" className="btn-ember text-base">
                  Start earning with {PRO_BRAND}
                </a>
                <a
                  href="https://github.com/mhklogs/profixit-android/releases/latest/download/ProFixit.apk"
                  className="btn-ember-ghost text-base"
                >
                  Download the ProFixit app
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {[
                  { value: '$0.30', label: 'per bid, flat' },
                  { value: '97%', label: 'of each job' },
                  { value: 'Instant', label: 'payout on sign-off' },
                  { value: '0', label: 'subscriptions' },
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
                src={IMG.contractorOnSite}
                alt="A ProFixit contractor working a residential job"
                width={1200}
                height={900}
                className="h-[420px] w-full object-cover lg:h-[520px]"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-72 rounded-2xl glass p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:block">
              <p className="text-xs font-semibold uppercase tracking-wide text-ember">
                Your wallet balance
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-gradient-ember">$124.70</p>
              <p className="text-xs text-zinc-400">+$0.30 debited per bid</p>
              <div className="mt-3 rounded-lg border border-ember/25 bg-ember/10 px-3 py-2 text-xs font-medium text-ember">
                Job #4821 paid out: $548.20 — instant
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATUS BAR */}
      <section className="border-y border-white/10 bg-night-900">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            { value: '$18.2K', label: 'Avg. annual pro earnings' },
            { value: '96–97%', label: 'payout per job' },
            { value: '0', label: 'lead fees ever' },
            { value: '11 min', label: 'median time to first bid' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-gradient-ember">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-night-950 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Earn like a pro — the {PRO_BRAND} way
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

      {/* WHY BETTER */}
      <section className="relative overflow-hidden bg-night-900 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_65%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow>No more lead-gen</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Why working {PRO_BRAND} beats working for platforms
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-3 text-zinc-400">
                Legacy marketplaces profit from selling you homeowners. We profit only
                when a job is completed — so every mechanic is aligned with your wallet.
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
                      {PRO_BRAND}
                    </p>
                    <p className="mt-2 text-sm text-zinc-200">{c.us}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <p className="text-sm font-bold text-zinc-500 line-through">Angi / Thumbtack</p>
                    <p className="mt-2 text-sm text-zinc-500">{c.them}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 max-w-lg overflow-hidden rounded-3xl border border-white/10">
              <div className="flex items-center justify-between bg-night-800 px-6 py-4">
                <p className="font-semibold">Old lead platforms</p>
                <p className="font-bold text-zinc-500 line-through">$280 take-home</p>
              </div>
              <div className="flex items-center justify-between bg-gradient-to-r from-ember-soft via-ember to-ember-deep px-6 py-4 text-ember-ink">
                <p className="font-bold">{PRO_BRAND}</p>
                <p className="font-extrabold">$383.70 take-home</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-night-950 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>Real ways to earn</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for how pros actually work
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
      <section className="relative overflow-hidden bg-night-900 py-24 text-white">
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
                {PRO_BRAND} for contractors — your earnings engine
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-3 max-w-lg text-zinc-400">
                One-tap bidding, a live job feed, your credit wallet, instant payouts
                and ratings — all on a clean, dark, pro-built app. Android APK below;
                iOS coming to the App Store.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://github.com/mhklogs/profixit-android/releases/latest/download/ProFixit.apk"
                className="btn-ember px-6 py-4 text-base"
              >
                Download {PRO_BRAND} for Android
              </a>
              <span className="text-xs text-zinc-500">Direct APK · ~95 MB · Android 8.0+</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-night-950 py-24">
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
            A homeowner? See the{' '}
            <Link href="/for-homeowners" className="font-semibold text-ember hover:text-ember-soft">
              {HOME_BRAND} side
            </Link>{' '}
            — post a job free and watch pros bid.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}