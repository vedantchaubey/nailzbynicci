import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sitemap & Seitenübersicht · nailzbynicci Münster',
  description:
    'Vollständige Übersicht aller Seiten, Leistungen, Galerien, Ratgeber und rechtlichen Angaben von nailzbynicci.',
  alternates: {
    canonical: '/sitemap',
    languages: {
      'de-DE': '/sitemap',
      'en-US': '/en/sitemap',
    },
  },
}

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
