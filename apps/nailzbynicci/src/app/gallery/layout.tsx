import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galerie & Nail Art Portfolio',
  description:
    'Entdecke 30+ kuratierte Nail Art Sets von Nicole in Münster: Dark Cyber-Chrome, Gothic Sigilism, Soft Kawaii 3D Charms und High Glam Liquid Armor.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Galerie & Nail Art Portfolio | nailzbynicci Münster',
    description:
      '30+ kuratierte Sets: Dark Chrome, Cyber Sigilism, Soft Kawaii & Liquid Armor Nail Architecture von Nicole.',
    url: '/gallery',
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
