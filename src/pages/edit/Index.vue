<template>
  <div class="editContainer">
    <Header v-if="!embed"></Header>
    <div class="content" v-if="showContent">
      <component :is="activeLayout" :key="layout" :layout="layout"></component>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import {
  computed,
  watch,
  getCurrentInstance,
  onUnmounted,
  ref,
  toRaw
} from 'vue'
import { useStore } from 'vuex'
import { layoutMap, defaultViewThemeConfig } from '@/config/constants'
import { useRouter, useRoute } from 'vue-router'
import { initMonacoEditor } from '@/utils/monacoEditor'
import nprogress from 'nprogress'
import { getThemeValue, utoa } from '@/utils'
import { ElMessage } from 'element-plus'
import { localDb } from '@/utils/localDb'

const props = defineProps({
  // 是否是嵌入模式
  embed: {
    type: Boolean,
    default: false
  }
})

// hooks定义部分
const useInit = () => {
  const store = useStore()
  const proxy = getCurrentInstance().proxy
  const showContent = ref(false)
  const init = async callback => {
    // 初始化编辑器
    await initMonacoEditor()
    callback()
    showContent.value = true
  }
  const route = useRoute()
  // 获取当前编辑数据
  const getData = async () => {
    try {
      nprogress.start()
      // 增加对本地存储路由的处理
      if (route.name === 'LocalEdit') {
        const localData = await localDb.getGist(Number(route.params.id))
        if (localData) {
          // 解析本地存储的数据
          const parseData = JSON.parse(localData.files['coderun.json'].content)
          
          // 如果不同步布局，则保持当前布局不变
          if (!store.state.editData.config.syncLayout) {
            const currentLayout = store.state.editData.config.layout
            parseData.config.layout = currentLayout
          }

          store.commit('setEditData', parseData)
          proxy.$eventEmitter.emit('reset_code')
          nprogress.done()
          return
        }
      }
      
      // 原有的 Gist 和 query 数据处理逻辑
      await store.dispatch('getData', {
        id: route.params.id,
        data: route.query.data,
        blank: route.query.blank || false
      })
      proxy.$eventEmitter.emit('reset_code')
      nprogress.done()
    } catch (error) {
      console.error(error)
      nprogress.done()
      ElMessage.error('获取数据失败')
    }
  }
  
  // 监听路由变化
  watch(
    () => route.params,
    (newVal, oldVal) => {
      if (newVal.id !== oldVal.id) {
        getData()
      }
    }
  )
  
  getData()
  return {
    store,
    showContent,
    proxy,
    router: useRouter(),
    init
  }
}

// 将数据保存到query里
const useQueryStore = (store, router) => {
  const route = useRoute()

  watch(() => {
    return store.state.editData
  },() => {
    // 已登录或者是本地编辑模式时不处理
    if ((store.state.githubToken && route.params.id) || router.currentRoute.value.name === 'LocalEdit') {
      return
    }

    let data = utoa(JSON.stringify(store.state.editData))
    router.replace({
      name: 'Editor',
      query: {
        data
      }
    })
  }, {
    deep: true
  })
}

// 布局
const useLayout = ({ store }) => {
  const layout = computed(() => {
    return store.state.editData.config.layout
  })
  const activeLayout = computed(() => {
    return props.embed ? layoutMap['embed'] : layoutMap[layout.value]
  })
  return {
    layout,
    activeLayout
  }
}

// 新窗口预览
const useWindowPreview = ({ store, layout, router, proxy, themeData }) => {
  // 预览窗口
  let previewWindow = null
  // 通知预览窗口进行刷新
  const editData = computed(() => store.state.editData)
  const previewWindowRun = () => {
    previewWindow &&
      previewWindow.postMessage({
        type: 'preview',
        data: {
          config: {
            ...editData.value.config,
            themeData: toRaw(themeData.value)
          },
          code: {
            HTML: {
              language: editData.value.code.HTML.language,
              content: editData.value.code.HTML.content
            },
            CSS: {
              language: editData.value.code.CSS.language,
              content: editData.value.code.CSS.content,
              resources: editData.value.code.CSS.resources.map(item => {
                return {
                  ...item
                }
              })
            },
            JS: {
              language: editData.value.code.JS.language,
              content: editData.value.code.JS.content,
              resources: editData.value.code.JS.resources.map(item => {
                return {
                  ...item
                }
              }),
              importMap: editData.value.code.JS.importMap || ''
            },
            VUE: {
              language: editData.value.code.VUE.language,
              content: editData.value.code.VUE.content
            }
          }
        }
      })
  }
  proxy.$eventEmitter.on('preview_window_run', previewWindowRun)
  onUnmounted(() => {
    proxy.$eventEmitter.off('preview_window_run', previewWindowRun)
  })

  // 创建和销毁预览窗口
  const previewLayoutHandle = () => {
    // 新窗口预览模式
    if (layout.value === 'newWindowPreview') {
      if (!previewWindow) {
        let previewUrl = router.resolve({
          name: 'Preview'
        })
        previewWindow = window.open(previewUrl.href)
        previewWindow.onload = () => {
          previewWindowRun()
        }
      }
    } else {
      if (previewWindow) {
        previewWindow.close()
        previewWindow = null
      }
    }
  }
  watch(
    () => {
      return layout.value
    },
    () => {
      previewLayoutHandle()
    }
  )

  return {
    previewLayoutHandle,
    previewWindowRun
  }
}

// 界面主题，设置css变量
const useTheme = ({ proxy, store, layout }) => {
  // 主题同步设置
  const pageThemeSyncCodeTheme = computed(() => {
    return store.state.editData.config.pageThemeSyncCodeTheme
  })
  const themeData = ref(null)
  let lastThemeData = null
  // 更新主题变量
  const updateTheme = data => {
    themeData.value = data
    lastThemeData = data
    Object.keys(defaultViewThemeConfig).forEach(item => {
      document.documentElement.style.setProperty(
        item,
        getThemeValue(item, data, pageThemeSyncCodeTheme.value)
      )
    })
    if (layout.value === 'newWindowPreview') {
      proxy.$eventEmitter.emit('preview_window_run')
    }
  }
  updateTheme()
  watch(pageThemeSyncCodeTheme, () => {
    updateTheme(lastThemeData)
  })
  proxy.$eventEmitter.on('set-theme', updateTheme)
  onUnmounted(() => {
    proxy.$eventEmitter.off('set-theme', updateTheme)
  })

  return {
    themeData
  }
}

// created部分
const { proxy, router, store, init, showContent } = useInit()
useQueryStore(store, router)
const { layout, activeLayout } = useLayout({ store })
const { themeData } = useTheme({ proxy, store, layout })
const { previewLayoutHandle } = useWindowPreview({
  store,
  layout,
  router,
  proxy,
  themeData
})
init(() => {
  previewLayoutHandle()
})
</script>

<style scoped lang="less">
.editContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
