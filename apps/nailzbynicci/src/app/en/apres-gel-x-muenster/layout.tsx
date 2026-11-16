import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aprés Gel-X Münster Germany · 100% Soft Gel Extensions',
  description:
    'Aprés Gel-X soft gel extensions in Münster by Nicole. Gentle soak-off extensions with zero acrylic fumes, 4 to 6 weeks retention, and healthy natural nails.',
  alternates: {
    canonical: '/en/apres-gel-x-muenster',
    languages: {
      'de-DE': '/apres-gel-x-muenster',
      'en-US': '/en/apres-gel-x-muenster',
    },
  },
}

export default function EnglishApresGelXLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
