# CodeFlux 预览卡住问题分析与优化方案

## 问题现象
HTML 预览时有时会卡住，一直预览不成功

## 根本原因分析

### 1. **超时机制不完善** ⭐⭐⭐⭐⭐
**位置**: `src/components/Preview.vue:299-379`

**问题**:
- 当前超时设置为 5000ms，但只覆盖了 `run()` 函数的主体
- 超时后虽然 reject，但 iframe 可能已经开始加载资源，导致资源加载卡住
- 没有对外部资源加载（CSS/JS resources）设置超时
- 编译过程（compile/compileVue）可能耗时很长，特别是复杂的 Vue 组件

**影响**: 高 - 这是最可能导致卡住的原因

### 2. **iframe 重新渲染机制问题** ⭐⭐⭐⭐
**位置**: `src/components/Preview.vue:282-290`

**问题**:
```javascript
const run = async (syncTitle = false) => {
  try {
    // 强制重新渲染iframe
    iframeKey.value = Date.now()
    
    // 等待下一个tick确保iframe已经重新创建
    await nextTick()
```

- 每次运行都强制重新创建 iframe（通过改变 key）
- `nextTick()` 不能保证 iframe 的 DOM 已经完全加载
- 旧的 iframe 可能还在加载资源，新的 iframe 已经创建，导致资源竞争

**影响**: 高 - 频繁运行时容易出现问题

### 3. **外部资源加载无超时控制** ⭐⭐⭐⭐⭐
**位置**: `src/components/Preview.vue:168-178`

**问题**:
```javascript
let _cssResources = cssResources
  .map(item => {
    return `<link href="${item.url}" rel="stylesheet">`
  })
  .join('\n')

let _jsResources = jsResources
  .map(item => {
    return `<script src="${item.url}"><\/script>`
  })
  .join('\n')
```

- 外部 CSS/JS 资源直接插入，没有加载超时
- 如果外部资源服务器响应慢或不可用，会一直等待
- 没有错误处理和降级机制

**影响**: 极高 - 这是最常见的卡住原因

### 4. **编译器加载可能失败** ⭐⭐⭐⭐
**位置**: `src/utils/load.js:17-47`

**问题**:
```javascript
export const load = preprocessorList => {
  // ...
  return new Promise((resolve, reject) => {
    loadjs(jsList, {
      returnPromise: true
    })
      .then(() => {
        // ...
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}
```

- 编译器文件（babel, typescript, sass 等）加载失败时会 reject
- 但没有重试机制
- 没有超时控制

**影响**: 中 - 网络不稳定时会出现

### 5. **Sass 编译器单例问题** ⭐⭐⭐
**位置**: `src/utils/transform.js:176-208`

**问题**:
```javascript
let sass = null
const css = (preprocessor, code) => {
  return new Promise((resolve, reject) => {
    // ...
    case 'sass':
    case 'scss':
      if (!sass) {
        sass = new window.Sass()
      }
      sass.compile(
        code,
        {
          indentedSyntax: preprocessor === 'sass'
        },
        result => {
          resolve(transformCssImport(result.text))
        }
      )
```

- Sass 编译器是单例，多次快速编译可能导致状态混乱
- 编译回调没有错误处理
- 没有超时机制

**影响**: 中 - 使用 Sass/SCSS 时可能卡住

### 6. **Vue3 编译器可能抛出异常** ⭐⭐⭐
**位置**: `src/utils/transform.js:440-463`

**问题**:
```javascript
case 'vue3':
  componentData = window.Vue3TemplateCompiler.parse(code)
  // 使用了setup语法
  if (componentData.descriptor.scriptSetup) {
    componentData.descriptor.script = null
    let compiledScript = window.Vue3TemplateCompiler.compileScript(
      componentData.descriptor,
      {
        inlineTemplate: true,
        refSugar: true,
        id: Math.random() + ''
      }
    )
```

- Vue3 编译器在处理复杂组件时可能抛出异常
- 没有对编译时间进行限制
- `refSugar` 选项已废弃，可能导致问题

**影响**: 中 - 复杂 Vue 组件时可能出现

### 7. **消息通信可能丢失** ⭐⭐
**位置**: `src/components/Preview.vue:425-435`

**问题**:
```javascript
window.addEventListener('message', ({ data = {} }) => {
  if (data.type === 'preview') {
    // ...
  } else if (data.type === 'successRun') {
    proxy.$eventEmitter.emit('successRun', Date.now() - runStartTime.value)
  } else if (data.type === 'errorRun') {
    proxy.$eventEmitter.emit('errorRun')
  }
})
```

- iframe 重新创建时，旧的消息监听器可能还在
- 没有清理机制
- 可能收到旧 iframe 的消息

**影响**: 低 - 但会导致状态不一致

### 8. **循环引用检测可能导致卡顿** ⭐⭐
**位置**: `public/console/index.js:61-100`

**问题**:
- 使用数组 `includes()` 检测循环引用，大对象时性能差
- 深层嵌套对象会导致递归过深

**影响**: 低 - 仅在打印大对象时

## 优化方案

### 方案 1: 完善超时和错误处理机制（推荐）

#### 1.1 为外部资源添加超时控制
```javascript
// 创建带超时的资源加载函数
const createResourceWithTimeout = (url, type, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`资源加载超时: ${url}`))
    }, timeout)
    
    if (type === 'css') {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      link.onload = () => {
        clearTimeout(timer)
        resolve()
      }
      link.onerror = () => {
        clearTimeout(timer)
        reject(new Error(`CSS加载失败: ${url}`))
      }
      document.head.appendChild(link)
    } else if (type === 'js') {
      const script = document.createElement('script')
      script.src = url
      script.onload = () => {
        clearTimeout(timer)
        resolve()
      }
      script.onerror = () => {
        clearTimeout(timer)
        reject(new Error(`JS加载失败: ${url}`))
      }
      document.head.appendChild(script)
    }
  })
}
```

#### 1.2 优化 run 函数的超时机制
```javascript
const run = async (syncTitle = false) => {
  try {
    // 取消之前的运行
    if (runAbortController.value) {
      runAbortController.value.abort()
    }
    runAbortController.value = new AbortController()
    
    // 强制重新渲染iframe
    iframeKey.value = Date.now()
    
    // 等待 iframe 真正加载完成
    await new Promise((resolve) => {
      const checkIframe = () => {
        if (iframeRef.value && iframeRef.value.contentWindow) {
          resolve()
        } else {
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

    // 分阶段超时控制
    const compileTimeout = 8000  // 编译超时
    const totalTimeout = 15000   // 总超时
    
    const startTime = Date.now()
    
    // 编译阶段
    const compilePromise = (async () => {
      let compiledData = null
      
      if (layout.value === 'vue' || 
          (layout.value === 'newWindowPreview' && vueContent.value)) {
        compiledData = await compileVue(
          vueLanguage.value,
          vueContent.value,
          importMap.value.imports || {}
        )
        // ... 其他逻辑
      } else {
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
      setTimeout(() => reject(new Error('编译超时，请检查代码复杂度')), compileTimeout)
    })
    
    const compiledData = await Promise.race([compilePromise, compileTimeoutPromise])
    
    // 检查是否已超过总超时
    if (Date.now() - startTime > totalTimeout) {
      throw new Error('运行总时间超时')
    }
    
    // 生成文档
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
    
    if (syncTitle) {
      const titleMatch = doc.match(/<title[^>]*>(.*?)<\/title>/i)
      if (titleMatch && titleMatch[1]) {
        document.title = titleMatch[1].trim()
      }
    }
    
    srcdoc.value = doc
    isNewWindowPreview.value = false
    
  } catch (error) {
    console.error('运行错误:', error)
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
```

#### 1.3 为编译器加载添加超时和重试
```javascript
// src/utils/load.js
export const load = (preprocessorList, retryCount = 2) => {
  let notLoaded = preprocessorList.filter(item => {
    return !preprocessorLoaded[item]
  })
  if (notLoaded.length <= 0) {
    return Promise.resolve()
  }
  
  return new Promise((resolve, reject) => {
    const attemptLoad = (attempt = 0) => {
      let jsList = []
      notLoaded.forEach(item => {
        let _resources = (resources[item] || [item]).map(r => {
          return /^https?/.test(item) ? item : `${base}parses/${r}.js`
        })
        jsList.push(..._resources)
      })
      
      // 添加超时控制
      const loadTimeout = 10000
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('编译器加载超时')), loadTimeout)
      })
      
      Promise.race([
        loadjs(jsList, { returnPromise: true }),
        timeoutPromise
      ])
        .then(() => {
          notLoaded.forEach(item => {
            preprocessorLoaded[item] = true
          })
          resolve()
        })
        .catch(err => {
          if (attempt < retryCount) {
            console.warn(`编译器加载失败，重试 ${attempt + 1}/${retryCount}`, err)
            setTimeout(() => attemptLoad(attempt + 1), 1000)
          } else {
            reject(err)
          }
        })
    }
    
    attemptLoad()
  })
}
```

#### 1.4 修复 Sass 编译器问题
```javascript
// src/utils/transform.js
const css = (preprocessor, code) => {
  return new Promise((resolve, reject) => {
    // 添加超时
    const timeout = setTimeout(() => {
      reject(new Error('CSS编译超时'))
    }, 5000)
    
    try {
      switch (preprocessor) {
        case 'sass':
        case 'scss':
          // 每次创建新实例，避免状态混乱
          const sassInstance = new window.Sass()
          sassInstance.compile(
            code,
            {
              indentedSyntax: preprocessor === 'sass'
            },
            result => {
              clearTimeout(timeout)
              if (result.status === 0) {
                resolve(transformCssImport(result.text))
              } else {
                reject(new Error(result.message || 'Sass编译失败'))
              }
            }
          )
          break
        // ... 其他 case
      }
    } catch (error) {
      clearTimeout(timeout)
      reject(error)
    }
  })
}
```

#### 1.5 修复 Vue3 编译器问题
```javascript
case 'vue3':
  componentData = window.Vue3TemplateCompiler.parse(code)
  // 使用了setup语法
  if (componentData.descriptor.scriptSetup) {
    componentData.descriptor.script = null
    let compiledScript = window.Vue3TemplateCompiler.compileScript(
      componentData.descriptor,
      {
        inlineTemplate: true,
        // refSugar 已废弃，移除
        id: Math.random() + ''
      }
    )
    componentData.descriptor.script = {
      content: compiledScript.content
    }
  }
  parseData = await parseVueComponentData(
    componentData.descriptor,
    parseVue3ScriptPlugin,
    'vue3',
    importMap
  )
  resolve(parseData)
  break
```

### 方案 2: 添加加载状态指示器

在 `src/components/Preview.vue` 中添加加载状态：

```vue
<template>
  <div class="previewBox" :class="{ hide: hide, disabledEvents: disabledEvents }">
    <!-- 添加加载遮罩 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner"></div>
        <div class="loading-text">{{ loadingText }}</div>
        <div class="loading-progress">{{ loadingProgress }}</div>
        <button @click="cancelRun" class="cancel-btn">取消</button>
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
// 添加加载状态
const isLoading = ref(false)
const loadingText = ref('正在编译...')
const loadingProgress = ref('')

const run = async (syncTitle = false) => {
  try {
    isLoading.value = true
    loadingText.value = '正在初始化...'
    loadingProgress.value = '0%'
    
    // ... 编译前
    loadingText.value = '正在编译代码...'
    loadingProgress.value = '30%'
    
    // ... 编译中
    loadingText.value = '正在生成预览...'
    loadingProgress.value = '70%'
    
    // ... 完成
    loadingProgress.value = '100%'
    isLoading.value = false
    
  } catch (error) {
    isLoading.value = false
    // ... 错误处理
  }
}

const cancelRun = () => {
  if (runAbortController.value) {
    runAbortController.value.abort()
  }
  isLoading.value = false
  proxy.$eventEmitter.emit('errorRun')
}
</script>

<style scoped lang="less">
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cancel-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### 方案 3: 添加配置选项

在设置中添加超时配置：

```javascript
// src/config/index.js
export default {
  // ... 其他配置
  
  // 预览超时配置
  preview: {
    compileTimeout: 8000,      // 编译超时（毫秒）
    totalTimeout: 15000,       // 总超时（毫秒）
    resourceTimeout: 10000,    // 外部资源加载超时（毫秒）
    retryCount: 2,             // 失败重试次数
    enableResourceTimeout: true // 是否启用资源超时控制
  }
}
```

## 优先级建议

1. **立即修复**（P0）:
   - 为外部资源添加超时控制
   - 优化 run 函数的超时机制
   - 修复 Sass 编译器单例问题

2. **尽快修复**（P1）:
   - 为编译器加载添加超时和重试
   - 修复 Vue3 编译器的 refSugar 问题
   - 添加加载状态指示器

3. **后续优化**（P2）:
   - 优化 iframe 重新渲染机制
   - 改进消息通信机制
   - 优化循环引用检测性能

## 测试建议

1. **外部资源超时测试**: 添加一个不存在的 CDN 资源，验证超时机制
2. **编译超时测试**: 编写一个超大的 Vue 组件，验证编译超时
3. **快速切换测试**: 快速修改代码并运行，验证 iframe 重建机制
4. **网络不稳定测试**: 使用 Chrome DevTools 限速，验证重试机制
5. **并发运行测试**: 在编译未完成时再次点击运行，验证取消机制

## 监控建议

添加性能监控：

```javascript
// 记录各阶段耗时
const performanceLog = {
  compileStart: 0,
  compileEnd: 0,
  renderStart: 0,
  renderEnd: 0,
  totalTime: 0
}

// 在关键节点记录时间
// 可以发送到后端进行分析
```
