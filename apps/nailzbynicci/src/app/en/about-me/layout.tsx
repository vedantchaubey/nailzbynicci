import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Nicole (@nailzbynicci) · Alternative Nail Artist Münster',
  description:
    'Meet Nicole — Your alternative nail artist in Münster, Germany. Self-taught roots, tattoo-inspired dark aesthetics, and why I sculpt exclusively on 100% Aprés Gel-X.',
  alternates: {
    canonical: '/en/about-me',
    languages: {
      'de-DE': '/ueber-mich',
      'en-US': '/en/about-me',
    },
  },
}

export default function EnglishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
