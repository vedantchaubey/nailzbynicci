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

export const metadata: Metadata = {
  metadataBase: new URL('https://nailzbynicci.de'),
  title: 'Nailz by Nicci · Your Alternative Nail Artist | Münster',
  description:
    'Nicole (@nailzbynicci) — Your Alternative Nail Artist in Münster, Germany. 100% Aprés Gel-X, gothic cyber-chrome spikes, liquid armor and soft kawaii couture.',
  keywords: [
    'Your alternative nail artist',
    'Nail artist Münster',
    'Aprés Gel-X Münster',
    'Gothic nails',
    'Kawaii nails',
    'Chrome nail art',
    'Cyber sigilism nails',
    'Nailz by Nicci',
    'Nicole Münster nails',
    'Press on nails luxury',
  ],
  authors: [{ name: 'Nicole | @nailzbynicci' }],
  creator: 'Nicole',
  openGraph: {
    title: 'Nailz by Nicci · Your Alternative Nail Artist',
    description:
      'Art for the parts of you that punch, text, and touch. Bespoke Aprés Gel-X nail architecture in Münster, Germany.',
    url: 'https://nailzbynicci.de',
    siteName: 'Nailz by Nicci',
    images: [
      {
        url: '/images/gallery/nicci-001.webp',
        width: 1440,
        height: 1728,
        alt: 'Nailz by Nicci - Your Alternative Nail Artist',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nailz by Nicci · Your Alternative Nail Artist',
    description:
      'Art for the parts of you that punch, text, and touch. Bespoke Aprés Gel-X nail architecture in Münster.',
    images: ['/images/gallery/nicci-001.webp'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable} ${alexBrush.variable}`}>
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
