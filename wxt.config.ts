import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: './src',
  alias: {
    '@core': './src/core',
    '@features': './src/features',
    '@ui': './src/core/core-ui',
  },
  manifest: {
    name: 'Developer Wallet',
    permissions: ['sidePanel', 'storage', 'tabs'],
  },
  vite: () => ({
    plugins: [react(), nodePolyfills()],
    define: {
      global: 'globalThis',
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
        ],
      },
    },
  }),
})
