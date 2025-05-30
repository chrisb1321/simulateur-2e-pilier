import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
  },
  server: {
    fs: {
      strict: false
    },
    middlewareMode: false
  },
  assetsInclude: ['**/*.pdf']
})
