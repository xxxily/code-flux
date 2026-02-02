import { load } from '@/utils/load'
import transform from '@/utils/transform'
import { routerMode, base } from '@/config'
import { defaultViewThemeConfig } from '@/config/constants'
import { zlibSync, strToU8, strFromU8, unzlibSync } from 'fflate'

/**
 * @Desc: 解析HTML字符串,提取head和body内容
 */
export const parseHtmlContent = (htmlStr) => {
  const result = {
    head: '',
    body: '',
    isFullHtml: false
  }

  // 检查是否包含完整的HTML结构
  const isFullHtmlRegex = /^\s*(?:<!--[\s\S]*?-->\s*)*(?:<!doctype\s+html|<html)/i
  if (isFullHtmlRegex.test(htmlStr)) {
    result.isFullHtml = true
    
    // 提取head内容
    const headMatch = htmlStr.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
    if (headMatch) {
      result.head = headMatch[1]?.trim() || ''
    }
    
    // 提取body内容  
    const bodyMatch = htmlStr.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    if (bodyMatch) {
      result.body = bodyMatch[1]?.trim() || ''
    }
  } else {
    // 不是完整HTML结构,直接作为body内容
    result.body = htmlStr
  }

  return result
}

/**
 * @Desc: 拼接html
 */
export const assembleHtml = (head, body) => {
  // 解析body内容
  const parsedBody = parseHtmlContent(body)
  
  // 如果body是完整HTML结构
  if (parsedBody.isFullHtml) {
    let finalHead = head

    // 如果body已包含title标签,移除head中的title
    if (body.match(/<title[^>]*>[\s\S]*?<\/title>/i)) {
      finalHead = finalHead.replace(/<title[^>]*>[\s\S]*?<\/title>/i, '')
    }

    // 如果body不包含charset设置,则自动补充charset设置
    if (!body.match(/<meta[^>]*charset[^>]*>/i)) {
      finalHead = `<meta charset="UTF-8" />
      ${finalHead}`
    }

    return body.replace(
      /<head[^>]*>[\s\S]*?<\/head>/i,
      `<head>
        ${parsedBody.head}
        ${finalHead}
      </head>`
    )
  }

  // 常规拼接
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    ${head}
</head>
<body>
    ${body}
</body>
</html>`
}

/**
 * @Desc: 判断类型
 */
export const type = obj => {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase()
}

/**
 * @Desc: 生成uuid
 */
export const generateUUID = () => {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

/**
 * @Desc: 编译
 */
export const compile = async (
  htmlLanguage,
  jsLanguage,
  cssLanguage,
  htmlContent,
  jsContent,
  importMap,
  cssContent
) => {
  await load([htmlLanguage, jsLanguage, cssLanguage])
  let htmlTransform = transform.html(htmlLanguage, htmlContent)
  let jsTransform = transform.js(jsLanguage, jsContent, importMap)
  let cssTransform = transform.css(cssLanguage, cssContent)
  return new Promise((resolve, reject) => {
    Promise.all([htmlTransform, jsTransform, cssTransform])
      .then(([htmlStr, jsData, cssStr]) => {
        resolve({
          html: htmlStr,
          js: jsData,
          css: cssStr
        })
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @Desc: 编译vue单文件
 */
export const compileVue = async (vueLanguage, vueContent, importMap) => {
  await load([vueLanguage])
  let vueTransform = transform.vue(vueLanguage, vueContent, importMap)
  return new Promise((resolve, reject) => {
    Promise.all([vueTransform])
      .then(([vueData]) => {
        if (vueData) {
          resolve({
            ...vueData
          })
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @Desc: 分割驼峰式字符串
 */
export const splitHumpStr = (str, char = ' ') => {
  return str
    .replace(/([A-Z])/g, '-$1')
    .split('-')
    .filter(item => {
      return !!item
    })
    .join(char)
}

/**
 * @Desc: 在新窗口打开url
 */
export const newWindowOpenUrl = url => {
  let a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.click()
}

/**
 * @Desc: 获取基础URL
 */
export const getBaseUrl = () => {
  const isRelativePath = base === './'
  return isRelativePath 
    ? window.location.origin 
    : `${window.location.origin}${base}`
}

/**
 * @Desc: 新开窗口打开应用
 */
export const openAppInNewWindow = () => {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}${routerMode === 'hash' ? '#/' : '/'}?blank=true`
  window.open(url, '_blank')
}

/**
 * @Desc: 生成分享url
 */
export const createShareUrl = (id, queryData) => {
  const baseUrl = getBaseUrl()
  if (queryData) {
    return `${baseUrl}${routerMode === 'hash' ? '#/share/?data=' : 'share/?data='}${queryData}`
  }
  return `${baseUrl}${routerMode === 'hash' ? '#/share/' : 'share/'}${id}`
}

/**
 * @Desc: 生成嵌入url
 */
export const createEmbedUrl = (id, queryData) => {
  const baseUrl = getBaseUrl()
  if (queryData) {
    return `${baseUrl}${routerMode === 'hash' ? '#/embed/?data=' : 'embed/?data='}${queryData}`
  }
  return `${baseUrl}${routerMode === 'hash' ? '#/embed/' : 'embed/'}${id}`
}

// 获取变量的值
export const getThemeValue = (item, data, pageThemeSyncCodeTheme) => {
  let arr = defaultViewThemeConfig[item]
  let len = arr.length
  if (!data || !pageThemeSyncCodeTheme) {
    return arr[len - 1]
  }
  for (let i = 0; i < len - 1; i++) {
    let cur = arr[i]
    if (data.colors[cur] !== undefined) {
      return data.colors[cur]
    }
  }
  return arr[len - 1]
}

// 压缩数据
export const utoa = (data) => {
  // 将字符串转成Uint8Array
  const buffer = strToU8(data)
  // 以最大的压缩级别进行压缩，返回的zipped也是一个Uint8Array
  const zipped = zlibSync(buffer, { level: 9 })
  // 将Uint8Array重新转换成二进制字符串
  const binary = strFromU8(zipped, true)
  // 将二进制字符串编码为Base64编码字符串
  return btoa(binary)
}

// 解压缩数据
export const atou = (base64) => {
  // 将base64转成二进制字符串
  const binary = atob(base64)
  // 检查是否是zlib压缩的数据，zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
      // 将字符串转成Uint8Array
      const buffer = strToU8(binary, true)
      // 解压缩
      const unzipped = unzlibSync(buffer)
      // 将Uint8Array重新转换成字符串
      return strFromU8(unzipped)
  }
  // 兼容没有使用压缩的数据
  return decodeURIComponent(escape(binary))
}

/**
 * @Desc: 检测是否为移动设备
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth < 980;
}

/**
 * @Desc: 获取设备类型相关配置
 */
export const getDeviceConfig = () => {
  const isMobile = isMobileDevice();
  return {
    fontSize: isMobile ? 14 : 16,
    lineNumbers: !isMobile,
    minimap: !isMobile,
    padding: isMobile ? 8 : 16,
  };
}
