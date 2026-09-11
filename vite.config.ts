import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, './data'),
      'next/link': path.resolve(__dirname, './src/lib/Link.tsx'),
      'next/image': path.resolve(__dirname, './src/lib/Image.tsx'),
      'next/navigation': path.resolve(__dirname, './src/lib/navigation.ts'),
      'next/dynamic': path.resolve(__dirname, './src/lib/dynamic.tsx'),
      'next/font/google': path.resolve(__dirname, './src/lib/font.ts'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    sourcemap: true,
    cssMinify: true,
    minify: 'esbuild',
    target: 'esnext',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-framer': ['framer-motion'],
        },
      },
    },
  },
});
