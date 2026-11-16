import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'nailzbynicci — Alternative Nail Artist | Münster, Germany',
    template: '%s | nailzbynicci — Münster',
  },
  description:
    'Nicole (@nailzbynicci) — Alternative Nail Artist in Münster, Germany. 100% Aprés Gel-X, Gothic Cyber-Chrome, Liquid Metal 3D Art & handcrafted luxury press-ons.',
  alternates: {
    canonical: '/en',
    languages: {
      'de-DE': '/',
      'en-US': '/en',
    },
  },
}

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
