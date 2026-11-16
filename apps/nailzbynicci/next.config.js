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
        destination: '/how-to-book',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/prices',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/how-to-book',
        permanent: true,
      },
      {
        source: '/gift-cards',
        destination: '/how-to-book',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
