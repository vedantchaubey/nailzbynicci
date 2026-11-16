import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termin buchen & Studio Rules',
  description:
    'So buchst du deinen Gel-X Nageltermin bei Nicole in Münster. Instagram DM Buchungsvorlage zum Kopieren, Hygiene- und Studioregeln, Anzahlung & FAQ.',
  alternates: {
    canonical: '/how-to-book',
  },
  openGraph: {
    title: 'Termin buchen & Studio Rules | nailzbynicci Münster',
    description:
      'Terminablauf, Instagram DM Vorlage, Anzahlung und Studio-Regeln für dein Nagel-Set bei Nicole in Münster.',
    url: '/how-to-book',
  },
}

export default function HowToBookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
