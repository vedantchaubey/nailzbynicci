import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über Nicole — Deine Alternative Nail Artistin',
  description:
    'Lerne Nicole (@nailzbynicci) kennen — Deine alternative Nail Artistin in Münster. Warum 100% Aprés Gel-X, private Atelier-Atmosphäre und kompromisslose Detailtreue.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Über Nicole | nailzbynicci Münster',
    description:
      'Alternative Nail Architecture in Münster: 100% Aprés Gel-X, keine Acryldämpfe, individuelle Ästhetik im privaten Atelier.',
    url: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
