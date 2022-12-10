/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  test: {
    setupFiles: './test/setupTest.ts',
    globals: true,
    environment: 'jsdom',
    css: false,
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
  plugins: [vue(), vueJsx()],
})
