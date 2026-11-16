import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ · Häufige Fragen zu Gel-X, Preisen & Buchung Münster',
  description:
    'Alle Antworten zu Aprés Gel-X, 4-6 Wochen Haltbarkeit, 20€ Anzahlung, Instagram DM Buchung und Studio-Regeln im privaten Atelier von Nicole in Münster.',
  alternates: {
    canonical: '/faq',
    languages: {
      'de-DE': '/faq',
      'en-US': '/en/faq',
    },
  },
  openGraph: {
    title: 'Häufige Fragen (FAQ) | nailzbynicci Münster',
    description:
      'Fragen zu Gel-X, Haltbarkeit, Preisen, Stornierungen und Studio-Regeln von Nicole in Münster.',
    url: '/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
