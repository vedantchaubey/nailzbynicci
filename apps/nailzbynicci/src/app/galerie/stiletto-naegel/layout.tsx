import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stiletto Nägel Münster · Gothic Claws & Extreme Lengths',
  description:
    'Spezialisiert auf Stiletto Nägel & extreme Längen in Münster: Gothic Claws, High Glam Kristalle, anatomisch perfekter Apex auf 100% Aprés Gel-X.',
  alternates: {
    canonical: '/galerie/stiletto-naegel',
    languages: {
      'de-DE': '/galerie/stiletto-naegel',
      'en-US': '/en/gallery/stiletto-nails',
    },
  },
  openGraph: {
    title: 'Stiletto Nägel Münster | nailzbynicci',
    description:
      'Gothic Claws, High Glam & Extreme Length Nail Architecture von Nicole in Münster.',
    url: '/galerie/stiletto-naegel',
  },
}

export default function StilettoNaegelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
