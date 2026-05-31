<template>
  <div class="right">
    <!-- 在PC端显示设置按钮 -->
    <div class="btn" @click="openSetting" v-if="!isMobile">
      <span class="icon iconfont icon-shezhitianchong"></span> 设置
    </div>
    <div class="btn" @click="openTemplate">
      <span class="icon iconfont icon-moban"></span> 模板
    </div>
    <div class="dropdownBtn" @click.stop>
      <div class="btn" @click="toggleToolsList()">
        <span class="icon iconfont icon-gongju"></span> 工具
      </div>
      <ul class="toolList" :class="{ show: showToolsList }">
        <li class="toolItem" @click="exportZipFile">导出zip</li>
        <li class="toolItem" @click="exportMarkdown">导出 Markdown</li>
        <li class="toolItem" @click="copyMarkdown">复制 Markdown</li>
        <li class="toolItem" @click="copyPreviewHtml">复制 预览HTML</li>
        
        <li class="divider" v-if="isAvailableUrl"></li>
        <li class="toolItem" @click="createShareUrl" v-if="isAvailableUrl">
          生成分享链接
        </li>
        <li class="toolItem" @click="createEmbedUrl" v-if="isAvailableUrl">
          生成嵌入链接
        </li>
        <li class="toolItem" @click="createEmbedCode" v-if="isAvailableUrl">
          生成嵌入代码
        </li>
        
        <li class="divider"></li>
        <li class="toolItem" @click="showShortcuts">常用快捷键</li>
        <li class="divider"></li>
        <li class="toolItem" @click="clearAllCode">清空代码</li>
      </ul>
    </div>
    <div class="btn" @click="run">
      <span class="icon iconfont icon-shuaxin"></span> 运行
    </div>
    <div class="dropdownBtn" @click.stop v-if="githubToken">
      <div class="btn" 
           @click="toggleSaveList()" 
           v-loading="loading"
           :title="shortcuts.find(s => s.id === 'save')?.description">
        <span class="icon iconfont icon-w_yunduan"></span> 保存
      </div>
      <ul class="toolList" :class="{ show: showSaveList }">
        <li class="toolItem" 
            @click="saveToLocal"
            :title="shortcuts.find(s => s.id === 'save')?.description">
          {{ getSaveToLocalText }}
        </li>
        <li class="toolItem" 
            @click="saveToGist"
            :title="shortcuts.find(s => s.id === 'save')?.description">
          {{ getSaveToGistText }}
        </li>
        <li class="toolItem" 
            @click="saveAsNew" 
            v-if="hasCurrentId"
            :title="shortcuts.find(s => s.id === 'saveAsNew')?.description">
          另存为副本
        </li>
      </ul>
    </div>
    <div class="btn" 
         @click="saveToLocal" 
         v-loading="loading" 
         v-else
         :title="shortcuts.find(s => s.id === 'save')?.description">
      <span class="icon iconfont icon-w_yunduan"></span> 保存
    </div>
    <div class="dropdownBtn" @click.stop>
      <div class="btn" @click="toggleMoreList()">
        <span class="icon iconfont icon-gengduo"></span>
      </div>
      <ul class="toolList" :class="{ show: showMoreList }">
        <li class="toolItem" 
            @click="openAppInNewWindow"
            :title="shortcuts.find(s => s.id === 'newWindow')?.description">
          新开窗口
        </li>
        <li class="toolItem" 
            @click="createNew"
            :title="shortcuts.find(s => s.id === 'newProject')?.description">
          新建项目
        </li>
        <li class="toolItem" 
            @click="openPreviewInNewWindow"
            :title="shortcuts.find(s => s.id === 'previewInNewWindow')?.description">
          新窗预览
        </li>
        <li class="divider"></li>
        <li class="toolItem" @click="showLocalGists">本地项目</li>
        <li class="toolItem" @click="showMyGists">我的Gist</li>
        <li class="toolItem" @click="githubToken ? logout() : login()">
          {{ githubToken ? '退出Gist' : '登录Gist' }}
        </li>
        <!-- 在移动端显示设置按钮 -->
        <li class="divider" v-if="isMobile"></li>
        <li class="toolItem" @click="openSetting" v-if="isMobile">系统设置</li>
      </ul>
    </div>
  </div>

  <!-- 快捷键弹窗 -->
  <ShortcutsDialog v-model="shortcutsDialogVisible" />
</template>

<script setup>
import {
  ref,
  computed,
  onBeforeUnmount,
  getCurrentInstance,
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted
} from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { request } from '@/utils/octokit'
import { localDb } from '@/utils/localDb'
import saveAs from '@/utils/FileSaver'
import { writeToClipboard } from '@/utils/clipboard'
import { openAppInNewWindow } from '@/utils'
import { base, routerMode } from '@/config'
import { isMobileDevice } from '@/utils'
import ShortcutsDialog from './ShortcutsDialog.vue'
import { shortcuts } from '@/config/shortcuts'

const props = defineProps({
  isEdit: Boolean,
  loading: Boolean
})

const emit = defineEmits([
  'open-setting',
  'open-template',
  'export-zip',
  'login',
  'logout',
  'show-gists',
  'show-local-gists',
  'create-share-url',
  'create-embed-url',
  'create-embed-code'
])

const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
const route = useRoute()

// 添加移动端判断
const isMobile = isMobileDevice()

// 判断是否为 Mac 系统（预留用于显示不同的快捷键提示）
// eslint-disable-next-line no-unused-vars
const isMac = /macintosh|mac os x/i.test(navigator.userAgent)

// 是否存在可用的url
const isAvailableUrl = computed(() => {
  return props.isEdit || !!route.query.data
})

// 下拉菜单
const showToolsList = ref(false)
const showMoreList = ref(false)
const showSaveList = ref(false)

const toggleToolsList = value => {
  showToolsList.value = value !== undefined ? value : !showToolsList.value
  hideAllList(showToolsList)
}

const toggleMoreList = value => {
  showMoreList.value = value !== undefined ? value : !showMoreList.value
  hideAllList(showMoreList)
}

const toggleSaveList = value => {
  showSaveList.value = value !== undefined ? value : !showSaveList.value
  hideAllList(showSaveList)
}

const hideAllList = extra => {
  [showToolsList, showMoreList, showSaveList]
    .filter(item => item !== extra)
    .forEach(item => {
      item.value = false
    })
}

document.body.addEventListener('click', hideAllList)
onBeforeUnmount(() => {
  document.body.removeEventListener('click', hideAllList)
})

// github token
const githubToken = computed(() => {
  return store.state.githubToken
})

// 运行
const run = () => {
  proxy.$eventEmitter.emit('run')
  const layout = store.state.editData.config.layout
  if (layout === 'newWindowPreview') {
    proxy.$eventEmitter.emit('preview_window_run')
  }
}

const lastSaveTime = ref(0)
const SAVE_COOLDOWN = 2000

// 保存
const save = () => {
  if (!githubToken.value) {
    saveToLocal()
  } else {
    toggleSaveList()
  }
}

// 保存到本地的函数
const saveToLocal = async () => {
  // 检查是否在冷却时间内
  const now = Date.now()
  if (now - lastSaveTime.value < SAVE_COOLDOWN) {
    ElMessage.warning('保存太频繁，请稍后再试')
    return
  }
  
  // 更新最后保存时间
  lastSaveTime.value = now

  // 在移动端下弹出标题确认框
  // if (window.innerWidth <= 980) {}

  try {
    store.commit('setLoading', true)
    let fileData = await createData()
    let id
    if (route.name === 'LocalEdit' && route.params.id) {
      await localDb.updateGist(Number(route.params.id), fileData)
      id = route.params.id
    } else {
      id = await localDb.saveGist(fileData)
      router.replace({
        name: 'LocalEdit',
        params: { id }
      })
    }
    store.commit('setLoading', false)
    ElMessage.success('保存成功')
    toggleSaveList(false)

    // 触发保存成功事件
    proxy.$eventEmitter.emit('save_success', {
      type: 'local',
      id: id,
      data: fileData,
      mode: route.name === 'LocalEdit' ? 'update' : 'create',
      routeName: 'LocalEdit'
    })
  } catch (error) {
    if (error === 'cancel') return
    console.log(error)
    store.commit('setLoading', false)
    ElMessage.error('保存失败')
  }
}

// 保存到Gist的函数
const saveToGist = async () => {
  // 检查是否在冷却时间内
  const now = Date.now()
  if (now - lastSaveTime.value < SAVE_COOLDOWN) {
    ElMessage.warning('保存太频繁，请稍后再试')
    return
  }
  
  // 更新最后保存时间
  lastSaveTime.value = now

  try {
    store.commit('setLoading', true)
    let fileData = await createData()
    let method = 'POST'
    let path = ''
    
    // 只有在Edit路由（非LocalEdit）且有id时才进行更新操作
    if (props.isEdit && route.name === 'Edit' && route.params.id) {
      method = 'PATCH'
      path = '/' + route.params.id
      fileData.gist_id = route.params.id
    }
    
    let { data } = await request(`${method} /gists${path}`, fileData)
    store.commit('setLoading', false)
    ElMessage.success('保存成功，请注意：保存不是一个同步的过程！')
    router.replace({
      name: 'Edit',
      params: {
        id: data.id
      }
    })
    toggleSaveList(false)

    // 触发保存成功事件,传递必要的数据
    proxy.$eventEmitter.emit('save_success', {
      type: 'gist',
      id: data.id,
      data: fileData,
      mode: method === 'POST' ? 'create' : 'update',
      routeName: 'Edit'
    })
  } catch (error) {
    if (error === 'cancel') return
    console.log(error)
    store.commit('setLoading', false)
    ElMessage.error('保存失败，请检查此token的权限是否包含创建gist')
  }
}

const createData = async () => {
  if(!store.state.editData.title || store.state.editData.title === '未命名') {
    // 尝试读取store.state.editData.code.HTML.content下的标题内容
    const htmlContent = store.state.editData.code?.HTML?.content || ''
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i)
    if (titleMatch && titleMatch[1]) {
      store.commit('setCodeTitle', titleMatch[1])
    } else {
      // 如果为移动端则提醒用户输入标题
      if (isMobile) {
        const { value: title } = await ElMessageBox.prompt('请输入标题', '保存', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: store.state.editData.title,
          inputValidator: value => {
            if (!value.trim()) {
              return '标题不能为空'
            }
            return true
          }
        })

        if (title && title.trim()) {
          store.commit('setCodeTitle', title.trim())
        }
      }
    }
  }

  let data = {
    description: store.state.editData.title,
    files: {},
    public: true
  }
  data.files['coderun.json'] = {
    content: JSON.stringify(store.state.editData)
  }
  return data
}

// 其他操作
const openSetting = () => emit('open-setting')
const openTemplate = () => emit('open-template')
const exportZipFile = () => {
  emit('export-zip')
  toggleToolsList(false)
}
const login = () => emit('login')
const logout = () => emit('logout')
const showMyGists = () => {
  if (githubToken.value === '') {
    emit('login')
    return
  }
  emit('show-gists')
}
const createNew = async () => {
  try {
    // 修改事件发送方式，使用回调函数接收结果
    const cleared = await new Promise(resolve => {
      proxy.$eventEmitter.emit('clear_all_code', result => {
        resolve(result)
      })
    })

    console.log('清空结果:', cleared) // 添加日志便于调试

    if (cleared) {
      router.replace({
        name: 'Editor',
        query: {
          blank: true
        }
      })

      toggleMoreList(false)

      ElMessage.success('创建新项目成功')
    }
  } catch (error) {
    console.error('创建新项目失败:', error)
    ElMessage.error('创建新项目失败')
  }
}
const createShareUrl = () => emit('create-share-url')
const createEmbedUrl = () => emit('create-embed-url')
const createEmbedCode = () => emit('create-embed-code')

// 普通的清空代码操作不需要等待结果
const clearAllCode = () => {
  proxy.$eventEmitter.emit('clear_all_code')
  toggleToolsList(false)
}

// 添加显示本地项目方法
const showLocalGists = () => {
  emit('show-local-gists')
  toggleMoreList(false)
}

// 提取生成 Markdown 内容的逻辑到单独的函数
const generateMarkdown = () => {
  const { title, code } = store.state.editData || {}

  // 如果没有数据，返回空字符串
  if (!code) {
    return ''
  }

  let markdown = `# ${title || '未命名代码'}\n\n`

  // 添加 HTML 代码块
  if (code.HTML?.content) {
    markdown += '## HTML\n\n```html\n'
    markdown += code.HTML.content
    markdown += '\n```\n\n'
  }

  // 添加 CSS 代码块
  if (code.CSS?.content) {
    markdown += '## CSS\n\n```css\n'
    markdown += code.CSS.content
    markdown += '\n```\n\n'
  }

  // 添加 JavaScript 代码块
  if (code.JS?.content) {
    markdown += '## JavaScript\n\n```javascript\n'
    markdown += code.JS.content
    markdown += '\n```\n\n'
  }

  // 如果是 Vue 布局，添加 Vue 代码块
  if (code.VUE?.content) {
    markdown += '## Vue\n\n```vue\n'
    markdown += code.VUE.content
    markdown += '\n```\n\n'
  }

  return markdown
}

// 导出 Markdown 文件
const exportMarkdown = () => {
  const markdown = generateMarkdown()

  // 如果没有任何代码内容，提示错误并返回
  if (
    !markdown ||
    markdown === `# ${store.state.editData?.title || '未命名代码'}\n\n`
  ) {
    ElMessage.error('没有可导出的代码内容')
    return
  }

  // 创建 Blob 对象
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })

  // 下载文件
  saveAs(blob, `${store.state.editData?.title || 'code'}.md`)

  // 关闭工具菜单
  toggleToolsList(false)

  // 提示成功
  ElMessage.success('Markdown 文件导出成功')
}

// 复制 Markdown 内容
const copyMarkdown = async () => {
  const markdown = generateMarkdown()

  // 如果没有任何代码内容，提示错误并返回
  if (
    !markdown ||
    markdown === `# ${store.state.editData?.title || '未命名代码'}\n\n`
  ) {
    ElMessage.error('没有可复制的代码内容')
    return
  }

  try {
    const success = await writeToClipboard(markdown)
    if (success) {
      toggleToolsList(false)
      ElMessage.success('Markdown 内容已复制到剪贴板')
    } else {
      throw new Error('所有复制方法都失败了')
    }
  } catch (err) {
    console.error('复制失败:', err)
    ElMessage.error('复制失败')
  }
}

// 在新窗口打开预览
const openPreviewInNewWindow = () => {
  try {
    let previewUrl = ''
    const isRelativePath = base === './'
    const baseUrl = isRelativePath
      ? window.location.origin
      : `${window.location.origin}${base}`

    // 如果路由有id参数(包括Edit和LocalEdit)
    if (route.params.id) {
      previewUrl = `${baseUrl}${
        routerMode === 'hash'
          ? '#/preview/' + route.params.id
          : 'preview/' + route.params.id
      }`
    }
    // 如果url有data查询参数
    else if (route.query.data) {
      // 重新编码data参数，确保与URL中的格式一致
      const encodedData = encodeURIComponent(route.query.data)
      previewUrl = `${baseUrl}${
        routerMode === 'hash'
          ? '#/preview/?data=' + encodedData
          : 'preview/?data=' + encodedData
      }`
    }
    // 其他情况
    else {
      ElMessage.info('当前状态无法预览，请先保存或分享')
      return
    }

    if (previewUrl) {
      window.open(previewUrl, '_blank')
      toggleMoreList(false)
    }
  } catch (error) {
    console.error('打开预览失败:', error)
    ElMessage.error('打开预览失败')
  }
}

const getSaveToLocalText = computed(() => {
  if (route.name === 'Edit' && route.params.id) {
    return '转存到本地'
  }
  return '保存到本地'
})

const getSaveToGistText = computed(() => {
  if (route.name === 'LocalEdit' && route.params.id) {
    return '转存到Gist'
  }
  return '保存到Gist'
})

const copyPreviewHtml = async () => {
  try {
    // 先执行预览
    proxy.$eventEmitter.emit('run')
    
    // 等待100ms确保预览内容已生成
    await new Promise(resolve => setTimeout(resolve, 100))
    
    let previewDoc = store.state.previewDoc
    
    if (!previewDoc) {
      ElMessage.error('没有可复制的预览内容')
      return
    }

    // 移除所有包含 data-assist-code 的脚本标签
    previewDoc = previewDoc.replace(/<script[^>]*data-assist-code="true"[^>]*>[\s\S]*?<\/script>/g, '')
    
    // 移除内容为空的 style 标签
    previewDoc = previewDoc.replace(/<style[^>]*>\s*<\/style>/g, '')
    
    // 移除内容为空的 script 标签
    previewDoc = previewDoc.replace(/<script(?![^>]*src\s*=\s*["'][^"']*["'])[^>]*>\s*<\/script>/gi, '')

    const success = await writeToClipboard(previewDoc)
    if (success) {
      toggleToolsList(false)
      ElMessage.success('预览HTML已复制到剪贴板')
    } else {
      throw new Error('复制失败')
    }
  } catch (err) {
    console.error('复制失败:', err)
    ElMessage.error('复制失败')
  }
}

const executeSaveCallback = (saveInfo) => {
  const callback = store.state.privateConfig.saveCallback
  if (!callback?.trim()) return

  try {
    // 获取并处理预览文档
    let previewDoc = store.state.previewDoc
    if (previewDoc) {
      // 移除辅助代码
      previewDoc = previewDoc
        .replace(/<script[^>]*data-assist-code="true"[^>]*>[\s\S]*?<\/script>/g, '')
        .replace(/<style[^>]*>\s*<\/style>/g, '')
        .replace(/<script(?![^>]*src\s*=\s*["'][^"']*["'])[^>]*>\s*<\/script>/gi, '')
    }

    const fn = new Function('saveInfo', 'console', 'alert', `
      try {
        ${callback}
        
        if (typeof onSaveSuccess === 'function') {
          onSaveSuccess({...saveInfo, previewDoc});
        }
      } catch (error) {
        console.error('回调执行错误:', error);
        throw error;
      }
    `)

    fn({...saveInfo, previewDoc}, console, alert)
  } catch (error) {
    console.error('执行保存回调失败:', error)
    ElMessage.error('执行保存回调失败: ' + error.message)
  }
}

proxy.$eventEmitter.on('save_success', (saveInfo) => {
  executeSaveCallback(saveInfo)
})

const hasCurrentId = computed(() => {
  return (route.name === 'LocalEdit' || route.name === 'Edit') && route.params.id
})

const saveAsNew = async () => {
  try {
    // 获取当前标题
    const currentTitle = store.state.editData.title || '未命名'
    const defaultTitle = `${currentTitle}的副本`
    
    // 弹出标题确认框
    const { value: title } = await ElMessageBox.prompt('请输入新副本标题', '另存为', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValue: defaultTitle,
      inputValidator: value => {
        if (!value.trim()) {
          return '标题不能为空'
        }
        return true
      }
    })

    if (title && title.trim()) {
      // 更新标题
      store.commit('setCodeTitle', title.trim())
      
      // 根据当前路由名称和githubToken决定保存到本地还是Gist
      if (route.name === 'LocalEdit' || !githubToken.value) {
        // 保存到本地，强制创建新记录
        store.commit('setLoading', true)
        const fileData = await createData()
        const newId = await localDb.saveGist(fileData)
        
        // 切换到新的编辑页面
        router.replace({
          name: 'LocalEdit',
          params: { id: newId }
        })
        
        store.commit('setLoading', false)
        ElMessage.success('另存成功')
        
        // 触发保存成功事件
        proxy.$eventEmitter.emit('save_success', {
          type: 'local',
          id: newId,
          data: fileData,
          mode: 'create',
          routeName: 'LocalEdit'
        })
      } else {
        // 保存到Gist，创建新的gist
        store.commit('setLoading', true)
        const fileData = await createData()
        const { data } = await request('POST /gists', fileData)
        
        // 切换到新的编辑页面
        router.replace({
          name: 'Edit',
          params: { id: data.id }
        })
        
        store.commit('setLoading', false)
        ElMessage.success('另存成功')
        
        // 触发保存成功事件
        proxy.$eventEmitter.emit('save_success', {
          type: 'gist',
          id: data.id,
          data: fileData,
          mode: 'create',
          routeName: 'Edit'
        })
      }
      
      toggleSaveList(false)
    }
  } catch (error) {
    if (error === 'cancel') return
    console.error(error)
    store.commit('setLoading', false)
    ElMessage.error('另存失败')
  }
}

// 添加和移除事件监听
const handleShortcutSave = () => {
  if (route.name === 'LocalEdit' && route.params.id) {
    saveToLocal()
  } else if (route.name === 'Edit' && route.params.id) {
    saveToGist()
  } else {
    save()
  }
}

onMounted(() => {
  // 监听快捷键事件
  proxy.$eventEmitter.on('shortcut_save', handleShortcutSave)
  proxy.$eventEmitter.on('shortcut_save_as_new', () => {
    if (hasCurrentId.value) {
      saveAsNew()
    }
  })
  proxy.$eventEmitter.on('shortcut_new_project', createNew)
  proxy.$eventEmitter.on('shortcut_new_window', openAppInNewWindow)
  proxy.$eventEmitter.on('shortcut_preview_window', openPreviewInNewWindow)
})

onUnmounted(() => {
  // 移除事件监听
  proxy.$eventEmitter.off('shortcut_save', handleShortcutSave)
  proxy.$eventEmitter.off('shortcut_save_as_new')
  proxy.$eventEmitter.off('shortcut_new_project')
  proxy.$eventEmitter.off('shortcut_new_window')
  proxy.$eventEmitter.off('shortcut_preview_window')
})

// 快捷键弹窗相关
const shortcutsDialogVisible = ref(false)
const showShortcuts = () => {
  shortcutsDialogVisible.value = true
  toggleToolsList(false)
}
</script>

<style scoped lang="less">
.right {
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;

  .dropdownBtn {
    position: relative;

    .btn {
      .icon {
        margin-right: 0;
      }
    }

    .toolList {
      position: absolute;
      right: 0;
      top: 50px;
      // width: 220px;
      min-width: 80px;
      max-width: 220px;
      padding: 10px 10px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      background: var(--dropdown-background);
      border-radius: 6px 0 6px 6px;
      border: 1px solid var(--dropdown-box-border-color);
      transform: scale(0.5);
      transform-origin: top right;
      transition: all 0.2s ease-in-out;
      list-style: none;
      z-index: 12;

      @media screen and (max-width: 980px) {
        padding: 6px 6px;
        min-width: 70px;
      }

      &.show {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }

      .divider {
        height: 1px;
        margin: 2px 0;
        // background-color: var(--dropdown-box-border-color);
        background-color: #d8d8d8;
        opacity: 0.15;
      }

      .toolItem {
        width: 100%;
        height: 30px;
        cursor: pointer;
        padding: 0 10px;
        line-height: 30px;
        color: var(--dropdown-color);
        font-size: 14px;

        @media screen and (max-width: 980px) {
          height: 28px;
          line-height: 28px;
          font-size: 12px;
          padding: 0 8px;
        }

        &:hover {
          background: var(--dropdown-hover-background);
          color: var(--dropdown-hover-color);
        }
      }
    }
  }

  .btn {
    background: var(--header-btn-background);
    border: 1px solid var(--header-btn-border-color);
    color: var(--header-btn-color);
    min-width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 14px;
    margin: 0 10px 0 0;
    position: relative;
    border-radius: 4px;
    text-overflow: ellipsis;
    text-decoration: none !important;
    font-weight: 400 !important;
    cursor: pointer;
    transition: all 0.3s;
    opacity: 0.7;
    user-select: none;
    font-size: 14px;

    @media screen and (max-width: 980px) {
      min-width: 32px;
      height: 32px;
      padding: 0 10px;
      margin: 0 6px 0 0;
      font-size: 12px;

      .icon {
        font-size: 12px;
      }
    }

    &:hover {
      opacity: 1;
    }

    &:active {
      transform: translateY(1px);
    }

    .icon {
      margin-right: 5px;

      @media screen and (max-width: 980px) {
        margin-right: 3px;
      }
    }
  }
}
</style>
