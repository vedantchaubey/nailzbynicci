/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 390, 768, 1024, 1440, 1920],
    imageSizes: [400, 800, 1600],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: '/booking',
        destination: '/termin-buchen',
        permanent: true,
      },
      {
        source: '/how-to-book',
        destination: '/termin-buchen',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/preise',
        permanent: true,
      },
      {
        source: '/prices',
        destination: '/preise',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/galerie',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/ueber-mich',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/termin-buchen',
        permanent: true,
      },
      {
        source: '/gift-cards',
        destination: '/termin-buchen',
        permanent: true,
      },
      {
        source: '/legal/impressum',
        destination: '/impressum',
        permanent: true,
      },
      {
        source: '/legal/datenschutz',
        destination: '/datenschutz',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/de',
        destination: '/',
      },
      {
        source: '/de/:path*',
        destination: '/:path*',
      },
    ]
  },
}

module.exports = nextConfig
