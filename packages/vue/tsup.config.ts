import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,

  inject: ['./src/jsx-inject.ts'],
})
