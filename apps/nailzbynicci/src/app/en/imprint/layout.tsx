import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Notice (Imprint) · nailzbynicci Münster',
  description: 'Legal disclosure and imprint according to § 5 TMG for nailzbynicci, Münster, Germany.',
  alternates: {
    canonical: '/en/imprint',
    languages: {
      'de-DE': '/impressum',
      'en-US': '/en/imprint',
    },
  },
}

export default function EnglishImprintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
