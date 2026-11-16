import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nägel Münster Termin buchen | Studio-Regeln & Ablauf',
  description:
    'So buchst du deinen Gel-X Nageltermin bei Nicole in Münster. Instagram DM Buchungsvorlage zum Kopieren, Hygiene- und Studioregeln, 20€ Anzahlung & FAQ.',
  alternates: {
    canonical: '/termin-buchen',
    languages: {
      'de-DE': '/termin-buchen',
      'en-US': '/en/book-appointment',
    },
  },
  openGraph: {
    title: 'Nägel Münster Termin buchen | nailzbynicci',
    description:
      'Terminablauf, Instagram DM Vorlage, 20€ PayPal Anzahlung und Studio-Regeln für dein Set bei Nicole in Münster.',
    url: '/termin-buchen',
  },
}

export default function TerminBuchenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
