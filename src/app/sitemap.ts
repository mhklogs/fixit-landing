import type { MetadataRoute } from 'next';

// `||` rather than `??`: an empty-string env var must fall back too, otherwise
// `new URL('')` throws and takes the whole build down.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fixit-web-rom.vercel.app'
).replace(/\/+$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/for-homeowners`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/for-pros`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/signup`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}