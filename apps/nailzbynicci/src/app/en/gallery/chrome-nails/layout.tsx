import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chrome Nails Münster · Dark Chrome & Cyber Sigilism Art',
  description:
    'Specializing in chrome nails in Münster, Germany: Molten liquid metal, cyber sigilism, gothic spikes, and mirror silver finishes on 100% Aprés Gel-X.',
  alternates: {
    canonical: '/en/gallery/chrome-nails',
    languages: {
      'de-DE': '/galerie/chrome-naegel',
      'en-US': '/en/gallery/chrome-nails',
    },
  },
}

export default function EnglishChromeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
