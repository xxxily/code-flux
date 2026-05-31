const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
    publicPath: './',
    outputDir: './docs/',
    lintOnSave: false,
    productionSourceMap: false,
    transpileDependencies: [/monaco-editor-textmate/],
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src/')
            }
        },
        plugins: [
            new MonacoWebpackPlugin({
                languages: ['css', 'html', 'javascript', 'less', 'pug', 'scss', 'typescript', 'coffee']
            }),
            
            // 只在生产环境启用 Service Worker
            ...(process.env.NODE_ENV === 'production' ? [
                new InjectManifest({
                    swSrc: path.resolve(__dirname, './src/service-worker.js'),
                    swDest: 'service-worker.js',
                    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
                    exclude: [/\.map$/, /^manifest.*\.js$/]
                })
            ] : [])
        ],
        optimization: {
            minimize: true
        }
    }
}
