import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kawaii Nägel Münster · 3D Charms & Coquette Nail Art',
  description:
    'Spezialisiert auf Soft Kawaii Nägel in Münster: Handmodellierte 3D Schleifen, Teddy-Charms, Jelly Aura Blushes und süße Details auf 100% Aprés Gel-X.',
  alternates: {
    canonical: '/galerie/kawaii-naegel',
    languages: {
      'de-DE': '/galerie/kawaii-naegel',
      'en-US': '/en/gallery/kawaii-nails',
    },
  },
  openGraph: {
    title: 'Kawaii Nägel Münster | nailzbynicci',
    description:
      'Soft Kawaii, 3D Charms, Jelly Aura & Coquette Aesthetic von Nicole in Münster.',
    url: '/galerie/kawaii-naegel',
  },
}

export default function KawaiiNaegelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
