import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | nailzbynicci Münster',
  description: 'Datenschutzerklärung (DSGVO) für nailzbynicci, Münster. Cookie-freie Website.',
  alternates: {
    canonical: '/datenschutz',
    languages: {
      'de-DE': '/datenschutz',
      'en-US': '/en/privacy',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
