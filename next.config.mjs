/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Strip console.log/debug from production bundles; keep error & warn
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  experimental: {
    // Tree-shake heavy packages — only import what's actually used
    optimizePackageImports: ['lucide-react', 'framer-motion', 'lenis'],
  },

  // Vercel handles WebP/AVIF conversion and edge-caches images automatically
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
