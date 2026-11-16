import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ · Gel-X, Pricing & Booking Questions Münster',
  description:
    'Answers regarding Aprés Gel-X, 4-6 weeks retention, €20 PayPal deposit, Instagram DM booking, and studio etiquette with Nicole in Münster.',
  alternates: {
    canonical: '/en/faq',
    languages: {
      'de-DE': '/faq',
      'en-US': '/en/faq',
    },
  },
}

export default function EnglishFAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
