// 编译 @vue/compiler-sfc 为浏览器版本，输出到 /public/parses/vue3.js
const { build } = require('esbuild')
const path = require('path')

build({
  entryPoints: [
    path.resolve(__dirname, '../node_modules/@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js')
  ],
  outfile: path.resolve(__dirname, '../public/parses/vue3.js'),
  bundle: true,
  footer: {
    js: 'globalThis.Vue3TemplateCompiler = Vue3TemplateCompiler;'
  },
  format: 'iife',
  globalName: 'Vue3TemplateCompiler',
  minify: true,
  platform: 'browser',
  external: ['fs']
})
  .then(() => {
    console.log('完成')
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
