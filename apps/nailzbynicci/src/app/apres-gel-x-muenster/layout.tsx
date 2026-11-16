import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aprés Gel-X Münster · 100% Soft Gel Nägel ohne Acryl',
  description:
    'Aprés Gel-X Nägel in Münster bei Nicole. 100% schonende Soft-Gel Verlängerungen, 4-6 Wochen Haltbarkeit, null Acryldämpfe und sanftes Ablösen mit Aceton.',
  alternates: {
    canonical: '/apres-gel-x-muenster',
    languages: {
      'de-DE': '/apres-gel-x-muenster',
      'en-US': '/en/apres-gel-x-muenster',
    },
  },
  openGraph: {
    title: 'Aprés Gel-X Münster | nailzbynicci',
    description:
      'Die gesunde Alternative zu Acryl in Münster: 100% originales Aprés Gel-X mit 4-6 Wochen Haltbarkeit bei Nicole.',
    url: '/apres-gel-x-muenster',
  },
}

export default function ApresGelXLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
