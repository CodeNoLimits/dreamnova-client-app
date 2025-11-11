/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'cdn.dreamnova.ai'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    DEPLOYMENT_PLATFORM: process.env.DEPLOYMENT_PLATFORM || 'netlify',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  // Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
