/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// 预缓存所有构建产物
precacheAndRoute(self.__WB_MANIFEST)

// 监听消息，支持手动激活
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// 激活后立即接管所有客户端
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// 图片缓存策略：优先使用缓存
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
)

// JS/CSS 缓存策略：先返回缓存，后台更新
registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      })
    ]
  })
)

// CDN 资源缓存策略
registerRoute(
  /^https:\/\/unpkg\.com/,
  new StaleWhileRevalidate({
    cacheName: 'cdn-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      })
    ]
  })
)
