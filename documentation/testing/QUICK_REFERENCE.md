# 测试快速参考

## 🚀 常用命令

```bash
# 运行所有测试
npm run test:unit && npm run test:component && npm run test:integration

# 生成覆盖率报告
npm run test:coverage

# 监听模式（开发时）
npm run test:watch

# UI 界面
npm run test:ui

# E2E 测试（需要先安装浏览器）
npx playwright install
npm run test:e2e
```

## 📁 测试文件位置

```
tests/
├── setup.js                    # 全局测试配置
├── helpers/
│   └── factories.js           # 测试辅助函数
├── unit/                      # 单元测试
│   └── utils/
│       └── index.spec.js
├── component/                 # 组件测试
│   └── Preview.spec.js
├── integration/               # 集成测试
│   └── compile-flow.spec.js
└── e2e/                       # E2E 测试
    └── basic-workflow.spec.js
```

## ✍️ 编写测试示例

### 单元测试

```javascript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/utils/index';

describe('myFunction', () => {
  it('应该返回正确的结果', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### 组件测试

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue';
import { createStore } from 'vuex';

describe('MyComponent', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore({
      state: { /* ... */ }
    });

    wrapper = mount(MyComponent, {
      global: {
        plugins: [store]
      }
    });
  });

  it('应该正确渲染', () => {
    expect(wrapper.find('.my-class').exists()).toBe(true);
  });
});
```

### 集成测试

```javascript
import { describe, it, expect, vi } from 'vitest';
import { myIntegrationFunction } from '@/utils/index';

vi.mock('@/utils/dependency', () => ({
  dependency: vi.fn(() => 'mocked')
}));

describe('集成测试', () => {
  it('应该正确集成多个模块', async () => {
    const result = await myIntegrationFunction();
    expect(result).toBeDefined();
  });
});
```

### E2E 测试

```javascript
import { test, expect } from '@playwright/test';

test('应该完成用户流程', async ({ page }) => {
  await page.goto('/');
  await page.click('button');
  await expect(page.locator('.result')).toBeVisible();
});
```

## 🎯 测试覆盖率目标

| 类型 | 当前 | 短期目标 | 长期目标 |
|------|------|----------|----------|
| 语句 | 13.7% | 30% | 75% |
| 分支 | 3.9% | 25% | 75% |
| 函数 | 5.2% | 25% | 75% |
| 行数 | 13.7% | 30% | 75% |

## 📊 当前测试状态

- ✅ 44 个测试全部通过
- ✅ 单元测试：18 个
- ✅ 组件测试：10 个
- ✅ 集成测试：16 个
- ✅ E2E 测试：8 个

## 🔗 相关链接

- [实施指南](./IMPLEMENTATION_GUIDE.md)
- [实施总结](./IMPLEMENTATION_SUMMARY.md)
- [Vitest 文档](https://vitest.dev/)
- [Playwright 文档](https://playwright.dev/)
