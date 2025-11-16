/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Retiré pour permettre API routes (authentification Supabase)
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'development', // Optimisé en production
    domains: ['images.unsplash.com', 'cdn.dreamnova.ai'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    DEPLOYMENT_PLATFORM: process.env.DEPLOYMENT_PLATFORM || 'netlify',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY,
  },
  // Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
