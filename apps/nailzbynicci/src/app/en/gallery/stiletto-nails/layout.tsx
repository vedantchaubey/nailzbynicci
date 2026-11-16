import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stiletto Nails Münster · Gothic Claws & Extreme Lengths',
  description:
    'Gothic claws and dramatic stiletto architecture in Münster, Germany. Sculpted with a reinforced apex on 100% genuine Aprés Gel-X.',
  alternates: {
    canonical: '/en/gallery/stiletto-nails',
    languages: {
      'de-DE': '/galerie/stiletto-naegel',
      'en-US': '/en/gallery/stiletto-nails',
    },
  },
}

export default function EnglishStilettoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
