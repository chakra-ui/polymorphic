import { defineConfig } from 'tsup'
import { solidPlugin } from 'esbuild-plugin-solid'

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` }
  },
  esbuildPlugins: [solidPlugin()],
})
