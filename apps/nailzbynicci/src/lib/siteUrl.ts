/**
 * Site URL helper respecting strict domain rules:
 * - One source of truth: NEXT_PUBLIC_SITE_URL
 * - In production: falls back to VERCEL_PROJECT_PRODUCTION_URL (https://)
 *   or the free Vercel project deployment URL (https://nailzbynicci.vercel.app)
 * - In development: falls back to http://localhost:3000
 * - When a custom domain is connected, updating NEXT_PUBLIC_SITE_URL is the only edit needed.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`;
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://nailzbynicci.vercel.app';
  }
  return 'http://localhost:3000';
}

export const SITE_URL = getSiteUrl();
