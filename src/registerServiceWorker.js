/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (import.meta.env.PROD) {
  register(`${import.meta.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      console.log('Service worker has been registered.')

      // 每隔 1 小时检查一次更新
      setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60) // 1 hour
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')

      // 显示更新提示
      const updateNotification = document.createElement('div')
      updateNotification.id = 'update-notification'
      updateNotification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #409eff;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          animation: slideIn 0.3s ease-out;
        ">
          <span>🎉 发现新版本！</span>
          <button id="update-btn" style="
            background: white;
            color: #409eff;
            border: none;
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
          ">立即更新</button>
          <button id="dismiss-btn" style="
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          ">稍后</button>
        </div>
        <style>
          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          #update-btn:hover {
            opacity: 0.9;
          }
          #dismiss-btn:hover {
            background: rgba(255,255,255,0.1);
          }
        </style>
      `
      document.body.appendChild(updateNotification)

      // 点击更新按钮
      document.getElementById('update-btn').addEventListener('click', () => {
        // 让新的 Service Worker 接管
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
        // 刷新页面
        window.location.reload()
      })

      // 点击稍后按钮
      document.getElementById('dismiss-btn').addEventListener('click', () => {
        updateNotification.remove()
        // 30 分钟后再次提示
        setTimeout(() => {
          if (document.getElementById('update-notification')) return
          document.body.appendChild(updateNotification)
        }, 1000 * 60 * 30) // 30 minutes
      })
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
