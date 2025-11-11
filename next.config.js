/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.dreamnova.ai'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    DEPLOYMENT_PLATFORM: process.env.DEPLOYMENT_PLATFORM || 'vercel',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  // Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
