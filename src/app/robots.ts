import type { MetadataRoute } from 'next';

// `||` rather than `??`: an empty-string env var must fall back too, otherwise
// `new URL('')` throws and takes the whole build down.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fixit-web-rom.vercel.app'
).replace(/\/+$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Authenticated / transactional areas have nothing to index, and
        // /admin must never appear in results.
        disallow: ['/admin', '/dashboard', '/messages', '/notifications', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}