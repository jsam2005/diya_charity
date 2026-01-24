import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { injectBaseTag } from './vite-base-tag-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    injectBaseTag(), // Inject base tag at the very start of <head>
  ],
  base: '/', // Root path for Vercel deployment
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          forms: ['react-hook-form'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
