import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nail Aftercare Guide · 5+ Weeks Retention Münster',
  description:
    '5 golden rules for extending the longevity of your Aprés Gel-X set. 24h heat and water protection, daily jojoba oil hydration, and the jewels-not-tools rule.',
  alternates: {
    canonical: '/en/aftercare',
    languages: {
      'de-DE': '/pflege-tipps',
      'en-US': '/en/aftercare',
    },
  },
}

export default function EnglishAftercareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
