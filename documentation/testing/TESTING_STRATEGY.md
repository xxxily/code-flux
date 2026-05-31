# CodeFlux 自动化测试系统规划

## 📋 目录

1. [现状分析](#现状分析)
2. [测试架构设计](#测试架构设计)
3. [实施路线图](#实施路线图)
4. [技术选型](#技术选型)
5. [测试覆盖策略](#测试覆盖策略)
6. [CI/CD 集成](#cicd-集成)
7. [最佳实践](#最佳实践)

---

## 现状分析

### 当前状态
- ✅ 已有基础的代码验证测试（verify-fixes.js）
- ❌ 缺少单元测试
- ❌ 缺少集成测试
- ❌ 缺少 E2E 测试
- ❌ 缺少性能测试
- ❌ 缺少 CI/CD 集成

### 项目特点
- **前端框架**: Vue 3 + Composition API
- **构建工具**: Vite
- **代码编辑器**: Monaco Editor
- **核心功能**: 
  - 代码编辑
  - 实时预览
  - 多语言编译（HTML/CSS/JS/Vue/TypeScript/Sass等）
  - 外部资源加载
  - 代码分享

---

## 测试架构设计

### 测试金字塔

```
           /\
          /  \
         / E2E \          ← 少量，覆盖关键用户流程
        /--------\
       /          \
      / Integration \     ← 中等数量，测试模块间交互
     /--------------\
    /                \
   /   Unit Tests     \   ← 大量，测试单个函数/组件
  /--------------------\
```

### 测试层级

#### 1. 单元测试（Unit Tests）
**目标**: 测试单个函数、工具类、纯逻辑

**覆盖范围**:
- `src/utils/` - 工具函数
- `src/config/` - 配置文件
- 组件的纯逻辑部分

**工具**: Vitest + Vue Test Utils

**示例**:
```javascript
// tests/unit/utils/index.spec.js
describe('parseHtmlContent', () => {
  it('应该正确解析完整的 HTML 结构', () => {
    const html = '<!DOCTYPE html><html><head></head><body>test</body></html>';
    const result = parseHtmlContent(html);
    expect(result.isFullHtml).toBe(true);
    expect(result.body).toBe('test');
  });

  it('应该处理不完整的 HTML', () => {
    const html = '<div>test</div>';
    const result = parseHtmlContent(html);
    expect(result.isFullHtml).toBe(false);
    expect(result.body).toBe('<div>test</div>');
  });
});
```

#### 2. 组件测试（Component Tests）
**目标**: 测试 Vue 组件的渲染和交互

**覆盖范围**:
- `src/components/` - 所有组件
- 组件的 props、events、slots
- 组件的生命周期

**工具**: Vitest + Vue Test Utils + @vue/test-utils

**示例**:
```javascript
// tests/component/Preview.spec.js
describe('Preview 组件', () => {
  it('应该显示加载状态', async () => {
    const wrapper = mount(Preview);
    
    // 触发运行
    await wrapper.vm.run();
    
    // 验证加载状态
    expect(wrapper.find('.loading-overlay').exists()).toBe(true);
    expect(wrapper.find('.loading-text').text()).toContain('正在');
  });

  it('应该在超时后显示错误', async () => {
    const wrapper = mount(Preview);
    
    // 模拟超时
    vi.useFakeTimers();
    wrapper.vm.run();
    vi.advanceTimersByTime(20000);
    
    // 验证错误提示
    expect(wrapper.emitted('errorRun')).toBeTruthy();
  });
});
```

#### 3. 集成测试（Integration Tests）
**目标**: 测试多个模块间的交互

**覆盖范围**:
- 编辑器 + 预览的联动
- 编译器加载 + 代码编译
- 状态管理 + 组件更新

**工具**: Vitest + MSW (Mock Service Worker)

**示例**:
```javascript
// tests/integration/editor-preview.spec.js
describe('编辑器与预览联动', () => {
  it('修改代码后应该更新预览', async () => {
    const { editor, preview } = setupEditorPreview();
    
    // 修改代码
    editor.setValue('console.log("test")');
    
    // 触发运行
    await preview.run();
    
    // 验证预览更新
    const iframe = preview.getIframe();
    expect(iframe.contentWindow.console.log).toHaveBeenCalledWith('test');
  });
});
```

#### 4. E2E 测试（End-to-End Tests）
**目标**: 测试完整的用户流程

**覆盖范围**:
- 用户打开页面 → 编写代码 → 运行预览 → 保存分享
- 加载已保存的代码 → 修改 → 重新运行
- 错误处理流程

**工具**: Playwright 或 Cypress

**示例**:
```javascript
// tests/e2e/basic-workflow.spec.js
test('完整的代码编写和预览流程', async ({ page }) => {
  // 1. 打开页面
  await page.goto('http://localhost:8081');
  
  // 2. 编写 HTML
  await page.click('[data-editor="html"]');
  await page.keyboard.type('<h1>Hello World</h1>');
  
  // 3. 编写 CSS
  await page.click('[data-editor="css"]');
  await page.keyboard.type('h1 { color: red; }');
  
  // 4. 点击运行
  await page.click('[data-test="run-button"]');
  
  // 5. 验证预览
  const iframe = page.frameLocator('iframe');
  await expect(iframe.locator('h1')).toHaveText('Hello World');
  await expect(iframe.locator('h1')).toHaveCSS('color', 'rgb(255, 0, 0)');
});
```

#### 5. 性能测试（Performance Tests）
**目标**: 测试性能指标

**覆盖范围**:
- 编译速度
- 预览加载时间
- 内存使用
- 大文件处理

**工具**: Lighthouse CI + Custom Scripts

**示例**:
```javascript
// tests/performance/compile-speed.spec.js
describe('编译性能', () => {
  it('小型代码应该在 1 秒内编译完成', async () => {
    const code = generateSmallCode();
    const startTime = Date.now();
    
    await compile(code);
    
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(1000);
  });

  it('大型代码应该在 8 秒内编译完成', async () => {
    const code = generateLargeCode();
    const startTime = Date.now();
    
    await compile(code);
    
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(8000);
  });
});
```

---

## 实施路线图

### 阶段 1: 基础设施搭建（1-2 周）

#### Week 1: 测试框架配置
- [ ] 安装和配置 Vitest
- [ ] 配置 Vue Test Utils
- [ ] 设置测试覆盖率工具
- [ ] 创建测试目录结构
- [ ] 编写测试模板和工具函数

**目录结构**:
```
tests/
├── unit/              # 单元测试
│   ├── utils/
│   ├── config/
│   └── helpers/
├── component/         # 组件测试
│   ├── Editor.spec.js
│   ├── Preview.spec.js
│   └── Console.spec.js
├── integration/       # 集成测试
│   ├── editor-preview.spec.js
│   └── compile-flow.spec.js
├── e2e/              # E2E 测试
│   ├── basic-workflow.spec.js
│   └── error-handling.spec.js
├── performance/      # 性能测试
│   └── compile-speed.spec.js
├── fixtures/         # 测试数据
│   ├── code-samples/
│   └── mock-data/
└── helpers/          # 测试辅助函数
    ├── setup.js
    ├── mocks.js
    └── utils.js
```

#### Week 2: 核心工具测试
- [ ] 编写 `utils/index.js` 的单元测试
- [ ] 编写 `utils/transform.js` 的单元测试
- [ ] 编写 `utils/load.js` 的单元测试
- [ ] 达到 80% 工具函数覆盖率

### 阶段 2: 组件测试（2-3 周）

#### Week 3-4: 核心组件测试
- [ ] Preview 组件测试（重点）
- [ ] Editor 组件测试
- [ ] Console 组件测试
- [ ] Drag/DragItem 组件测试

#### Week 5: 布局组件测试
- [ ] 各种 Layout 组件测试
- [ ] 组件交互测试
- [ ] 达到 70% 组件覆盖率

### 阶段 3: 集成测试（1-2 周）

#### Week 6: 核心流程测试
- [ ] 编辑器-预览联动测试
- [ ] 编译流程测试
- [ ] 资源加载测试
- [ ] 错误处理测试

#### Week 7: 高级功能测试
- [ ] 代码分享功能测试
- [ ] 主题切换测试
- [ ] 布局切换测试

### 阶段 4: E2E 测试（1-2 周）

#### Week 8: 基础流程
- [ ] 配置 Playwright
- [ ] 编写基础用户流程测试
- [ ] 编写错误场景测试

#### Week 9: 高级场景
- [ ] 多浏览器测试
- [ ] 移动端测试
- [ ] 性能测试

### 阶段 5: CI/CD 集成（1 周）

#### Week 10: 自动化流程
- [ ] 配置 GitHub Actions
- [ ] 设置测试自动运行
- [ ] 配置覆盖率报告
- [ ] 设置测试失败通知

---

## 技术选型

### 测试框架对比

| 框架 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Vitest** | 快速、与 Vite 集成好、API 兼容 Jest | 相对较新 | ⭐⭐⭐⭐⭐ |
| Jest | 成熟、生态丰富 | 配置复杂、速度慢 | ⭐⭐⭐⭐ |
| Mocha | 灵活、轻量 | 需要额外配置断言库 | ⭐⭐⭐ |

### E2E 框架对比

| 框架 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Playwright** | 快速、多浏览器、现代化 API | 学习曲线 | ⭐⭐⭐⭐⭐ |
| Cypress | 易用、调试友好 | 只支持 Chrome 系 | ⭐⭐⭐⭐ |
| Puppeteer | 轻量、Chrome 官方 | 只支持 Chrome | ⭐⭐⭐ |

### 推荐技术栈

```json
{
  "单元测试": "Vitest + Vue Test Utils",
  "组件测试": "Vitest + @vue/test-utils",
  "集成测试": "Vitest + MSW",
  "E2E测试": "Playwright",
  "覆盖率": "c8 (Vitest 内置)",
  "Mock": "vi (Vitest 内置) + MSW",
  "CI/CD": "GitHub Actions"
}
```

---

## 测试覆盖策略

### 覆盖率目标

| 类型 | 目标覆盖率 | 优先级 |
|------|-----------|--------|
| 工具函数 | 90%+ | 高 |
| 核心组件 | 80%+ | 高 |
| 布局组件 | 70%+ | 中 |
| 配置文件 | 60%+ | 低 |
| **总体** | **75%+** | - |

### 优先级排序

#### P0 - 必须测试（核心功能）
1. ✅ Preview 组件（已有基础测试）
2. 编译流程（compile, compileVue）
3. 资源加载（load.js）
4. 代码转换（transform.js）
5. HTML 拼接（assembleHtml）

#### P1 - 应该测试（重要功能）
1. Editor 组件
2. Console 组件
3. 代码解析（parseHtmlContent）
4. 错误处理
5. 状态管理（Vuex store）

#### P2 - 可以测试（辅助功能）
1. 布局组件
2. 工具函数（type, generateUUID等）
3. 主题系统
4. 快捷键系统

### 测试场景矩阵

| 功能 | 单元测试 | 组件测试 | 集成测试 | E2E测试 |
|------|---------|---------|---------|---------|
| 代码编译 | ✅ | - | ✅ | ✅ |
| 预览显示 | - | ✅ | ✅ | ✅ |
| 错误处理 | ✅ | ✅ | ✅ | ✅ |
| 资源加载 | ✅ | - | ✅ | ✅ |
| 代码分享 | ✅ | - | ✅ | ✅ |
| 主题切换 | - | ✅ | - | ✅ |

---

## CI/CD 集成

### GitHub Actions 配置

```yaml
# .github/workflows/test.yml
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
    - uses: actions/checkout@v3
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
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
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: test-results/

  lint:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Check types
      run: npm run type-check
```

### package.json 脚本

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
    "test:verify": "node tests/verify-fixes.js"
  }
}
```

---

## 最佳实践

### 1. 测试命名规范

```javascript
// ✅ 好的命名
describe('Preview 组件', () => {
  describe('run 方法', () => {
    it('应该在编译超时后显示错误', () => {});
    it('应该在取消时停止运行', () => {});
  });
});

// ❌ 不好的命名
describe('test', () => {
  it('works', () => {});
});
```

### 2. AAA 模式（Arrange-Act-Assert）

```javascript
it('应该正确编译 Vue 组件', async () => {
  // Arrange - 准备测试数据
  const vueCode = '<template><div>test</div></template>';
  const importMap = {};
  
  // Act - 执行操作
  const result = await compileVue('vue3', vueCode, importMap);
  
  // Assert - 验证结果
  expect(result.html).toContain('<div id="app"></div>');
  expect(result.js.useImport).toBe(false);
});
```

### 3. 使用测试工厂函数

```javascript
// tests/helpers/factories.js
export function createMockEditor(overrides = {}) {
  return {
    getValue: vi.fn(() => ''),
    setValue: vi.fn(),
    getModel: vi.fn(),
    ...overrides
  };
}

export function createMockPreviewData(overrides = {}) {
  return {
    code: {
      HTML: { content: '', language: 'html' },
      CSS: { content: '', language: 'css' },
      JS: { content: '', language: 'javascript' }
    },
    config: {
      layout: 'default',
      openAlmightyConsole: false
    },
    ...overrides
  };
}
```

### 4. 隔离测试

```javascript
// ✅ 好的做法 - 每个测试独立
describe('compile', () => {
  beforeEach(() => {
    // 每个测试前重置状态
    vi.clearAllMocks();
  });

  it('测试 1', () => {
    // 独立的测试
  });

  it('测试 2', () => {
    // 不依赖测试 1
  });
});

// ❌ 不好的做法 - 测试间有依赖
let sharedState;
it('测试 1', () => {
  sharedState = doSomething();
});
it('测试 2', () => {
  // 依赖测试 1 的结果
  expect(sharedState).toBe(something);
});
```

### 5. Mock 外部依赖

```javascript
// tests/unit/utils/load.spec.js
import { vi } from 'vitest';
import { load } from '@/utils/load';

// Mock loadjs
vi.mock('loadjs', () => ({
  default: vi.fn((files, options) => {
    return options.returnPromise 
      ? Promise.resolve() 
      : undefined;
  })
}));

describe('load', () => {
  it('应该加载编译器', async () => {
    await load(['babel']);
    expect(loadjs).toHaveBeenCalled();
  });
});
```

### 6. 测试异步代码

```javascript
// ✅ 使用 async/await
it('应该异步编译代码', async () => {
  const result = await compile('html', 'js', 'css', ...);
  expect(result).toBeDefined();
});

// ✅ 使用 done 回调（不推荐，但有时需要）
it('应该触发回调', (done) => {
  someAsyncFunction((result) => {
    expect(result).toBe(true);
    done();
  });
});
```

### 7. 快照测试（谨慎使用）

```javascript
// 适合用于测试组件渲染
it('应该正确渲染', () => {
  const wrapper = mount(MyComponent);
  expect(wrapper.html()).toMatchSnapshot();
});

// 不适合用于测试动态内容
it('不要这样做', () => {
  const result = { timestamp: Date.now() };
  expect(result).toMatchSnapshot(); // ❌ 每次都会失败
});
```

---

## 测试数据管理

### Fixtures 组织

```
tests/fixtures/
├── code-samples/
│   ├── html/
│   │   ├── simple.html
│   │   └── complex.html
│   ├── vue/
│   │   ├── vue2-component.vue
│   │   └── vue3-setup.vue
│   └── typescript/
│       └── sample.ts
├── mock-data/
│   ├── editor-state.json
│   └── preview-config.json
└── index.js  # 导出所有 fixtures
```

### 使用示例

```javascript
// tests/fixtures/index.js
import fs from 'fs';
import path from 'path';

export function loadFixture(category, filename) {
  const filePath = path.join(__dirname, category, filename);
  return fs.readFileSync(filePath, 'utf-8');
}

export const fixtures = {
  html: {
    simple: loadFixture('code-samples/html', 'simple.html'),
    complex: loadFixture('code-samples/html', 'complex.html')
  },
  vue: {
    vue2: loadFixture('code-samples/vue', 'vue2-component.vue'),
    vue3: loadFixture('code-samples/vue', 'vue3-setup.vue')
  }
};

// 在测试中使用
import { fixtures } from '../fixtures';

it('应该编译简单的 HTML', async () => {
  const result = await compile('html', 'javascript', 'css', 
    fixtures.html.simple, '', '');
  expect(result.html).toBeDefined();
});
```

---

## 持续改进

### 测试指标监控

1. **覆盖率趋势**
   - 每次 PR 检查覆盖率变化
   - 设置最低覆盖率阈值
   - 定期审查未覆盖的代码

2. **测试执行时间**
   - 监控测试套件执行时间
   - 优化慢速测试
   - 并行执行测试

3. **测试稳定性**
   - 跟踪 flaky tests（不稳定的测试）
   - 修复或隔离不稳定的测试
   - 定期审查测试质量

### 代码审查清单

- [ ] 新功能是否有对应的测试？
- [ ] 测试是否覆盖了边界情况？
- [ ] 测试是否独立且可重复？
- [ ] 测试命名是否清晰？
- [ ] 是否有不必要的 mock？
- [ ] 测试是否运行快速？

---

## 总结

### 关键收益

1. **提高代码质量** - 及早发现 bug
2. **加快开发速度** - 自动化验证，减少手动测试
3. **增强信心** - 重构和修改时有安全网
4. **改善文档** - 测试即文档
5. **促进设计** - TDD 驱动更好的设计

### 成功指标

- ✅ 测试覆盖率达到 75%+
- ✅ 所有 PR 必须通过测试
- ✅ 测试执行时间 < 5 分钟
- ✅ 零 flaky tests
- ✅ 每个新功能都有测试

### 下一步行动

1. **立即开始**: 配置 Vitest 和基础测试框架
2. **优先级**: 先测试核心功能（Preview、compile）
3. **迭代改进**: 逐步提高覆盖率
4. **团队培训**: 确保团队理解测试重要性
5. **持续优化**: 定期审查和改进测试策略

---

**文档版本**: v1.0  
**创建时间**: 2026-05-31  
**维护者**: Claude Opus 4.7
