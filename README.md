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
  downloads/            Built APKs
```

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

Connected to the Vercel project `fixit-web-rom`, so a push to `main` deploys to
production automatically at https://fixit-web-rom.vercel.app.

## Related repositories

- [`fixit-home-android`](https://github.com/mhklogs/fixit-home-android) — homeowner Android app
- [`profixit-android`](https://github.com/mhklogs/profixit-android) — contractor Android app