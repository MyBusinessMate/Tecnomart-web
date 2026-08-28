import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,

  // Strip console.log/debug from production bundles; keep error & warn
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  turbopack: {
    root: path.resolve('.'),
  },

  experimental: {
    // Tree-shake heavy packages — only import what's actually used
    optimizePackageImports: ['lucide-react', 'framer-motion', 'lenis'],
  },

  // Static export requires unoptimized: true (no Node.js server for on-demand optimization)
  // Host via CDN (Vercel/Netlify) to get automatic WebP conversion + edge caching
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
