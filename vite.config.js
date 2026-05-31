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
      integration: {
        configureCustomSWViteBuild(swBuildConfig) {
          const output = swBuildConfig.build?.rollupOptions?.output
          if (output && !Array.isArray(output)) {
            delete output.inlineDynamicImports
            output.codeSplitting = false
          }
        }
      },
      injectManifest: {
        maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
        globIgnores: ['**/*.map', 'manifest*.js']
      },
      injectRegister: false
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      path: path.resolve(__dirname, './src/shims/path.js')
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
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rolldownOptions: {
      checks: {
        invalidAnnotation: false
      },
      output: {
        codeSplitting: {
          minSize: 20 * 1024,
          groups: [
            {
              name: 'vendor-vue',
              test: /node_modules[\\/](vue|vue-router|vuex)[\\/]/,
              priority: 50
            },
            {
              name: 'vendor-element-plus',
              test: /node_modules[\\/](@element-plus|element-plus)[\\/]/,
              priority: 45
            },
            {
              name: 'vendor-monaco',
              test: /node_modules[\\/](monaco-editor|monaco-editor-textmate|monaco-textmate|onigasm|dompurify|marked)[\\/]/,
              priority: 40,
              maxSize: 1200 * 1024
            },
            {
              name: 'vendor-export',
              test: /node_modules[\\/](html2canvas|cropperjs|jszip|fflate|sharp)[\\/]/,
              priority: 35
            },
            {
              name: 'vendor-utils',
              test: /node_modules[\\/]/,
              priority: 10,
              maxSize: 1200 * 1024
            }
          ]
        }
      }
    }
  }
})
