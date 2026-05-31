/* eslint-disable no-restricted-globals */

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
