/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './test/setupTest.ts',
    globals: true,
    environment: 'jsdom',
    css: false,
  },
})
