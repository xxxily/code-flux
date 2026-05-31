import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { eventBus } from './utils/eventBus'
import { createShortcutHandler } from './config/shortcuts'
import './assets/style/monolisa.css'
import 'element-plus/dist/index.css'
import './assets/style/element-theme.less'
import { ElLoadingDirective } from 'element-plus'
import 'nprogress/nprogress.css'
import './assets/iconfont/iconfont.css'
import './registerServiceWorker'

const create = () => {
  const app = createApp(App)
  
  // 将 eventBus 挂载到 app.config.globalProperties
  app.config.globalProperties.$eventEmitter = eventBus
  
  // 使用 eventBus 注册全局快捷键处理器
  document.addEventListener('keydown', createShortcutHandler(eventBus))

  app.use(router)
  app.use(store)
  app.directive('loading', ElLoadingDirective)
  app.mount('#app')
  
  // 隐藏加载动画
  const appLoading = document.getElementById('app-loading')
  if (appLoading) {
    // 将进度条设置为100%（如果已经显示了复杂UI）
    if (window.completeLoading) {
      window.completeLoading();
    }
    
    // 延迟一小段时间后淡出loading
    setTimeout(() => {
      appLoading.style.opacity = '0'
      setTimeout(() => {
        appLoading.style.display = 'none'
      }, 300)
    }, 500) // 给用户500ms时间看到100%的加载完成状态
  }
}

const init = () => {
  store.dispatch('getGithubToken')
  create()
}
init()
