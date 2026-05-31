# Service Worker 更新优化方案

## 问题描述

在之前的配置中，Service Worker 使用了 `skipWaiting: true` 和 `clientsClaim: true`，虽然能自动更新，但存在以下问题：

1. **用户体验差**：页面可能在用户使用过程中突然刷新
2. **缓存问题**：强缓存导致用户看不到新版本
3. **无感知更新**：用户不知道应用已更新

## 解决方案

### 1. 改进的 Service Worker 策略

**核心思路**：不自动激活新版本，而是提示用户有更新，让用户主动选择何时更新。

**实现方式**：

- `skipWaiting: false` - 新 Service Worker 不自动激活
- `clientsClaim: false` - 不自动接管客户端
- 监听 `message` 事件，支持手动触发 `skipWaiting()`

### 2. 用户友好的更新提示

当检测到新版本时，显示一个友好的通知：

```
🎉 发现新版本！
[立即更新] [稍后]
```

用户点击"立即更新"后：
1. 发送 `SKIP_WAITING` 消息给新 Service Worker
2. 新 Service Worker 激活
3. 刷新页面，加载新版本

### 3. 自动检查更新

每隔 1 小时自动检查一次更新，确保用户能及时发现新版本。

## 技术实现

### 文件结构

```
src/
├── service-worker.js           # 自定义 Service Worker
├── registerServiceWorker.js    # Service Worker 注册和更新逻辑
└── main.js                     # 导入 registerServiceWorker
```

### 关键代码

#### 1. Service Worker (src/service-worker.js)

```javascript
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
```

#### 2. 注册逻辑 (src/registerServiceWorker.js)

```javascript
updated (registration) {
  // 显示更新提示
  // 用户点击"立即更新"时：
  registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  window.location.reload()
}
```

#### 3. 构建配置 (vite.config.js)

```javascript
VitePWA({
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'service-worker.js'
})
```

## 用户体验流程

### 场景 1：用户正在使用应用

1. 后台检测到新版本
2. 显示更新提示（右上角）
3. 用户可以选择：
   - **立即更新**：刷新页面，加载新版本
   - **稍后**：继续使用，30 分钟后再次提示

### 场景 2：用户关闭页面后再次访问

1. 新 Service Worker 已下载但未激活
2. 用户打开页面时看到更新提示
3. 点击"立即更新"后加载新版本

### 场景 3：首次访问

1. 正常加载页面
2. 后台安装 Service Worker
3. 下次访问时启用离线缓存

## 优势

### ✅ 用户体验好

- 不会突然刷新页面
- 用户可以选择更新时机
- 有明确的更新提示

### ✅ 更新及时

- 每小时自动检查更新
- 用户打开页面时也会检查
- 确保用户能及时发现新版本

### ✅ 离线支持

- 保留了 PWA 的离线能力
- 图片、JS、CSS 都有缓存策略
- 提升加载速度

## 缓存策略

### 图片资源

- **策略**：CacheFirst（优先使用缓存）
- **原因**：图片不常变化，优先缓存可提升性能
- **过期**：30 天，最多 60 个文件

### JS/CSS 资源

- **策略**：StaleWhileRevalidate（先返回缓存，后台更新）
- **原因**：平衡性能和更新及时性
- **过期**：7 天，最多 60 个文件

### CDN 资源

- **策略**：StaleWhileRevalidate
- **原因**：第三方库更新频率低
- **过期**：7 天，最多 60 个文件

## 测试方法

### 1. 本地测试

```bash
# 构建生产版本
npm run build

# 使用 http-server 测试
npx http-server docs -p 8080
```

### 2. 模拟更新

1. 访问 http://localhost:8080
2. 修改代码并重新构建
3. 刷新页面，应该看到更新提示

### 3. 清除缓存

Chrome DevTools → Application → Service Workers → Unregister

## 注意事项

### ⚠️ 开发环境

开发环境不启用 Service Worker，避免缓存干扰开发。

### ⚠️ 首次部署

如果用户已经安装了旧版本的 Service Worker（使用 `skipWaiting: true`），需要：

1. 部署新版本
2. 用户首次访问时会自动更新到新的 Service Worker
3. 之后的更新就会显示提示了

### ⚠️ 浏览器兼容性

Service Worker 需要 HTTPS 环境（localhost 除外）。

## 未来优化

### 1. 版本号显示

在更新提示中显示新版本号：

```
🎉 发现新版本 v1.2.5！
```

### 2. 更新日志

点击更新提示时显示更新内容：

```
v1.2.5 更新内容：
- 修复 Bug
- 新增功能
```

### 3. 后台更新

用户点击"稍后"后，在用户空闲时自动更新。

### 4. 更新进度

显示新版本下载进度。

## 参考资料

- [Workbox 文档](https://developers.google.com/web/tools/workbox)
- [Service Worker 生命周期](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
- [PWA 最佳实践](https://web.dev/pwa/)

---

**最后更新**：2026/05/31
