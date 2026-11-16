import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nail Design Guides & Architecture Knowledge Münster',
  description:
    'In-depth guides on Aprés Gel-X retention, Münster salon pricing, nail shapes, chrome sealing, and custom press-ons by Nicole (@nailzbynicci).',
  alternates: {
    canonical: '/en/guides',
    languages: {
      'de-DE': '/ratgeber',
      'en-US': '/en/guides',
    },
  },
}

export default function EnglishGuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
