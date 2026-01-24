import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Alternative Vite config that builds without ES modules
// This avoids MIME type issues by using regular script tags
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Build as IIFE instead of ES modules
    rollupOptions: {
      output: {
        format: 'iife', // Immediately Invoked Function Expression
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          forms: ['react-hook-form'],
        },
      },
    },
    // Disable code splitting to avoid module issues
    // cssCodeSplit: false,
  },
  server: {
    port: 3000,
    open: true,
  },
})
