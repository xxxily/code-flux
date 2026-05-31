// 编译 LiveScript 为浏览器版本，输出到 /public/parses/livescript.js
const { build } = require('esbuild')
const path = require('path')

const browserShimPlugin = {
  name: 'livescript-browser-shim',
  setup(build) {
    const shims = {
      path: `
        const trimTrailingSlash = value => value.replace(/\\/+$/, '')
        exports.basename = value => {
          const normalized = trimTrailingSlash(String(value || '').replace(/\\\\/g, '/'))
          return normalized.split('/').pop() || ''
        }
        exports.dirname = value => {
          const normalized = trimTrailingSlash(String(value || '').replace(/\\\\/g, '/'))
          const index = normalized.lastIndexOf('/')
          return index > 0 ? normalized.slice(0, index) : '.'
        }
        exports.join = (...parts) => exports.normalize(parts.filter(Boolean).join('/'))
        exports.normalize = value => String(value || '').replace(/\\\\/g, '/').replace(/\\/+/g, '/')
        exports.resolve = (...parts) => exports.normalize(parts.filter(Boolean).join('/'))
      `,
      fs: `
        const unavailable = () => {
          throw new Error('fs is not available in the browser LiveScript compiler')
        }
        exports.readFileSync = unavailable
        exports.realpathSync = value => value
        exports.statSync = unavailable
      `,
      events: `
        exports.EventEmitter = function EventEmitter() {}
      `
    }

    build.onResolve({ filter: /^(path|fs|events)$/ }, args => {
      return { path: args.path, namespace: 'browser-shim' }
    })

    build.onLoad({ filter: /.*/, namespace: 'browser-shim' }, args => {
      return {
        contents: shims[args.path],
        loader: 'js'
      }
    })
  }
}

build({
  entryPoints: [path.resolve(__dirname, '../node_modules/livescript/lib/browser.js')],
  outfile: path.resolve(__dirname, '../public/parses/livescript.js'),
  banner: {
    js: `var Buffer = globalThis.Buffer || {
  alloc: size => new Uint8Array(size),
  from: value => ({
    toString: encoding => {
      const text = String(value)
      if (encoding === 'base64') {
        return btoa(unescape(encodeURIComponent(text)))
      }
      return text
    }
  })
};
globalThis.Buffer = Buffer;`
  },
  bundle: true,
  footer: {
    js: 'globalThis.LiveScript = LiveScript;'
  },
  format: 'iife',
  globalName: 'LiveScript',
  minify: true,
  platform: 'browser',
  plugins: [browserShimPlugin]
})
  .then(() => {
    console.log('完成')
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
