import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      injectManifest: {
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
        globIgnores: ['**/*.map', 'manifest*.js']
      },
      injectRegister: false
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    host: '0.0.0.0',
    port: 8081
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    sourcemap: false
  }
})
