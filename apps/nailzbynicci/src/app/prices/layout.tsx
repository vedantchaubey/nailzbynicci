import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preise & Nail Art Tiers',
  description:
    'Transparente Preise für 100% Aprés Gel-X Neumodellagen und Nail Art Tiers (Tier I Simple bis Tier IV Insane Liquid Armor) in Münster. Inklusive interaktivem Preisrechner.',
  alternates: {
    canonical: '/prices',
  },
  openGraph: {
    title: 'Preise & Nail Art Tiers | nailzbynicci Münster',
    description:
      'Transparente Preise für Aprés Gel-X Modellagen und Nail Art Tiers (50€ bis 115€) mit interaktivem Preisrechner.',
    url: '/prices',
  },
}

export default function PricesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
