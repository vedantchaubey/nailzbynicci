import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Münster Nail Studio Prices & 4 Art Tiers',
  description:
    'Transparent pricing for 100% Aprés Gel-X full extensions and 4 distinct nail art tiers (€50 to €115) in Münster, Germany. Interactive price calculator.',
  alternates: {
    canonical: '/en/prices',
    languages: {
      'de-DE': '/preise',
      'en-US': '/en/prices',
    },
  },
}

export default function EnglishPricesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
