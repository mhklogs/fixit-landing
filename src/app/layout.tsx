import type { Metadata } from 'next';
import './globals.css';
import { HOME_BRAND, PLATFORM_NAME, PRO_BRAND } from '@/shared';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fixit-web-rom.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${HOME_BRAND} — Post a Job, Watch Local Pros Bid Live`,
    template: `%s | ${HOME_BRAND}`,
  },
  description:
    'Post a home repair job free and watch verified local plumbers, electricians, HVAC techs and handymen bid on it live. Compare price, speed and rating, then pay only after the work is done. Escrow protected.',
  applicationName: HOME_BRAND,
  keywords: [
    'post a job for free',
    'home repair bids',
    'live bidding home services',
    'find a plumber near me',
    'find an electrician near me',
    'HVAC repair quotes',
    'handyman quotes online',
    'home renovation contractor bids',
    'escrow home repair payment',
    'contractor lead marketplace',
    PRO_BRAND,
    HOME_BRAND,
    PLATFORM_NAME,
  ],
  authors: [{ name: PLATFORM_NAME }],
  creator: PLATFORM_NAME,
  publisher: PLATFORM_NAME,
  category: 'business',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: HOME_BRAND,
    title: `${HOME_BRAND} — Post a Job, Watch Local Pros Bid Live`,
    description:
      'Verified local contractors compete for your repair job in real time. Free for homeowners, escrow protected, pay only when the work is done.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${HOME_BRAND} — live bidding for local home services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${HOME_BRAND} — Post a Job, Watch Local Pros Bid Live`,
    description:
      'Verified local contractors compete for your repair job in real time. Free for homeowners, escrow protected.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}