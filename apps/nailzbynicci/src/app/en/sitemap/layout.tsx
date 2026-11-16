import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HTML Sitemap & Index · nailzbynicci Münster',
  description:
    'Complete crawlable index of all pages, services, portfolios, and guides published by nailzbynicci.',
  alternates: {
    canonical: '/en/sitemap',
    languages: {
      'de-DE': '/sitemap',
      'en-US': '/en/sitemap',
    },
  },
}

export default function EnglishSitemapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
