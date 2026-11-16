import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Rechtliche Angaben und Impressum gemäß § 5 TMG für nailzbynicci, Münster.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
