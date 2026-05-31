# CodeFlux 自动化测试实施指南

## 🚀 快速开始

本指南将帮助你在 CodeFlux 项目中快速搭建自动化测试系统。

---

## 第一步：安装依赖

### 1. 安装测试框架

```bash
# 安装 Vitest 和相关依赖
npm install -D vitest @vitest/ui @vitest/coverage-c8

# 安装 Vue 测试工具
npm install -D @vue/test-utils

# 安装 Playwright（E2E 测试）
npm install -D @playwright/test

# 安装 MSW（API Mock）
npm install -D msw

# 安装 happy-dom（轻量级 DOM 环境）
npm install -D happy-dom
```

### 2. 配置 Vitest

创建 `vitest.config.js`:

```javascript
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.spec.js',
        '**/*.test.js',
        '**/mockData.js',
        'public/',
        'dist/'
      ],
      lines: 75,
      functions: 75,
      branches: 75,
      statements: 75
    },
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    testTimeout: 10000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### 3. 创建测试设置文件

创建 `tests/setup.js`:

```javascript
import { vi } from 'vitest';
import { config } from '@vue/test-utils';

// 全局 Mock
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn()
};

// Vue Test Utils 全局配置
config.global.mocks = {
  $eventEmitter: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn()
  }
};

// Mock Monaco Editor
vi.mock('monaco-editor', () => ({
  editor: {
    create: vi.fn(() => ({
      getValue: vi.fn(() => ''),
      setValue: vi.fn(),
      dispose: vi.fn(),
      onDidChangeModelContent: vi.fn()
    }))
  }
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});
```

### 4. 更新 package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run tests/unit",
    "test:component": "vitest run tests/component",
    "test:integration": "vitest run tests/integration",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:ui": "vitest --ui",
    "test:verify": "node tests/verify-fixes.js",
    "test:all": "npm run test:unit && npm run test:component && npm run test:integration && npm run test:e2e"
  }
}
```

---

## 第二步：编写第一个测试

### 示例 1: 工具函数测试

创建 `tests/unit/utils/index.spec.js`:

```javascript
import { describe, it, expect } from 'vitest';
import { parseHtmlContent, assembleHtml } from '@/utils/index';

describe('parseHtmlContent', () => {
  it('应该正确解析完整的 HTML 结构', () => {
    const html = '<!DOCTYPE html><html><head><title>Test</title></head><body><div>content</div></body></html>';
    const result = parseHtmlContent(html);
    
    expect(result.isFullHtml).toBe(true);
    expect(result.head).toContain('<title>Test</title>');
    expect(result.body).toContain('<div>content</div>');
  });

  it('应该处理不完整的 HTML', () => {
    const html = '<div>test</div>';
    const result = parseHtmlContent(html);
    
    expect(result.isFullHtml).toBe(false);
    expect(result.body).toBe('<div>test</div>');
  });

  it('应该处理空字符串', () => {
    const result = parseHtmlContent('');
    
    expect(result.isFullHtml).toBe(false);
    expect(result.body).toBe('');
  });
});

describe('assembleHtml', () => {
  it('应该正确拼接 HTML', () => {
    const head = '<title>Test</title>';
    const body = '<div>content</div>';
    const result = assembleHtml(head, body);
    
    expect(result).toContain('<!DOCTYPE html>');
    expect(result).toContain('<title>Test</title>');
    expect(result).toContain('<div>content</div>');
  });
});
```

运行测试:
```bash
npm run test:unit
```

### 示例 2: 组件测试

创建 `tests/component/Preview.spec.js`:

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Preview from '@/components/Preview.vue';
import { createStore } from 'vuex';

describe('Preview 组件', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    // 创建 mock store
    store = createStore({
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
        }
      },
      mutations: {
        setPreviewDoc: vi.fn()
      }
    });

    // 挂载组件
    wrapper = mount(Preview, {
      global: {
        plugins: [store],
        mocks: {
          $eventEmitter: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn()
          }
        }
      },
      props: {
        hide: false,
        scale: 1
      }
    });
  });

  it('应该正确渲染', () => {
    expect(wrapper.find('.previewBox').exists()).toBe(true);
    expect(wrapper.find('iframe').exists()).toBe(true);
  });

  it('应该在运行时显示加载状态', async () => {
    // 触发运行
    await wrapper.vm.run();
    
    // 验证加载状态（需要在短时间内检查）
    // 注意：由于加载很快，可能需要 mock 编译函数
  });

  it('应该有取消按钮', async () => {
    // 模拟运行
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.cancel-btn').exists()).toBe(true);
  });
});
```

运行测试:
```bash
npm run test:component
```

### 示例 3: 集成测试

创建 `tests/integration/compile-flow.spec.js`:

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { compile } from '@/utils/compile';
import { load } from '@/utils/load';

// Mock load 函数
vi.mock('@/utils/load', () => ({
  load: vi.fn(() => Promise.resolve())
}));

describe('编译流程集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该成功编译简单的 HTML/CSS/JS', async () => {
    const html = '<div id="app">Hello</div>';
    const css = 'body { margin: 0; }';
    const js = 'console.log("test");';

    const result = await compile('html', 'javascript', 'css', html, js, {}, css);

    expect(result).toBeDefined();
    expect(result.html).toContain('Hello');
    expect(result.css).toContain('margin: 0');
    expect(result.js.js).toContain('console.log');
  });

  it('应该处理编译错误', async () => {
    const invalidJs = 'const x = ;'; // 语法错误

    await expect(
      compile('html', 'javascript', 'css', '', invalidJs, {}, '')
    ).rejects.toThrow();
  });

  it('应该加载必要的编译器', async () => {
    await compile('html', 'typescript', 'scss', '', '', {}, '');

    expect(load).toHaveBeenCalledWith(expect.arrayContaining(['typescript', 'scss']));
  });
});
```

运行测试:
```bash
npm run test:integration
```

---

## 第三步：配置 E2E 测试

### 1. 初始化 Playwright

```bash
npx playwright install
```

### 2. 创建 Playwright 配置

创建 `playwright.config.js`:

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8081',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],

  webServer: {
    command: 'npm run serve',
    url: 'http://localhost:8081',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
```

### 3. 编写 E2E 测试

创建 `tests/e2e/basic-workflow.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test.describe('基础工作流程', () => {
  test('应该能够编写和运行代码', async ({ page }) => {
    // 1. 访问页面
    await page.goto('/');
    
    // 2. 等待编辑器加载
    await page.waitForSelector('.monaco-editor', { timeout: 10000 });
    
    // 3. 编写 HTML
    // 注意：Monaco Editor 需要特殊的输入方式
    await page.click('[data-editor="html"]');
    await page.keyboard.type('<h1>Hello World</h1>');
    
    // 4. 点击运行
    await page.click('button:has-text("运行")');
    
    // 5. 等待预览加载
    await page.waitForSelector('iframe');
    
    // 6. 验证预览内容
    const iframe = page.frameLocator('iframe');
    await expect(iframe.locator('h1')).toHaveText('Hello World');
  });

  test('应该显示加载状态', async ({ page }) => {
    await page.goto('/');
    
    // 点击运行
    await page.click('button:has-text("运行")');
    
    // 验证加载遮罩出现
    await expect(page.locator('.loading-overlay')).toBeVisible();
    
    // 等待加载完成
    await expect(page.locator('.loading-overlay')).toBeHidden({ timeout: 10000 });
  });

  test('应该能够取消运行', async ({ page }) => {
    await page.goto('/');
    
    // 点击运行
    await page.click('button:has-text("运行")');
    
    // 点击取消
    await page.click('.cancel-btn');
    
    // 验证加载遮罩消失
    await expect(page.locator('.loading-overlay')).toBeHidden();
  });
});
```

运行 E2E 测试:
```bash
npm run test:e2e
```

---

## 第四步：配置 CI/CD

### 创建 GitHub Actions 工作流

创建 `.github/workflows/test.yml`:

```yaml
name: Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint -- --no-fix
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run component tests
      run: npm run test:component
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Generate coverage report
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/coverage-final.json
        flags: unittests
        name: codecov-umbrella
    
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results-${{ matrix.node-version }}
        path: |
          test-results/
          playwright-report/
          coverage/

  verify-fixes:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Verify fixes
      run: npm run test:verify
```

---

## 第五步：编写测试辅助函数

### 创建测试工厂函数

创建 `tests/helpers/factories.js`:

```javascript
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
    complex: `
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body><div id="app">Content</div></body>
      </html>
    `
  },
  css: {
    simple: 'body { margin: 0; }',
    complex: `
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
    `
  },
  js: {
    simple: 'console.log("test");',
    complex: `
      function init() {
        const app = document.getElementById('app');
        app.textContent = 'Hello World';
      }
      init();
    `
  },
  vue: {
    vue3: `
      <template>
        <div>{{ message }}</div>
      </template>
      <script setup>
      import { ref } from 'vue'
      const message = ref('Hello Vue 3')
      </script>
    `
  }
};
```

### 使用测试辅助函数

```javascript
import { describe, it, expect } from 'vitest';
import { createMockEditor, createMockStore, codeSamples } from '../helpers/factories';

describe('使用辅助函数的测试', () => {
  it('应该使用 Mock 编辑器', () => {
    const editor = createMockEditor({
      getValue: () => codeSamples.html.simple
    });
    
    expect(editor.getValue()).toBe(codeSamples.html.simple);
  });

  it('应该使用 Mock Store', () => {
    const store = createMockStore({
      state: {
        editData: {
          code: {
            HTML: { content: codeSamples.html.simple }
          }
        }
      }
    });
    
    expect(store.state.editData.code.HTML.content).toBe(codeSamples.html.simple);
  });
});
```

---

## 第六步：运行和调试测试

### 运行所有测试

```bash
# 运行所有测试
npm run test:all

# 运行特定类型的测试
npm run test:unit
npm run test:component
npm run test:integration
npm run test:e2e

# 生成覆盖率报告
npm run test:coverage

# 打开覆盖率报告
open coverage/index.html
```

### 监听模式（开发时使用）

```bash
# 监听模式运行测试
npm run test:watch

# 使用 UI 界面
npm run test:ui
```

### 调试测试

#### 方法 1: 使用 VS Code

创建 `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Vitest Tests",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "test:watch"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

#### 方法 2: 使用 Chrome DevTools

```bash
# 在测试中添加 debugger
it('调试测试', () => {
  debugger; // 这里会暂停
  expect(true).toBe(true);
});

# 运行测试
node --inspect-brk ./node_modules/.bin/vitest run
```

---

## 常见问题

### Q1: 测试运行很慢怎么办？

**A**: 
1. 使用 `vi.mock()` 减少真实依赖
2. 并行运行测试
3. 只运行相关测试：`vitest run tests/unit/specific.spec.js`

### Q2: 如何测试异步代码？

**A**:
```javascript
// 使用 async/await
it('异步测试', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expected);
});

// 使用 waitFor
import { waitFor } from '../helpers/factories';

it('等待条件', async () => {
  await waitFor(() => someCondition === true);
  expect(someCondition).toBe(true);
});
```

### Q3: 如何 Mock 模块？

**A**:
```javascript
// Mock 整个模块
vi.mock('@/utils/load', () => ({
  load: vi.fn(() => Promise.resolve())
}));

// Mock 部分导出
vi.mock('@/utils/index', async () => {
  const actual = await vi.importActual('@/utils/index');
  return {
    ...actual,
    specificFunction: vi.fn()
  };
});
```

### Q4: 如何测试 Vue 组件的事件？

**A**:
```javascript
it('应该触发事件', async () => {
  const wrapper = mount(MyComponent);
  
  await wrapper.find('button').trigger('click');
  
  expect(wrapper.emitted('custom-event')).toBeTruthy();
  expect(wrapper.emitted('custom-event')[0]).toEqual([expectedPayload]);
});
```

---

## 下一步

1. ✅ 完成基础配置
2. ⏳ 编写核心功能测试
3. ⏳ 提高测试覆盖率
4. ⏳ 配置 CI/CD
5. ⏳ 团队培训

---

**文档版本**: v1.0  
**创建时间**: 2026-05-31  
**更新时间**: 2026-05-31
