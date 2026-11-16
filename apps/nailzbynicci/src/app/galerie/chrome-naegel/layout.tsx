import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chrome Nägel Münster · Dark Chrome & Cyber Sigilism Art',
  description:
    'Spezialisiert auf Chrome Nägel in Münster: Flüssiges Silber, geschmolzenes Metall, Cyber Sigilism und Gothic Spikes auf 100% Aprés Gel-X.',
  alternates: {
    canonical: '/galerie/chrome-naegel',
    languages: {
      'de-DE': '/galerie/chrome-naegel',
      'en-US': '/en/gallery/chrome-nails',
    },
  },
  openGraph: {
    title: 'Chrome Nägel Münster | nailzbynicci',
    description:
      'Liquid Metal, Gothic Cyber Sigilism & Mirror Chrome Nail Art von Nicole in Münster.',
    url: '/galerie/chrome-naegel',
  },
}

export default function ChromeNaegelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
