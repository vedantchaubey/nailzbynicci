import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Handgefertigte Luxury Press-On Sets',
  description:
    'Wiederverwendbare handgemachte Press-On Nägel aus 100% Aprés Gel-X. Maßgefertigt auf deine Wunschlänge und Nagelgröße. Inklusive Video-Showcase und vollständigem Prep-Kit.',
  alternates: {
    canonical: '/press-ons',
  },
  openGraph: {
    title: 'Handgefertigte Luxury Press-Ons | nailzbynicci',
    description:
      'Bespoke wiederverwendbare Press-On Sets aus 100% Aprés Gel-X. Video-Showcase, Sizing Guide und weltweiter Versand.',
    url: '/press-ons',
  },
}

export default function PressOnsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
