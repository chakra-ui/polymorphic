/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    setupFiles: './test/setupTest.ts',
    globals: true,
    environment: 'jsdom',
    css: false,
  },
  plugins: [solid()],
  resolve: {
    conditions: ['development', 'browser'],
  },
})
