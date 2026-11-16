import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nageldesign Ratgeber & Guides Münster · nailzbynicci',
  description:
    'Expertenwissen zu Aprés Gel-X Haltbarkeit, Nageldesign Kosten in Münster, Termin-Vorbereitung, Stiletto vs. Almond und Custom Press-Ons von Nicole.',
  alternates: {
    canonical: '/ratgeber',
    languages: {
      'de-DE': '/ratgeber',
      'en-US': '/en/guides',
    },
  },
  openGraph: {
    title: 'Nageldesign Ratgeber & Guides | nailzbynicci Münster',
    description:
      'Experten-Leitfäden zu Gel-X, Preisen, Formen, Pflege & Press-Ons von Nicole in Münster.',
    url: '/ratgeber',
  },
}

export default function RatgeberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
