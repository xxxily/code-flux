// 图片
import defaultImg from '../assets/layoutImgs/default.jpg'
import default2Img from '../assets/layoutImgs/default2.jpg'
import editImg from '../assets/layoutImgs/edit.jpg'
import edit2Img from '../assets/layoutImgs/edit2.jpg'
import editOnlyImg from '../assets/layoutImgs/editOnly.jpg'
import editOnly2Img from '../assets/layoutImgs/editOnly2.jpg'
import previewOnlyImg from '../assets/layoutImgs/previewOnly.jpg'
import previewOnly2Img from '../assets/layoutImgs/previewOnly2.jpg'
import jsImg from '../assets/layoutImgs/js.jpg'
import tabsImg from '../assets/layoutImgs/tabs.jpg'

import edit3Img from '../assets/layoutImgs/default.jpg'
import edit4Img from '../assets/layoutImgs/default.jpg'
import tabs2Img from '../assets/layoutImgs/default.jpg'
import tabs3Img from '../assets/layoutImgs/default.jpg'
import tabs4Img from '../assets/layoutImgs/default.jpg'

// 布局组件
import Default from '../pages/edit/layouts/Default.vue'
import Default2 from '../pages/edit/layouts/Default2.vue'
import Edit from '../pages/edit/layouts/Edit.vue'
import Edit2 from '../pages/edit/layouts/Edit2.vue'
import EditOnly from '../pages/edit/layouts/EditOnly.vue'
import EditOnly2 from '../pages/edit/layouts/EditOnly2.vue'
import PreviewOnly from '../pages/edit/layouts/PreviewOnly.vue'
import PreviewOnly2 from '../pages/edit/layouts/PreviewOnly2.vue'
import Js from '../pages/edit/layouts/Js.vue'
import NewWindowPreview from '../pages/edit/layouts/NewWindowPreview.vue'
import VueSFC from '../pages/edit/layouts/VueSFC.vue'
import Embed from '../pages/edit/layouts/Embed.vue'
import Tabs from '../pages/edit/layouts/Tabs.vue'
import Edit3 from '../pages/edit/layouts/Edit3.vue'
import Edit4 from '../pages/edit/layouts/Edit4.vue'
import Tabs2 from '../pages/edit/layouts/Tabs2.vue'
import Tabs3 from '../pages/edit/layouts/Tabs3.vue'
import Tabs4 from '../pages/edit/layouts/Tabs4.vue'

// Monaco Editor支持的语言
export const supportLanguage = {
  css: 'css',
  less: 'less',
  scss: 'scss',
  sass: 'scss',
  stylus: 'css',
  postcss: 'css',
  html: 'html',
  pug: 'pug',
  javascript: 'javascript',
  babel: 'javascript',
  typescript: 'typescript',
  coffeescript: 'coffeescript',
  vue2: 'html',
  vue3: 'html',
  livescript: 'javascript',
  json: 'json'
}

// 支持美化的语言
export const formatterParserMap = {
  css: 'css',
  scss: 'scss',
  less: 'less',
  postcss: 'css',
  html: 'html',
  javascript: 'babel',
  babel: 'babel',
  typescript: 'typescript',
  vue2: 'html',
  vue3: 'html'
}

// 支持使用es6模块语法
export const supportESModuleMap = {
  javascript: true,
  typescript: true,
  coffeescript: true,
  vue2: true,
  vue3: true
}

// Monaco Editor 内置语言，对应 worker 由 Vite 在 src/utils/monacoEditor.js 中打包
export const monacoEditorInnerLanguages = [
  'css',
  'html',
  'javascript',
  'less',
  'pug',
  'scss',
  'typescript',
  'coffee'
]

// 语言id到作用域名称的映射
export const scopeNameMap = {
  html: 'text.html.basic',
  pug: 'text.pug',
  css: 'source.css',
  less: 'source.css.less',
  scss: 'source.css.scss',
  sass: 'source.sassdoc',
  typescript: 'source.ts',
  javascript: 'source.js',
  javascriptreact: 'source.js.jsx',
  coffeescript: 'source.coffee',
  json: 'source.json'
}

// 作用域名称到语法文件的映射
export const tmGrammarJsonMap = {
  'text.html.basic': 'html.tmLanguage.json',
  'text.pug': 'pug.tmLanguage.json',
  'source.css': 'css.tmLanguage.json',
  'source.css.less': 'less.tmLanguage.json',
  'source.less': 'less.tmLanguage.json',
  'source.css.scss': 'scss.tmLanguage.json',
  'source.sass': 'scss.tmLanguage.json',
  'source.sassdoc': 'sassdoc.tmLanguage.json',
  'source.stylus': 'css.tmLanguage.json',
  'source.ts': 'TypeScript.tmLanguage.json',
  'source.js': 'JavaScript.tmLanguage.json',
  'source.js.jsx': 'JavaScriptReact.tmLanguage.json',
  'source.coffee': 'coffeescript.tmLanguage.json',
  'source.js.regexp': {
    format: 'plist',
    path: 'Regular Expressions (JavaScript).tmLanguage'
  },
  'source.json': 'JSON.tmLanguage.json'
}

// 编辑器列表
export const defaultEditorMap = {
  HTML: {
    title: 'HTML',
    language: 'html',
    content: '',
    showAddBtn: false,
    disableDrag: true,
    showTouchBar: true
  },
  CSS: {
    title: 'CSS',
    language: 'css',
    content: '',
    showAddBtn: true,
    disableDrag: false,
    showTouchBar: true
  },
  JS: {
    title: 'JS',
    language: 'javascript',
    content: '',
    showAddBtn: true,
    disableDrag: false,
    showTouchBar: true
  },
  VUE: {
    title: 'VUE',
    language: 'vue2',
    content: '',
    showAddBtn: true,
    disableDrag: true,
    showTouchBar: false
  }
}

// 预处理器列表
export const preprocessorListMap = {
  HTML: [
    {
      label: 'HTML',
      value: 'html'
    },
    {
      label: 'Pug',
      value: 'pug'
    }
  ],
  JS: [
    {
      label: 'JavaScript',
      value: 'javascript'
    },
    {
      label: 'Babel',
      value: 'babel'
    },
    {
      label: 'TypeScript',
      value: 'typescript'
    },
    {
      label: 'CoffeeScript',
      value: 'coffeescript'
    },
    {
      label: 'LiveScript',
      value: 'livescript'
    }
  ],
  CSS: [
    {
      label: 'CSS',
      value: 'css'
    },
    {
      label: 'LESS',
      value: 'less'
    },
    {
      label: 'SCSS',
      value: 'scss'
    },
    {
      label: 'SASS',
      value: 'sass'
    },
    {
      label: 'Stylus',
      value: 'stylus'
    },
    {
      label: 'PostCss',
      value: 'postcss'
    }
  ],
  VUE: [
    {
      label: 'Vue2',
      value: 'vue2'
    },
    {
      label: 'Vue3',
      value: 'vue3'
    }
  ]
}

// 语言文件类型映射列表
export const langTypeMap = {
  html: ['text/html'],
  pug: ['.pug'],
  javascript: ['.js'],
  babel: ['.js', '.jsx'],
  typescript: ['.ts'],
  coffeescript: ['.coffee'],
  livescript: ['.mlx'],
  css: ['text/css'],
  less: ['.less'],
  scss: ['.scss'],
  sass: ['.sass'],
  stylus: ['.styl'],
  postcss: ['.pcss'],
  vue2: ['.vue'],
  vue3: ['.vue']
}

// 常用cdn服务
export const cdnSiteList = [
  {
    name: 'BootCDN',
    url: 'https://www.bootcdn.cn/'
  },
  {
    name: '又拍云',
    url: 'http://jscdn.upai.com/'
  },
  {
    name: 'Staticfile CDN',
    url: 'http://staticfile.org/'
  },
  {
    name: '75CDN 前端静态资源库',
    url: 'https://cdn.baomitu.com/'
  },
  {
    name: '字节跳动静态资源公共库',
    url: 'https://cdn.bytedance.com/'
  },
  {
    name: 'cdnjs',
    url: 'https://cdnjs.com/'
  },
  {
    name: 'jsDelivr',
    url: 'https://www.jsdelivr.com/'
  },
  {
    name: 'unpkg',
    url: 'https://unpkg.com/'
  }
]

// 布局列表
export const layoutList = [
  {
    name: '编辑·竖排·上 & 预览下',
    value: 'default'
  },
  {
    name: '编辑·竖排·下 & 预览上',
    value: 'default2'
  },
  {
    name: '编辑·竖排·左 & 预览右',
    value: 'edit2'
  },
  {
    name: '编辑·竖排·右 & 预览左',
    value: 'edit3'
  },
  {
    type: 'divider'
  },
  {
    name: '编辑·横排·左 & 预览右',
    value: 'edit'
  },
  {
    name: '编辑·横排·右 & 预览左',
    value: 'edit4'
  },
  {
    type: 'divider'
  },
  {
    name: '编辑·标签·上 & 预览下',
    value: 'tabs'
  },
  {
    name: '编辑·标签·下 & 预览上',
    value: 'tabs2'
  },
  {
    name: '编辑·标签·左 & 预览右',
    value: 'tabs3'
  },
  {
    name: '编辑·标签·右 & 预览左',
    value: 'tabs4'
  },
  {
    type: 'divider'
  },
  {
    name: '新开窗口预览',
    value: 'newWindowPreview'
  },
  {
    name: 'Vue单文件',
    value: 'vue'
  },
  {
    type: 'divider'
  },
  {
    name: '纯编辑竖排(无控制台)',
    value: 'editOnly'
  },
  {
    name: '纯编辑竖排(带控制台)',
    value: 'editOnly2'
  },
  {
    type: 'divider'
  },
  {
    name: '纯JS编辑面板(带控制台)',
    value: 'js'
  },
  {
    type: 'divider'
  },
  {
    name: '纯预览(带控制台)',
    value: 'previewOnly2'
  },
  {
    name: '纯预览(无控制台)',
    value: 'previewOnly'
  }
]

// 布局预览图片映射
export const previewImgMap = {
  default: defaultImg,
  default2: default2Img,
  edit: editImg,
  edit2: edit2Img,
  editOnly: editOnlyImg,
  editOnly2: editOnly2Img,
  previewOnly: previewOnlyImg,
  previewOnly2: previewOnly2Img,
  js: jsImg,
  tabs: tabsImg,
  edit3: edit3Img,
  edit4: edit4Img,
  tabs2: tabs2Img,
  tabs3: tabs3Img,
  tabs4: tabs4Img,
}

// 布局组件映射
export const layoutMap = {
  default: Default,
  default2: Default2,
  edit: Edit,
  edit2: Edit2,
  edit3: Edit3,
  edit4: Edit4,
  tabs: Tabs,
  tabs2: Tabs2,
  tabs3: Tabs3,
  tabs4: Tabs4,
  editOnly: EditOnly,
  editOnly2: EditOnly2,
  previewOnly: PreviewOnly,
  previewOnly2: PreviewOnly2,
  js: Js,
  newWindowPreview: NewWindowPreview,
  vue: VueSFC,
  embed: Embed
}

// 编辑器字号
export const codeFontSizeList = [12, 14, 16, 18, 20, 22, 24].map(item => {
  return {
    name: item + 'px',
    value: item
  }
})

// 默认的界面主题配置
// https://code.visualstudio.com/api/references/theme-color
export const defaultViewThemeConfig = {
  // 标题栏背景颜色
  '--header-background': [
    'titleBar.activeBackground',
    'titleBar.inactiveBackground',
    '#1e1f26'
  ],
  // 标题栏logo颜色
  '--header-logo-color': [
    'titleBar.activeForeground',
    'titleBar.inactiveForeground',
    '#fff'
  ],

  // 标题栏按钮的背景颜色
  '--header-btn-background': ['none'],
  // 标题栏的按钮边框颜色
  '--header-btn-border-color': ['titleBar.activeForeground', '#444857'],
  // 标题栏的按钮颜色
  '--header-btn-color': ['titleBar.activeForeground', '#fff'],

  // 标题栏的下拉菜单的背景颜色
  '--dropdown-background': [
    'menu.background',
    'dropdown.background',
    '#1e1f26'
  ],
  // 标题栏的下拉菜单的边框颜色
  '--dropdown-box-border-color': [
    'menu.border', 
    'dropdown.border', 
    'scrollbarSlider.background',
    'scrollbarSlider.activeBackground',
    'scrollbarSlider.hoverBackground',
    '#333642'
  ],
  // 标题栏的下拉菜单的颜色
  '--dropdown-color': ['menu.foreground', 'dropdown.foreground', '#fff'],
  // 标题栏的下拉菜单hover时的背景颜色
  '--dropdown-hover-background': ['menu.selectionBackground', '#5a5f73'],
  // 标题栏的下拉菜单hover时的颜色
  '--dropdown-hover-color': ['menu.selectionForeground', '#fff'],

  // 拖动条的背景颜色
  '--touch-bar-background': [
    'scrollbarSlider.background',
    'scrollbarSlider.activeBackground',
    'scrollbarSlider.hoverBackground',
    '#333642'
  ],
  // 拖动条左/上边框颜色
  '--touch-bar-border-left-color': [
    'menu.separatorBackground',
    'rgba(255, 255, 255, 0.05)'
  ],
  // 拖动条右/下边框颜色
  '--touch-bar-border-right-color': [
    'menu.separatorBackground',
    'rgba(0, 0, 0, 0.4)'
  ],

  // 编辑器背景颜色
  '--editor-background': ['editor.background', '#1d1e22'],
  // 编辑器标题栏的背景颜色
  '--editor-header-background': [
    'editorGroupHeader.tabsBackground',
    'editor.background',
    '#1d1e22'
  ],
  // 编辑器标题栏的标题颜色
  '--editor-header-title-color': [
    'tab.activeForeground',
    'editor.foreground',
    '#aaaebc'
  ],
  // 编辑器标题栏的其他部分颜色
  '--editor-header-color': [
    'tab.activeForeground',
    'editor.foreground',
    '#606266'
  ],
  // 编辑器标题栏下边框颜色
  '--editor-header-border-bottom-color': [
    'editorGroup.border',
    'editorGroupHeader.tabsBorder',
    'rgba(255, 255, 255, 0.05)'
  ],

  // 控制台背景颜色
  '--console-background': [
    'panel.background',
    'terminal.background',
    '#131417'
  ],
  // 命令输入栏背景颜色
  '--command-background': ['terminal.background', 'rgba(255, 255, 255, 0.1)'],
  // 命令输入栏颜色
  '--command-color': ['terminal.foreground', '#fff'],
  
  // Element Plus 主题变量映射
  // 主色
  // '--el-color-primary': ['tab.activeBorder', '#ffd866'],
  // '--el-color-primary-light-1': ['tab.hoverBorder', '#ffe07f'],
  // '--el-color-primary-light-2': ['tab.hoverBorder', '#ffe699'],
  // '--el-color-primary-light-3': ['tab.hoverBorder', '#ffecb2'],
  // '--el-color-primary-light-4': ['tab.hoverBorder', '#fff2cc'],
  // '--el-color-primary-light-5': ['tab.hoverBorder', '#fff8e5'],
  // '--el-color-primary-light-6': ['tab.hoverBorder', '#fffdf2'],
  // '--el-color-primary-light-7': ['tab.hoverBorder', '#fffef9'],
  // '--el-color-primary-light-8': ['tab.hoverBorder', '#fffffe'],
  // '--el-color-primary-light-9': ['tab.hoverBorder', '#ffffff'],
  // '--el-color-primary-dark-2': ['tab.activeBorder', '#e6c25c'],
  
  // 成功色
  // '--el-color-success': ['symbolIcon.functionForeground', '#a9dc76'],
  // '--el-color-success-light-1': ['symbolIcon.functionForeground', '#b7e28a'],
  // '--el-color-success-light-2': ['symbolIcon.functionForeground', '#c4e79f'],
  // '--el-color-success-light-3': ['symbolIcon.functionForeground', '#d2edb3'],
  // '--el-color-success-light-4': ['symbolIcon.functionForeground', '#e0f3c8'],
  // '--el-color-success-light-5': ['symbolIcon.functionForeground', '#edf8dc'],
  // '--el-color-success-light-6': ['symbolIcon.functionForeground', '#f6fcef'],
  // '--el-color-success-light-7': ['symbolIcon.functionForeground', '#fbfef7'],
  // '--el-color-success-light-8': ['symbolIcon.functionForeground', '#fdfefb'],
  // '--el-color-success-light-9': ['symbolIcon.functionForeground', '#fefffe'],
  // '--el-color-success-dark-2': ['symbolIcon.functionForeground', '#88b05e'],
  
  // 警告色
  // '--el-color-warning': ['editorWarning.foreground', '#fc9867'],
  // '--el-color-warning-light-1': ['editorWarning.foreground', '#fca87c'],
  // '--el-color-warning-light-2': ['editorWarning.foreground', '#fdb791'],
  // '--el-color-warning-light-3': ['editorWarning.foreground', '#fdc7a6'],
  // '--el-color-warning-light-4': ['editorWarning.foreground', '#fed6bb'],
  // '--el-color-warning-light-5': ['editorWarning.foreground', '#fee6d0'],
  // '--el-color-warning-light-6': ['editorWarning.foreground', '#fff5e5'],
  // '--el-color-warning-light-7': ['editorWarning.foreground', '#fffaf2'],
  // '--el-color-warning-light-8': ['editorWarning.foreground', '#fffdf9'],
  // '--el-color-warning-light-9': ['editorWarning.foreground', '#fffffe'],
  // '--el-color-warning-dark-2': ['editorWarning.foreground', '#ca7a52'],
  
  // 危险色
  // '--el-color-danger': ['editorError.foreground', '#ff6188'],
  // '--el-color-danger-light-1': ['editorError.foreground', '#ff779a'],
  // '--el-color-danger-light-2': ['editorError.foreground', '#ff8dab'],
  // '--el-color-danger-light-3': ['editorError.foreground', '#ffa3bd'],
  // '--el-color-danger-light-4': ['editorError.foreground', '#ffb9ce'],
  // '--el-color-danger-light-5': ['editorError.foreground', '#ffcfe0'],
  // '--el-color-danger-light-6': ['editorError.foreground', '#ffe5f1'],
  // '--el-color-danger-light-7': ['editorError.foreground', '#fff2f8'],
  // '--el-color-danger-light-8': ['editorError.foreground', '#fff9fc'],
  // '--el-color-danger-light-9': ['editorError.foreground', '#fffdfe'],
  // '--el-color-danger-dark-2': ['editorError.foreground', '#cc4e6d'],
  
  // 信息色
  // '--el-color-info': ['editorInfo.foreground', '#78dce8'],
  // '--el-color-info-light-1': ['editorInfo.foreground', '#8ce2eb'],
  // '--el-color-info-light-2': ['editorInfo.foreground', '#a0e7ef'],
  // '--el-color-info-light-3': ['editorInfo.foreground', '#b4edf2'],
  // '--el-color-info-light-4': ['editorInfo.foreground', '#c8f2f6'],
  // '--el-color-info-light-5': ['editorInfo.foreground', '#dcf8f9'],
  // '--el-color-info-light-6': ['editorInfo.foreground', '#f0fdfd'],
  // '--el-color-info-light-7': ['editorInfo.foreground', '#f7fefe'],
  // '--el-color-info-light-8': ['editorInfo.foreground', '#fbfffe'],
  // '--el-color-info-light-9': ['editorInfo.foreground', '#feffff'],
  // '--el-color-info-dark-2': ['editorInfo.foreground', '#60b0ba'],
  
  // 文本色
  // '--el-text-color-primary': ['editor.foreground', '#fcfcfa'],
  // '--el-text-color-regular': ['foreground', '#c1c0c0'],
  // '--el-text-color-secondary': ['tab.inactiveForeground', '#939293'],
  // '--el-text-color-placeholder': ['input.placeholderForeground', '#727072'],
  // '--el-text-color-disabled': ['disabledForeground', '#5b595c'],
  
  // 边框色
  // '--el-border-color': ['dropdown.border', '#403e41'],
  // '--el-border-color-light': ['editorGroup.border', '#5b595c'],
  // '--el-border-color-lighter': ['editorGroup.border', '#727072'],
  // '--el-border-color-extra-light': ['editorGroup.border', '#939293'],
  // '--el-border-color-dark': ['dropdown.border', '#2d2a2e'],
  
  // 背景色
  // '--el-bg-color': ['editor.background', '#2d2a2e'],
  // '--el-bg-color-page': ['editor.background', '#221f22'],
  // '--el-bg-color-overlay': ['dropdown.background', '#403e41'],
  
  // 禁用状态
  // '--el-disabled-bg-color': ['button.disabledBackground', '#403e41'],
  // '--el-disabled-text-color': ['disabledForeground', '#5b595c'],
  // '--el-disabled-border-color': ['button.disabledBorder', '#2d2a2e'],
  
  // 遮罩层
  // '--el-overlay-color': ['widget.shadow', 'rgba(25, 24, 26, 0.8)'],
  // '--el-overlay-color-light': ['widget.shadow', 'rgba(25, 24, 26, 0.7)'],
  // '--el-overlay-color-lighter': ['widget.shadow', 'rgba(25, 24, 26, 0.5)'],
  
  // 阴影
  // '--el-box-shadow': ['widget.shadow', '0 2px 12px 0 rgba(25, 24, 26, 0.1)'],
  // '--el-box-shadow-light': ['widget.shadow', '0 2px 8px 0 rgba(25, 24, 26, 0.1)'],
  // '--el-box-shadow-lighter': ['widget.shadow', '0 2px 4px 0 rgba(25, 24, 26, 0.1)'],
  // '--el-box-shadow-dark': ['widget.shadow', '0 2px 16px 0 rgba(25, 24, 26, 0.2)']
}

// ES模块CDN
export const esModuleCdnUrl = 'https://unpkg.com/'
export const handleEsModuleCdnUrl = (module, useModule = true) => {
  return `${esModuleCdnUrl}${module}${useModule ? '?module' : ''}`
}

// 嵌入模式的编辑器tab列表
export const getEmbedCodeTypeListMap = layout => {
  return layout === 'vue' ? ['VUE'] : ['HTML', 'CSS', 'JS']
}

// 嵌入模式的缩放列表
export const scaleTypeList = [
  {
    name: '1x',
    value: 1
  },
  {
    name: '0.5x',
    value: 0.5
  },
  {
    name: '0.25x',
    value: 0.25
  }
]

// 默认的importMap
export const defaultImportMapStr = `{
	"imports": {
	}
}`
