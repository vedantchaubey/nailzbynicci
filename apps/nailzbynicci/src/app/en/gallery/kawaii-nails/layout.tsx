import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kawaii Nails Münster · 3D Charms & Coquette Nail Art',
  description:
    'Soft kawaii nail art in Münster: Hand-sculpted 3D bows, bear charms, pastel jelly aura blushes, and sweet coquette details on 100% Aprés Gel-X.',
  alternates: {
    canonical: '/en/gallery/kawaii-nails',
    languages: {
      'de-DE': '/galerie/kawaii-naegel',
      'en-US': '/en/gallery/kawaii-nails',
    },
  },
}

export default function EnglishKawaiiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
