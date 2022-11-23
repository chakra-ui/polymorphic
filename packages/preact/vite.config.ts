/// <reference types="vitest" />

import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  test: {
    setupFiles: './test/setupTest.ts',
    globals: true,
    environment: 'jsdom',
    css: false,
  },
})
