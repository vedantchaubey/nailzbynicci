import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nailart Galerie & Portfolio Münster',
  description:
    'Entdecke 30+ alternative Nageldesigns von Nicole in Münster: Dark Chrome, Cyber Sigilism, Soft Kawaii 3D Charms & High Glam Liquid Armor.',
  alternates: {
    canonical: '/galerie',
    languages: {
      'de-DE': '/galerie',
      'en-US': '/en/gallery',
    },
  },
  openGraph: {
    title: 'Nailart Galerie & Portfolio Münster | nailzbynicci',
    description:
      '30+ alternative Nageldesigns: Dark Chrome, Cyber Sigilism, Soft Kawaii & Liquid Armor von Nicole in Münster.',
    url: '/galerie',
  },
}

export default function GalerieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
