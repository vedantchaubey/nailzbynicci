// apps/frontend/src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { archivo, interTight } from './fonts';
import { QueryProvider } from '../components/providers/query-provider';
import { AuthProvider } from '../components/providers/auth-provider';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { MobileTabBar } from '../components/layout/mobile-tab-bar';

export const metadata: Metadata = {
  title: 'TicketPass — Verified Ticket Resale',
  description:
    'Guaranteed genuine tickets transferred natively in BookMyShow & District. Funds held in automated escrow.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${archivo.variable} ${interTight.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg text-text selection:bg-volt selection:text-black antialiased">
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileTabBar />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
