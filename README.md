# FixIt Home — website

Landing page and web app for **FixIt Home**, a live-bidding marketplace that connects
homeowners with verified local tradespeople. Homeowners post a repair job for free,
contractors bid on it in real time with a price and an arrival time, and the payment is
held in escrow until the work is confirmed.

Deployed at **https://fixit-web-rom.vercel.app**.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS 3.4 — white + orange design system, defined in `tailwind.config.ts`
- Supabase (auth + Postgres + RLS)
- Stripe (escrow, Connect payouts, webhooks)
- Gemini via `/api/ai/assist` for job triage

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Stripe keys
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint via `next lint` |

## Structure

```
src/
  app/
    page.tsx            Landing page (the marketing site)
    for-homeowners/     Long-form page for homeowners
    for-pros/           Long-form page for contractors
    signup, login, onboarding
    dashboard/          Role-scoped homeowner + contractor dashboards
    admin/              Internal admin portal
    api/                Supabase, Stripe and AI route handlers
  components/           Nav, footer, logo, radar mockup, AI assistant
  lib/                  Supabase clients, image manifest
  shared/               Constants and types shared with the mobile apps
public/
  images/trades/        Self-hosted trade photography
  downloads/            Local APK build output (gitignored, not deployed)
```

APKs are deliberately not committed here — each is ~98 MB, which makes the repo
unusable to clone and push. The download buttons in `/for-homeowners` and
`/for-pros` point at the GitHub Release assets of the two app repositories
instead:

- `mhklogs/fixit-home-android` → `FixItHome.apk`
- `mhklogs/profixit-android` → `ProFixit.apk`

Those assets are produced by each repo's `Build APK` workflow. Note the download
buttons are only live once a release asset has actually been published — a
`releases/latest/download/...` URL with no asset attached returns 404.

`src/shared/` is a vendored copy of the monorepo's `packages/shared`, so this repo
builds and deploys entirely on its own without a workspace.

## SEO

- Metadata, canonical URL and Open Graph tags in `src/app/layout.tsx`
- `src/app/sitemap.ts` and `src/app/robots.ts` — `/admin`, `/dashboard`, `/messages`,
  `/notifications` and `/api/` are disallowed
- `src/app/opengraph-image.tsx` renders the social share card
- JSON-LD (`WebSite`, `Organization`, `WebApplication`, `FAQPage`) is emitted by the
  landing page and mirrors the visible FAQ

Set `NEXT_PUBLIC_SITE_URL` to the canonical origin. Left unset it falls back to
`https://fixit-web-rom.vercel.app`.

## Deploying

This repo is the Vercel project `fixit-web-rom`, serving production at
https://fixit-web-rom.vercel.app.

**Auto-deploy is not enabled yet.** The Vercel GitHub App is not installed on the
`mhklogs` account, so Vercel cannot see this repository. To turn on
push-to-deploy, install the app and connect the repo:

1. Install the Vercel GitHub App: <https://github.com/apps/vercel>
   (grant it access to `fixit-landing`).
2. In the Vercel project settings, connect the Git repository
   `mhklogs/fixit-landing` with `main` as the production branch.

Until then, deploy from a clone with the project already linked (`.vercel/`
is gitignored, so link it once):

```sh
vercel link --project fixit-web-rom
vercel --prod
```

`vercel.json` pins the `nextjs` framework preset so builds are deterministic.

## Related repositories

- [`fixit-home-android`](https://github.com/mhklogs/fixit-home-android) — homeowner Android app
- [`profixit-android`](https://github.com/mhklogs/profixit-android) — contractor Android app