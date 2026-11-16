import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Press-On Nails Germany · Handcrafted 100% Gel-X',
  description:
    'Reusable luxury press-on nails made from 100% Aprés Gel-X by Nicole. Sized to your exact nail beds with full prep kit. Tracked delivery across Germany.',
  alternates: {
    canonical: '/en/press-ons',
    languages: {
      'de-DE': '/press-ons',
      'en-US': '/en/press-ons',
    },
  },
}

export default function EnglishPressOnsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
