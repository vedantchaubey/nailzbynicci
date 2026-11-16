import { MetadataRoute } from 'next'
import { guideArticles } from '@/data/guides'
import { getSiteUrl } from '@/lib/siteUrl'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const currentDate = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    // German Core Pages
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/galerie`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/galerie/chrome-naegel`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/galerie/kawaii-naegel`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/galerie/stiletto-naegel`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/preise`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/termin-buchen`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/press-ons`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/press-ons/bestellen`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/apres-gel-x-muenster`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ueber-mich`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pflege-tipps`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ratgeber`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/sitemap`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/impressum`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },

    // English Mirror Pages
    { url: `${baseUrl}/en`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/en/gallery`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/gallery/chrome-nails`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/gallery/kawaii-nails`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/gallery/stiletto-nails`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/prices`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/book-appointment`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/press-ons`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/press-ons/order`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/apres-gel-x-muenster`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en/about-me`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/en/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/en/aftercare`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/en/guides`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/en/sitemap`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${baseUrl}/en/imprint`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/en/privacy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.2 },
  ]

  // Dynamic German & English Guides
  const guideRoutesDe: MetadataRoute.Sitemap = guideArticles.map((article) => ({
    url: `${baseUrl}/ratgeber/${article.slugDe}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const guideRoutesEn: MetadataRoute.Sitemap = guideArticles.map((article) => ({
    url: `${baseUrl}/en/guides/${article.slugEn}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...guideRoutesDe, ...guideRoutesEn]
}
