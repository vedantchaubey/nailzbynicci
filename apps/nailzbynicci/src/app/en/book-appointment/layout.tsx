import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Nail Appointment Münster · Policies & DM Guide',
  description:
    'How to book your bespoke Gel-X session with Nicole in Münster: Copyable Instagram DM template, studio etiquette, €20 PayPal deposit, and FAQ.',
  alternates: {
    canonical: '/en/book-appointment',
    languages: {
      'de-DE': '/termin-buchen',
      'en-US': '/en/book-appointment',
    },
  },
}

export default function EnglishBookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
