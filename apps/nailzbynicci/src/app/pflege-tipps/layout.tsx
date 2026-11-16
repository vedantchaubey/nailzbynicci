import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nagelpflege nach dem Termin · 5+ Wochen Haltbarkeit Münster',
  description:
    'Die 5 goldenen Regeln für die Pflege deiner Gel-X Nägel nach dem Termin. 24h Heißwasser-Schutz, tägliches Nagelöl & das No-Tool-Prinzip von Nicole in Münster.',
  alternates: {
    canonical: '/pflege-tipps',
    languages: {
      'de-DE': '/pflege-tipps',
      'en-US': '/en/aftercare',
    },
  },
  openGraph: {
    title: 'Nagelpflege nach dem Termin | nailzbynicci Münster',
    description:
      '5 goldene Regeln für maximalen Halt und gesunde Nägel von Nicole in Münster.',
    url: '/pflege-tipps',
  },
}

export default function PflegeTippsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
