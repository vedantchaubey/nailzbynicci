import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy (GDPR) · nailzbynicci Münster',
  description: 'Privacy policy and data protection declaration (GDPR) for nailzbynicci, Münster. Cookie-free website.',
  alternates: {
    canonical: '/en/privacy',
    languages: {
      'de-DE': '/datenschutz',
      'en-US': '/en/privacy',
    },
  },
}

export default function EnglishPrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
