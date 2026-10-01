import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
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
    <>
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden bg-pro-soft/60">
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-pro/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="badge bg-white text-pro border border-pro/10 shadow-sm">
              The worker side of {HOME_BRAND}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Own your lead flow. <span className="text-pro">Keep 97%</span> of every job.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted">
              Stop paying $20–80 for leads that never pick up. {PRO_BRAND} is a flat
              $0.30 per bid from your own wallet — you pick the jobs, you set the
              price, and 96–97% hits your bank the moment the homeowner signs off.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/onboarding" className="btn-secondary text-base bg-pro text-white hover:bg-pro-dark">
                Start earning with {PRO_BRAND}
              </a>
              <a href="https://github.com/mhklogs/profixit-android/releases/latest/download/ProFixit.apk" className="btn-primary text-base bg-pro text-white hover:bg-pro-dark">
                Download the ProFixit app
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { value: '$0.30', label: 'per bid, flat' },
                { value: '97%', label: 'of each job' },
                { value: 'Instant', label: 'payout on sign-off' },
                { value: '0', label: 'subscriptions' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold">{s.value}</p>
                  <p className="text-sm text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-pro/25">
              <Image
                src={IMG.contractorOnSite}
                alt="A ProFixit contractor working a residential job"
                width={1200}
                height={900}
                className="h-[420px] w-full object-cover lg:h-[520px]"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-72 rounded-2xl bg-white p-5 shadow-xl sm:block">
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                Your wallet balance
              </p>
              <p className="mt-1 text-3xl font-extrabold text-pro">$124.70</p>
              <p className="text-xs text-ink-muted">+$0.30 debited per bid</p>
              <div className="mt-3 rounded-lg bg-pro-soft px-3 py-2 text-xs font-medium text-pro">
                Job #4821 paid out: $548.20 — instant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATUS BAR */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            { value: '$18.2K', label: 'Avg. annual pro earnings' },
            { value: '96–97%', label: 'payout per job' },
            { value: '0', label: 'lead fees ever' },
            { value: '11 min', label: 'median time to first bid' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-pro">{s.value}</p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="badge bg-pro-soft text-pro">How it works</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Earn like a pro — the {PRO_BRAND} way
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card relative p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-pro-soft text-pro font-extrabold">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-ink-muted">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BETTER */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge bg-pro-soft text-pro">No more lead-gen</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why working {PRO_BRAND} beats working for platforms
            </h2>
            <p className="mt-3 text-ink-muted">
              Legacy marketplaces profit from selling you homeowners. We profit only
              when a job is completed — so every mechanic is aligned with your wallet.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {compares.map((c) => (
              <div key={c.us} className="card grid gap-4 p-6 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-pro">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-pro-soft text-[11px]">✓</span>
                    {PRO_BRAND}
                  </p>
                  <p className="mt-2 text-sm text-ink">{c.us}</p>
                </div>
                <div className="border-t border-slate-100 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <p className="text-sm font-bold text-ink-muted line-through">Angi / Thumbtack</p>
                  <p className="mt-2 text-sm text-ink-muted">{c.them}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-lg overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between bg-slate-100 px-6 py-4">
              <p className="font-semibold">Old lead platforms</p>
              <p className="font-bold text-ink-muted line-through">$280 take-home</p>
            </div>
            <div className="flex items-center justify-between bg-pro px-6 py-4 text-white">
              <p className="font-bold">{PRO_BRAND}</p>
              <p className="font-extrabold">$383.70 take-home</p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="badge bg-pro-soft text-pro">Real ways to earn</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Built for how pros actually work
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
            <span className="badge bg-pro text-white">Get the app</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {PRO_BRAND} for contractors — your earnings engine
            </h2>
            <p className="mt-3 max-w-lg text-slate-400">
              One-tap bidding, a live job feed, your credit wallet, instant payouts
              and ratings — all on a clean, dark, pro-built app. Android APK below;
              iOS coming to the App Store.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/mhklogs/profixit-android/releases/latest/download/ProFixit.apk"
              className="btn bg-white px-6 py-4 text-base text-slate-950 hover:bg-pro-soft"
            >
              Download {PRO_BRAND} for Android
            </a>
            <span className="text-xs text-slate-500">Direct APK · ~95 MB · Android 8.0+</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <span className="badge bg-pro-soft text-pro">FAQ</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Questions, answered
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="card group p-5 open:ring-1 open:ring-pro/30">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-pro transition-transform group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 text-sm text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">
            A homeowner? See the <Link href="/for-homeowners" className="font-semibold text-brand hover:underline">{HOME_BRAND} side</Link> — post a job free and watch pros bid.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}