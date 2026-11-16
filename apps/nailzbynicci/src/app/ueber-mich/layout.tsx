import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über Nicole (@nailzbynicci) | Alternative Nail Artist Münster',
  description:
    'Lerne Nicole kennen — Deine alternative Nail Artistin in Münster. Warum 100% Aprés Gel-X, kein Acryl, Tattoo-Wurzeln und private 1-on-1 Atelier-Atmosphäre.',
  alternates: {
    canonical: '/ueber-mich',
    languages: {
      'de-DE': '/ueber-mich',
      'en-US': '/en/about-me',
    },
  },
  openGraph: {
    title: 'Über Nicole | Alternative Nail Artist Münster',
    description:
      'Alternative Nail Architecture in Münster: 100% Aprés Gel-X, keine Acryldämpfe, individuelle Ästhetik im privaten Atelier.',
    url: '/ueber-mich',
  },
}

export default function UeberMichLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
