import { vi } from 'vitest';

/**
 * 创建 Mock 编辑器
 */
export function createMockEditor(overrides = {}) {
  return {
    getValue: vi.fn(() => ''),
    setValue: vi.fn(),
    getModel: vi.fn(() => ({
      getValue: vi.fn(() => ''),
      setValue: vi.fn()
    })),
    dispose: vi.fn(),
    onDidChangeModelContent: vi.fn(),
    updateOptions: vi.fn(),
    layout: vi.fn(),
    focus: vi.fn(),
    ...overrides
  };
}

/**
 * 创建 Mock Store
 */
export function createMockStore(overrides = {}) {
  return {
    state: {
      editData: {
        code: {
          HTML: { content: '', language: 'html' },
          CSS: { content: '', language: 'css' },
          JS: { content: '', language: 'javascript' }
        },
        config: {
          layout: 'default',
          openAlmightyConsole: false,
          keepPreviousLogs: false
        }
      },
      ...overrides.state
    },
    commit: vi.fn(),
    dispatch: vi.fn(),
    getters: {},
    ...overrides
  };
}

/**
 * 创建 Mock EventEmitter
 */
export function createMockEventEmitter() {
  const listeners = new Map();

  return {
    on: vi.fn((event, handler) => {
      if (!listeners.has(event)) {
        listeners.set(event, []);
      }
      listeners.get(event).push(handler);
    }),
    off: vi.fn((event, handler) => {
      if (listeners.has(event)) {
        const handlers = listeners.get(event);
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    }),
    emit: vi.fn((event, ...args) => {
      if (listeners.has(event)) {
        listeners.get(event).forEach(handler => handler(...args));
      }
    }),
    _listeners: listeners // 用于测试验证
  };
}

/**
 * 等待异步操作
 */
export function waitFor(condition, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(check, 50);
      }
    };

    check();
  });
}

/**
 * 创建测试用的代码样本
 */
export const codeSamples = {
  html: {
    simple: '<div>Hello World</div>',
    complex: `<!DOCTYPE html>
<html>
  <head><title>Test</title></head>
  <body><div id="app">Content</div></body>
</html>`,
    withScript: '<div id="app"></div><script>console.log("test")</script>'
  },
  css: {
    simple: 'body { margin: 0; }',
    complex: `body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}`
  },
  js: {
    simple: 'console.log("test");',
    complex: `function init() {
  const app = document.getElementById('app');
  app.textContent = 'Hello World';
}
init();`,
    withError: 'const x = ;' // 语法错误
  },
  vue: {
    vue3: `<template>
  <div>{{ message }}</div>
</template>
<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue 3')
</script>`
  }
};
