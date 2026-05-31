import { base } from '@/config'
import loadjs from 'loadjs'

// 记录加载状态
const preprocessorLoaded = {
  html: true,
  javascript: true,
  css: true
}

// 需要加载多个文件
const resources = {
  postcss: ['postcss-cssnext', 'postcss'],
  scss: ['sass']
}

export const load = (preprocessorList, retryCount = 2) => {
  // 过滤出没有加载过的资源
  let notLoaded = preprocessorList.filter(item => {
    return !preprocessorLoaded[item]
  })
  if (notLoaded.length <= 0) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const attemptLoad = (attempt = 0) => {
      // 生成加载资源的路径
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
            console.error('编译器加载失败，已达到最大重试次数', err)
            reject(err)
          }
        })
    }

    attemptLoad()
  })
}
