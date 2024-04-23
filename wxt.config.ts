import react from '@vitejs/plugin-react'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: './src',
  alias: {
    '@core': './src/core',
    '@features': './src/features',
    '@ui': './src/ui',
  },
  vite: () => ({
    plugins: [react()],
  }),
})
