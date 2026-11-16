import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Custom Press-On Nails · Sizing Guide & DM Template',
  description:
    'Step-by-step instructions for ordering bespoke 100% Aprés Gel-X press-ons: measuring widths in millimeters, Instagram DM template, and DHL shipping in Germany.',
  alternates: {
    canonical: '/en/press-ons/order',
    languages: {
      'de-DE': '/press-ons/bestellen',
      'en-US': '/en/press-ons/order',
    },
  },
}

export default function EnglishOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
