import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Press-on Nägel bestellen | Anleitung & Größen messen',
  description:
    'So bestellst du deine handgefertigten Luxury Press-On Nägel aus 100% Aprés Gel-X bei Nicole. Nagelgrößen in Millimetern messen, Instagram DM Vorlage & DHL Versand.',
  alternates: {
    canonical: '/press-ons/bestellen',
    languages: {
      'de-DE': '/press-ons/bestellen',
      'en-US': '/en/press-ons/order',
    },
  },
  openGraph: {
    title: 'Custom Press-on Nägel bestellen | nailzbynicci',
    description:
      'Schritt-für-Schritt Anleitung: Nagelgrößen ausmessen, Instagram DM Vorlage & DHL Versand für handgemachte Gel-X Press-Ons.',
    url: '/press-ons/bestellen',
  },
}

export default function BestellenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
