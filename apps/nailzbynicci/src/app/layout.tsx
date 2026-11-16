import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Alex_Brush } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
})

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

import { brand } from '@/data/brand'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { FloatingBookButton } from '@/components/ui/FloatingBookButton'
import { SmoothScrollProvider } from '@/lib/lenis'
import { LanguageProvider } from '@/lib/languageContext'
import { getSiteUrl } from '@/lib/siteUrl'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'nailzbynicci — Deine Alternative Nail Artistin | Münster',
    template: '%s | nailzbynicci — Münster',
  },
  description:
    'Nicole (@nailzbynicci) — Deine Alternative Nail Artistin in Münster. 100% Aprés Gel-X, Gothic Cyber-Chrome, Liquid Metal 3D Art & handgefertigte Luxury Press-On Sets. Buche direkt per Instagram DM.',
  keywords: [
    'nailzbynicci',
    'Nail Artist Münster',
    'Nagelstudio Münster',
    'Alternative Nail Artist',
    'Aprés Gel-X Münster',
    'Gel-X Nägel Münster',
    'Gothic Nails Münster',
    'Cyber Sigilism Nails',
    'Chrome Nails Münster',
    '3D Nail Art',
    'Press On Nails Deutschland',
    'Custom Press-Ons handgemacht',
    'Nicole Münster Nails',
    'Nail Art NRW',
  ],
  authors: [{ name: 'Nicole | @nailzbynicci', url: 'https://www.instagram.com/nailzbynicci' }],
  creator: 'Nicole (@nailzbynicci)',
  publisher: 'nailzbynicci',
  formatDetection: {
    email: false,
    address: true,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'de': siteUrl,
      'en': `${siteUrl}/en`,
      'de-DE': siteUrl,
      'en-US': `${siteUrl}/en`,
      'x-default': siteUrl,
    },
  },
  openGraph: {
    title: 'nailzbynicci — Deine Alternative Nail Artistin | Münster',
    description:
      'Privates Nagelatelier & Alternative Nail Architecture von Nicole in Münster. 100% Aprés Gel-X, Cyber-Chrome, Liquid Metal Art & bespoke Press-Ons.',
    url: siteUrl,
    siteName: 'nailzbynicci',
    locale: 'de_DE',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: '/images/gallery/nicci-001.webp',
        width: 1440,
        height: 1728,
        alt: 'nailzbynicci - Alternative Nail Architecture Münster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nailzbynicci — Alternative Nail Artist | Münster',
    description:
      'Bespoke 100% Aprés Gel-X nail architecture & custom press-on sets by Nicole in Münster, Germany.',
    images: ['/images/gallery/nicci-001.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['NailSalon', 'BeautySalon', 'LocalBusiness'],
      '@id': `${siteUrl}/#salon`,
      name: 'nailzbynicci',
      alternateName: ['Nailz by Nicci', 'Nicole Nail Artist Münster'],
      description:
        'Privates Nagelatelier & Alternative Nail Architecture von Nicole in Münster. 100% Aprés Gel-X Modellagen, Gothic Cyber-Chrome, Liquid Armor 3D Art & bespoke handgefertigte Press-On Sets.',
      url: siteUrl,
      image: `${siteUrl}/images/gallery/nicci-001.webp`,
      priceRange: '€€ (50€ - 115€)',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Cash, PayPal',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Münster',
        addressRegion: 'Nordrhein-Westfalen',
        postalCode: '48143',
        addressCountry: 'DE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 51.9607,
        longitude: 7.6261,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '20:00',
        },
      ],
      founder: {
        '@type': 'Person',
        name: 'Nicole',
        jobTitle: 'Alternative Nail Artist',
        sameAs: [
          'https://www.instagram.com/nailzbynicci',
          'https://www.instagram.com/niccicatt',
        ],
      },
      sameAs: [
        'https://www.instagram.com/nailzbynicci',
        'https://www.instagram.com/niccicatt',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Nageldesign & Gel-X Services Münster',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Aprés Gel-X Neumodellage (Full Cover Soft Gel Extensions)',
              description: '100% soak-off Gel-X tips cured with soft gel. No acrylic, zero odor, high flexibility.',
            },
            price: '50.00',
            priceCurrency: 'EUR',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Nail Art Tier I - Chrome & Minimal',
              description: 'Chrome powder, aura airbrush, French tip variations or minimalist cyber lines.',
            },
            price: '15.00',
            priceCurrency: 'EUR',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Nail Art Tier II - Gothic & Cyber Sigilism',
              description: 'Complex cyber sigilism, 3D chrome droplets, texture layering, metallic charms.',
            },
            price: '25.00',
            priceCurrency: 'EUR',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Nail Art Tier III - Liquid Armor & 3D Sculpting',
              description: 'Bespoke hand-sculpted 3D claws, piercings, liquid armor metal sculpting on every finger.',
            },
            price: '40.00',
            priceCurrency: 'EUR',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Bespoke Reusable Press-On Sets',
              description: 'Custom sized reusable nail sets made with 100% Aprés Gel-X, complete with prep kit and storage box. Worldwide shipping.',
            },
            price: '60.00',
            priceCurrency: 'EUR',
          },
        ],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable} ${alexBrush.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-concrete text-ink selection:bg-magenta selection:text-white font-sans min-h-[100dvh]">
        <LanguageProvider>
          <SmoothScrollProvider>
            <Preloader />
            <Navbar />
            <main className="min-h-[100dvh] pt-24">{children}</main>
            <Footer />
            <FloatingBookButton />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
