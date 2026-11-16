import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | nailzbynicci Münster',
  description: 'Rechtliche Angaben und Impressum gemäß § 5 TMG für nailzbynicci, Münster.',
  alternates: {
    canonical: '/impressum',
    languages: {
      'de-DE': '/impressum',
      'en-US': '/en/imprint',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
