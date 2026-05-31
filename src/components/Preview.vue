<template>
  <div
    class="previewBox"
    :class="{ hide: hide, disabledEvents: disabledEvents }"
  >
    <!-- 添加加载遮罩 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner"></div>
        <div class="loading-text">{{ loadingText }}</div>
        <div class="loading-progress">{{ loadingProgress }}</div>
        <button @click="cancelRun" class="cancel-btn">取消运行</button>
      </div>
    </div>

    <iframe
      class="iframe"
      ref="iframeRef"
      :srcdoc="srcdoc"
      :style="iframeStyle"
      :key="iframeKey"
      :class="{ pointerEvents: disabledEvents }"
    ></iframe>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  computed,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
  defineExpose,
  nextTick
} from 'vue'
import { useStore } from 'vuex'
import { assembleHtml, compile, compileVue } from '@/utils'
import { base } from '@/config'
import { defaultImportMapStr } from '@/config/constants'

const dev = process.env.NODE_ENV !== 'production'

// props
const props = defineProps({
  hide: {
    type: Boolean,
    default: false
  },
  scale: {
    type: Number,
    default: 1
  }
})

// hooks定义部分

// 初始化数据
const iframeRef = ref(null)
const useInitData = () => {
  const { proxy } = getCurrentInstance()
  // vuex
  const store = useStore()
  // 数据
  const editData = computed(() => store.state.editData)
  const isNewWindowPreview = ref(false)
  const newWindowPreviewData = ref(null)
  const htmlLanguage = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.HTML.language
      : editData.value.code.HTML.language
  })
  const jsLanguage = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.JS.language
      : editData.value.code.JS.language
  })
  const cssLanguage = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.CSS.language
      : editData.value.code.CSS.language
  })
  const htmlContent = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.HTML.content
      : editData.value.code.HTML.content
  })
  const jsContent = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.JS.content
      : editData.value.code.JS.content
  })
  const cssContent = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.CSS.content
      : editData.value.code.CSS.content
  })
  const cssResources = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.CSS.resources
      : editData.value.code.CSS.resources
  })
  const jsResources = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.JS.resources
      : editData.value.code.JS.resources
  })
  const importMap = computed(() => {
    return JSON.parse(
      (isNewWindowPreview.value
        ? newWindowPreviewData.value.code.JS.importMap
        : editData.value.code.JS.importMap) || defaultImportMapStr
    )
  })
  const vueLanguage = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.VUE.language
      : editData.value.code.VUE.language
  })
  const vueContent = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.code.VUE.content
      : editData.value.code.VUE.content
  })

  return {
    proxy,
    store,
    editData,
    isNewWindowPreview,
    newWindowPreviewData,
    htmlLanguage,
    jsLanguage,
    cssLanguage,
    htmlContent,
    jsContent,
    cssContent,
    cssResources,
    jsResources,
    importMap,
    vueLanguage,
    vueContent
  }
}

// 处理日志打印
const useLog = ({ proxy }) => {
  // 打印日志
  const log = (type, data) => {
    iframeRef.value.contentWindow.postMessage({
      type,
      data
    })
  }

  proxy.$eventEmitter.on('log', log)

  return {
    log
  }
}

// 处理生成html结构
const useCreateHtml = () => {
  // 为外部资源添加超时和错误处理
  const createResourceWithTimeout = (url, type, timeout = 10000) => {
    const createCssLoader = () => {
      return `const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '${url}';
            link.onload = function() { clearTimeout(timer); };
            link.onerror = function() {
              clearTimeout(timer);
              console.error('CSS加载失败: ${url}');
            };
            document.head.appendChild(link);`
    }

    const createJsLoader = () => {
      return `const script = document.createElement('script');
            script.src = '${url}';
            script.onload = function() { clearTimeout(timer); };
            script.onerror = function() {
              clearTimeout(timer);
              console.error('JS加载失败: ${url}');
            };
            document.head.appendChild(script);`
    }

    const loaderCode = type === 'css' ? createCssLoader() : createJsLoader()

    return [
      '<script data-assist-code="true">',
      '(function() {',
      `const timer = setTimeout(function() { console.warn('资源加载超时: ${url}'); }, ${timeout});`,
      loaderCode,
      '})();',
      '<' + '/script>'
    ].join('')
  }

  // 生成html结构
  const createHtml = (
    htmlStr,
    jsStr,
    cssStr,
    cssResources,
    jsResources,
    importMap,
    openAlmightyConsole,
    useImport
  ) => {
    // 添加依赖资源 - 使用带超时控制的方式
    let _cssResources = cssResources
      .map(item => {
        return createResourceWithTimeout(item.url, 'css', 10000)
      })
      .join('\n')

    let _jsResources = jsResources
      .map(item => {
        return createResourceWithTimeout(item.url, 'js', 10000)
      })
      .join('\n')

    const erudaScript1 = '<script data-assist-code="true" src="' + base + 'eruda/eruda.js"><' + '/script>'
    const erudaScript2 = '<script data-assist-code="true">window.eruda && eruda.init();<' + '/script>'
    const erudaCode = erudaScript1 + erudaScript2

    const headParts = [
      '<title>预览<' + '/title>',
      '<style type="text/css">',
      cssStr,
      '<' + '/style>',
      openAlmightyConsole ? erudaCode : '',
      '<script data-assist-code="true" src="' + base + 'base/index.js"><' + '/script>',
      '<script data-assist-code="true" src="' + base + 'console/' + (dev ? 'index.js' : 'compile.js') + '"><' + '/script>',
      _cssResources
    ]
    let head = headParts.join('')

    let jsContent = ''
    let successRunNotify = '<script data-assist-code="true">window.parent.postMessage({type: \'successRun\'})<' + '/script>'

    // 出错运行通知已经在console/index.js中处理过了，这里不再处理
    // let errorRunNotify = `window.parent.postMessage({type: 'errorRun'})`

    // 是否开启eruda
    // jsContent += openAlmightyConsole ? erudaCode : ''

    // 使用ESM
    if (useImport) {
      // 使用了importmap
      if (importMap) {
        jsContent += '<script type="importmap">' +
          JSON.stringify(importMap) +
          '<' + '/script>'
      }

      jsContent += '<script type="module">' +
        jsStr +
        '<' + '/script>'
    } else {
      jsContent += '<script>' +
        jsStr +
        '<' + '/script>'
    }

    // 运行成功通知
    jsContent += successRunNotify

    let body = `
      ${htmlStr}
      ${_jsResources}
      ${jsContent}
    `
    return assembleHtml(head, body)
  }

  return {
    createHtml
  }
}

// 处理运行
const useRun = ({
  store,
  isNewWindowPreview,
  newWindowPreviewData,
  editData,
  proxy,
  vueLanguage,
  vueContent,
  htmlLanguage,
  jsLanguage,
  cssLanguage,
  htmlContent,
  jsContent,
  cssContent,
  cssResources,
  jsResources,
  importMap,
  createHtml
  // log 参数未使用，已移除
}) => {
  // 预览的文档内容
  const srcdoc = ref('')
  // 当前布局类型
  const layout = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.config.layout
      : editData.value.config.layout
  })
  // 是否开启全能调试
  const openAlmightyConsole = computed(() => {
    return isNewWindowPreview.value
      ? newWindowPreviewData.value.config.openAlmightyConsole
      : editData.value.config.openAlmightyConsole
  })
  // 重新运行时是否保留之前的日志
  const keepPreviousLogs = computed(() => {
    return editData.value.config.keepPreviousLogs
  })
  // 运行
  const runStartTime = ref(0)
  // 添加一个 key 来强制重新渲染 iframe
  const iframeKey = ref(0)
  // 添加取消控制器
  const runAbortController = ref(null)
  // 添加加载状态
  const isLoading = ref(false)
  const loadingText = ref('正在初始化...')
  const loadingProgress = ref('')

  // 取消运行（在模板中被调用）
  // eslint-disable-next-line no-unused-vars
  const cancelRun = () => {
    if (runAbortController.value) {
      runAbortController.value.abort()
    }
    isLoading.value = false
    loadingText.value = '运行已取消'
    proxy.$eventEmitter.emit('errorRun')
  }

  const run = async (syncTitle = false) => {
    try {
      // 显示加载状态
      isLoading.value = true
      loadingText.value = '正在初始化...'
      loadingProgress.value = '0%'

      // 取消之前的运行
      if (runAbortController.value) {
        runAbortController.value.abort()
      }
      runAbortController.value = new AbortController()

      // 清理旧的 iframe
      if (iframeRef.value) {
        try {
          // 停止旧 iframe 中的所有加载
          const oldIframe = iframeRef.value
          if (oldIframe.contentWindow) {
            oldIframe.contentWindow.stop && oldIframe.contentWindow.stop()
          }
          // 清空 srcdoc，停止加载
          srcdoc.value = ''
        } catch (e) {
          // 忽略跨域错误
          console.warn('清理旧 iframe 时出错:', e)
        }
      }

      // 等待一个 tick 确保清理完成
      await nextTick()

      // 强制重新渲染iframe
      iframeKey.value = Date.now()

      // 等待 iframe 真正加载完成
      await new Promise((resolve, reject) => {
        const signal = runAbortController.value.signal
        if (signal.aborted) {
          reject(new Error('运行已取消'))
          return
        }

        let attempts = 0
        const maxAttempts = 40 // 最多等待 2 秒 (40 * 50ms)
        const checkIframe = () => {
          if (signal.aborted) {
            reject(new Error('运行已取消'))
            return
          }
          if (iframeRef.value && iframeRef.value.contentWindow) {
            resolve()
          } else {
            attempts++
            if (attempts >= maxAttempts) {
              reject(new Error('iframe 初始化超时'))
              return
            }
            setTimeout(checkIframe, 50)
          }
        }
        checkIframe()
      })

      runStartTime.value = Date.now()
      proxy.$eventEmitter.emit('startRun')
      if (!keepPreviousLogs.value) {
        proxy.$eventEmitter.emit('clear_logs')
      }

      // 更新加载进度
      loadingText.value = '正在编译代码...'
      loadingProgress.value = '20%'

      // 分阶段超时控制
      const compileTimeout = 8000  // 编译超时 8 秒
      const totalTimeout = 15000   // 总超时 15 秒

      const startTime = Date.now()

      // 编译阶段
      const compilePromise = (async () => {
        let compiledData = null

        // vue单文件
        if (
          layout.value === 'vue' ||
          (layout.value === 'newWindowPreview' && vueContent.value)
        ) {
          loadingText.value = '正在编译 Vue 组件...'
          loadingProgress.value = '30%'
          compiledData = await compileVue(
            vueLanguage.value,
            vueContent.value,
            importMap.value.imports || {}
          )
          if (compiledData) {
            // 自动引入vue资源
            // _jsResourcesPlus = getTemplate(vueLanguage.value).code.JS.resources;
          } else {
            compiledData = {
              html: '',
              css: '',
              js: ''
            }
          }
        } else {
          loadingText.value = '正在编译 HTML/CSS/JS...'
          loadingProgress.value = '30%'
          compiledData = await compile(
            htmlLanguage.value,
            jsLanguage.value,
            cssLanguage.value,
            htmlContent.value,
            jsContent.value,
            importMap.value.imports || {},
            cssContent.value
          )
        }

        return compiledData
      })()

      const compileTimeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('编译超时，请检查代码复杂度或语法错误')), compileTimeout)
      })

      const abortPromise = new Promise((_, reject) => {
        runAbortController.value.signal.addEventListener('abort', () => {
          reject(new Error('运行已取消'))
        })
      })

      // 编译阶段竞争
      loadingProgress.value = '50%'
      const compiledData = await Promise.race([compilePromise, compileTimeoutPromise, abortPromise])

      // 检查是否已超过总超时
      if (Date.now() - startTime > totalTimeout) {
        throw new Error('运行总时间超时')
      }

      // 更新加载进度
      loadingText.value = '正在生成预览...'
      loadingProgress.value = '70%'

      let _jsResourcesPlus = []
      let _cssResourcesPlus = []

      let _cssResources = _cssResourcesPlus.concat(
        cssResources.value.map(item => ({
          ...item
        }))
      )
      let _jsResources = _jsResourcesPlus.concat(
        jsResources.value.map(item => ({
          ...item
        }))
      )

      let doc = createHtml(
        compiledData.html,
        compiledData.js.js,
        compiledData.css,
        _cssResources,
        _jsResources,
        importMap.value,
        openAlmightyConsole.value,
        compiledData.js.useImport
      )

      store.commit('setPreviewDoc', doc)

      // 同步更新标题
      if (syncTitle) {
        const titleMatch = doc.match(/<title[^>]*>(.*?)<\/title>/i)
        if (titleMatch && titleMatch[1]) {
          document.title = titleMatch[1].trim()
        }
      }

      // 更新加载进度
      loadingText.value = '加载完成'
      loadingProgress.value = '100%'

      srcdoc.value = doc
      isNewWindowPreview.value = false

      // 延迟隐藏加载状态，让用户看到完成提示
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    } catch (error) {
      console.error('运行错误:', error)
      isLoading.value = false
      proxy.$eventEmitter.emit('custom_logs', {
        data: {
          type: 'console',
          method: 'error',
          data: [
            {
              content: error.message || '运行出错',
              contentType: 'string'
            }
          ]
        }
      })
      proxy.$eventEmitter.emit('errorRun')
    }
  }

  proxy.$eventEmitter.on('run', run)

  onBeforeUnmount(() => {
    // 取消正在运行的任务
    if (runAbortController.value) {
      runAbortController.value.abort()
    }
    // 清理事件监听
    proxy.$eventEmitter.off('run', run)
  })

  // 全能调试配置修改后重新运行
  watch(() => {
    return editData.value.config.openAlmightyConsole
  }, run)

  return {
    srcdoc,
    run,
    runStartTime,
    iframeKey
  }
}

// 新开窗口预览模式处理
const useNewWindowPreview = ({
  newWindowPreviewData,
  isNewWindowPreview,
  run,
  runStartTime
}) => {
  // 新开窗口预览模式接收预览通知
  window.addEventListener('message', ({ data = {} }) => {
    if (data.type === 'preview') {
      newWindowPreviewData.value = data.data
      isNewWindowPreview.value = true
      run()
    } else if (data.type === 'successRun') {
      proxy.$eventEmitter.emit('successRun', Date.now() - runStartTime.value)
    } else if (data.type === 'errorRun') {
      proxy.$eventEmitter.emit('errorRun')
    }
  })
}

// 处理拖动
const useDrag = ({ proxy }) => {
  const disabledEvents = ref(false)

  // 拖动开始禁止响应iframe的鼠标事件，否则父页面不会触发鼠标事件导致拖动存在bug
  const onDragStart = () => {
    disabledEvents.value = true
  }

  // 拖动结束解除禁止
  const onDragOver = () => {
    disabledEvents.value = false
  }

  proxy.$eventEmitter.on('dragStart', onDragStart)
  proxy.$eventEmitter.on('dragOver', onDragOver)

  onBeforeUnmount(() => {
    proxy.$eventEmitter.off('dragStart', onDragStart)
    proxy.$eventEmitter.off('dragOver', onDragOver)
  })

  return {
    disabledEvents
  }
}

// 处理动态执行js
const useDynamicRunJs = ({ proxy }) => {
  // 动态执行js
  const dynamicRunJs = code => {
    iframeRef.value.contentWindow.postMessage({
      type: 'command',
      data: code
    })
  }

  proxy.$eventEmitter.on('dynamic_js_command', dynamicRunJs)
  onBeforeUnmount(() => {
    proxy.$eventEmitter.off('dynamic_js_command', dynamicRunJs)
  })
}

// 缩放
const useScale = () => {
  const iframeStyle = computed(() => {
    let style = {
      transform: `scale(${props.scale})`
    }
    if (props.scale !== 1) {
      let multiple = (1 / props.scale) * 100
      style.width = `${multiple}%`
      style.height = `${multiple}%`
    }
    return style
  })

  return {
    iframeStyle
  }
}

// created部分
const {
  proxy,
  store,
  editData,
  isNewWindowPreview,
  newWindowPreviewData,
  htmlLanguage,
  jsLanguage,
  cssLanguage,
  htmlContent,
  jsContent,
  cssContent,
  cssResources,
  jsResources,
  importMap,
  vueLanguage,
  vueContent
} = useInitData()
// log 未使用，但保留以便将来使用
// eslint-disable-next-line no-unused-vars
const { log } = useLog({ proxy })
const { createHtml } = useCreateHtml()
const { srcdoc, run, runStartTime, iframeKey } = useRun({
  store,
  isNewWindowPreview,
  newWindowPreviewData,
  editData,
  proxy,
  vueLanguage,
  vueContent,
  htmlLanguage,
  jsLanguage,
  cssLanguage,
  htmlContent,
  jsContent,
  cssContent,
  cssResources,
  jsResources,
  importMap,
  createHtml
  // log 已从 useRun 参数中移除
})
useNewWindowPreview({
  newWindowPreviewData,
  isNewWindowPreview,
  run,
  runStartTime
})
const { disabledEvents } = useDrag({ proxy })
useDynamicRunJs({ proxy })
const { iframeStyle } = useScale()

const forceRerender = () => {
  // 增加 key 值以强制重新创建 iframe
  iframeKey.value = Date.now()
}

defineExpose({
  run,
  forceRerender
})
</script>

<style scoped lang="less">
.previewBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 9;
  position: relative;

  &.hide {
    display: none;
  }

  &.disabledEvents {
    pointer-events: none;
  }

  .iframe {
    width: 100%;
    height: 100%;
    border: none;
    transform-origin: 0 0;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
  }

  .loading-content {
    text-align: center;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    min-width: 200px;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #409eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-text {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .loading-progress {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  .cancel-btn {
    padding: 8px 20px;
    background: #f56c6c;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;

    &:hover {
      background: #f45454;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(245, 108, 108, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
