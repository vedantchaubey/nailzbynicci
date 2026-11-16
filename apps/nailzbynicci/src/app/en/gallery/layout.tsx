import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bespoke Nail Art Gallery & Portfolio Münster',
  description:
    'Explore 30+ alternative nail sets by Nicole in Münster: Dark Chrome, Cyber Sigilism, Soft Kawaii 3D Charms, and High Glam Liquid Armor.',
  alternates: {
    canonical: '/en/gallery',
    languages: {
      'de-DE': '/galerie',
      'en-US': '/en/gallery',
    },
  },
}

export default function EnglishGalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
