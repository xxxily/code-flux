# 预览卡住问题修复测试指南

## 已完成的修复（任务 1-3）

### ✅ 修复 1: 外部资源加载超时控制
**文件**: `src/components/Preview.vue`

**改动**:
- 为外部 CSS/JS 资源添加了 10 秒超时控制
- 添加了错误处理，资源加载失败时会在控制台显示警告
- 资源通过动态创建 DOM 元素的方式加载，而不是直接插入 HTML

**测试方法**:
1. 添加一个不存在的外部资源（例如：`https://example.com/nonexistent.css`）
2. 运行代码，观察是否在 10 秒后显示超时警告
3. 验证页面其他部分是否正常加载

### ✅ 修复 2: 优化 run 函数的超时机制
**文件**: `src/components/Preview.vue`

**改动**:
- 添加了分阶段超时控制：
  - 编译超时：8 秒
  - 总超时：15 秒
- 添加了 AbortController 支持取消运行
- 改进了错误提示信息，更明确地指出问题所在

**测试方法**:
1. 编写一个非常复杂的 Vue 组件（大量嵌套）
2. 运行代码，观察是否在 8 秒后显示"编译超时"错误
3. 在编译过程中快速点击运行按钮，验证旧的运行是否被正确取消

### ✅ 修复 3: iframe 重新渲染机制优化
**文件**: `src/components/Preview.vue`

**改动**:
- 在创建新 iframe 前，先清理旧 iframe 的加载状态
- 调用 `window.stop()` 停止旧 iframe 中的所有资源加载
- 添加了 iframe 初始化超时检测（最多等待 2 秒）
- 在组件卸载时取消正在运行的任务

**测试方法**:
1. 快速连续多次点击运行按钮
2. 观察是否每次都能正常预览，不会出现卡住
3. 在预览加载过程中切换到其他页面，验证是否正确清理

## 测试场景

### 场景 1: 外部资源超时测试
```html
<!-- HTML -->
<div id="app">
  <h1>测试外部资源超时</h1>
  <p>如果外部资源加载失败，页面应该在 10 秒内显示，并在控制台显示警告</p>
</div>
```

```css
/* CSS */
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
```

```javascript
// JavaScript
console.log('页面已加载');
```

**外部资源设置**:
- CSS: `https://nonexistent-domain-12345.com/style.css`
- JS: `https://nonexistent-domain-12345.com/script.js`

**预期结果**:
- 页面在 10 秒内显示
- 控制台显示两条警告：
  - "资源加载超时: https://nonexistent-domain-12345.com/style.css"
  - "资源加载超时: https://nonexistent-domain-12345.com/script.js"

### 场景 2: 编译超时测试
```vue
<!-- VUE 单文件 -->
<template>
  <div>
    <!-- 创建一个非常深的嵌套结构 -->
    <div v-for="i in 1000" :key="i">
      <div v-for="j in 100" :key="j">
        <span>{{ i }}-{{ j }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 创建大量响应式数据
const data = ref(Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  value: Math.random()
})))
</script>
```

**预期结果**:
- 如果编译时间超过 8 秒，显示错误："编译超时，请检查代码复杂度或语法错误"
- 页面不会一直卡住

### 场景 3: 快速切换测试
1. 编写一个简单的 HTML 页面
2. 快速连续点击运行按钮 5-10 次
3. 在运行过程中修改代码并再次运行

**预期结果**:
- 每次运行都能正常完成
- 不会出现多个 iframe 同时加载的情况
- 最终显示的是最后一次运行的结果

### 场景 4: 正常运行测试
```html
<!-- HTML -->
<div id="app">
  <h1>Hello CodeFlux!</h1>
  <button onclick="handleClick()">点击我</button>
  <p id="output"></p>
</div>
```

```css
/* CSS */
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 5px;
}
```

```javascript
// JavaScript
function handleClick() {
  document.getElementById('output').textContent = '按钮被点击了！时间：' + new Date().toLocaleTimeString();
}

console.log('页面加载完成');
```

**预期结果**:
- 页面正常显示
- 按钮点击功能正常
- 控制台显示 "页面加载完成"

## 性能对比

### 修复前的问题
- 外部资源加载失败时，页面会一直等待（无限期）
- 复杂代码编译时可能永久卡住
- 快速切换时可能出现多个 iframe 同时加载，导致资源竞争

### 修复后的改进
- 外部资源最多等待 10 秒
- 编译最多等待 8 秒，总运行时间最多 15 秒
- 旧的运行会被正确取消，避免资源竞争
- 更清晰的错误提示

## 下一步（任务 4-7）

待测试通过后，将继续修复：

4. **为编译器加载添加超时和重试** (`src/utils/load.js`)
5. **修复 Sass 编译器单例问题** (`src/utils/transform.js`)
6. **修复 Vue3 编译器问题** (`src/utils/transform.js`)
7. **添加加载状态指示器** (`src/components/Preview.vue`)

## 注意事项

1. 这些修复主要针对预览卡住的问题，不影响正常的代码执行
2. 超时时间可以根据实际情况调整（在代码中搜索 `compileTimeout` 和 `totalTimeout`）
3. 如果遇到合法的大型项目编译超时，可以适当增加超时时间
4. 建议在生产环境部署前进行充分测试

## 回滚方案

如果修复导致问题，可以通过 git 回滚：
```bash
git checkout HEAD -- src/components/Preview.vue
```

或者查看具体的修改：
```bash
git diff src/components/Preview.vue
```
