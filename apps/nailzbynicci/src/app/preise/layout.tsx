import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nagelstudio Münster Preise & Nail Art Tiers',
  description:
    'Transparente Preise für 100% Aprés Gel-X Modellagen und 4 Nail Art Tiers (50€ bis 115€) in Münster. Inklusive interaktivem Preisrechner ohne versteckte Kosten.',
  alternates: {
    canonical: '/preise',
    languages: {
      'de-DE': '/preise',
      'en-US': '/en/prices',
    },
  },
  openGraph: {
    title: 'Nagelstudio Münster Preise & 4 Tiers | nailzbynicci',
    description:
      'Transparente Preise für Aprés Gel-X Modellagen und Nail Art Tiers (50€ bis 115€) in Münster mit Preisrechner.',
    url: '/preise',
  },
}

export default function PreiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
