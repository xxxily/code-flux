# Code-Flux 项目开发规范

## 测试规范

### 核心原则

**渐进式测试覆盖**：不追求短期内达到高覆盖率，而是在每次代码改动时同步完善测试，逐步提升项目质量。

### 强制要求

#### 1. 代码改动必须包含测试

每次进行以下类型的代码改动时，**必须**同步编写或更新相关测试：

- ✅ **新增功能**：必须为新功能编写测试
- ✅ **Bug 修复**：必须添加回归测试，确保 bug 不再复现
- ✅ **重构代码**：必须确保现有测试通过，必要时更新测试
- ✅ **修改 API**：必须更新相关的集成测试
- ✅ **优化性能**：必须添加性能基准测试

#### 2. 测试优先级

按以下优先级编写测试：

**高优先级**（必须测试）：
- 核心业务逻辑
- 数据处理和转换函数
- API 接口和公共方法
- 错误处理和边界情况
- 安全相关功能

**中优先级**（建议测试）：
- UI 组件的关键交互
- 状态管理逻辑
- 工具函数和辅助方法

**低优先级**（可选测试）：
- 纯展示型组件
- 简单的 getter/setter
- 第三方库的封装（已有测试的库）

#### 3. 测试质量标准

测试代码应该：

- ✅ **有意义**：测试真实的业务场景，而不是为了覆盖率而测试
- ✅ **可读性强**：测试名称清晰描述测试内容
- ✅ **独立性**：每个测试独立运行，不依赖其他测试
- ✅ **可维护**：测试代码简洁，易于理解和修改
- ✅ **快速执行**：单元测试应该在毫秒级完成

#### 4. 不建议的测试实践

❌ **避免以下情况**：

- 为了覆盖率而编写无意义的测试
- 测试实现细节而非行为
- 过度 Mock 导致测试脱离实际
- 测试第三方库的功能
- 编写脆弱的测试（代码小改动就失败）

### 测试类型指南

#### 单元测试 (Unit Tests)

**适用场景**：
- 纯函数和工具方法
- 业务逻辑函数
- 数据转换和验证

**示例**：
```javascript
// ✅ 好的单元测试
describe('parseHtmlContent', () => {
  it('应该正确解析 HTML 的 head 和 body', () => {
    const html = '<html><head><title>Test</title></head><body><div>Content</div></body></html>';
    const result = parseHtmlContent(html);
    
    expect(result.head).toContain('<title>Test</title>');
    expect(result.body).toContain('<div>Content</div>');
  });
});
```

#### 组件测试 (Component Tests)

**适用场景**：
- Vue 组件的关键功能
- 用户交互行为
- 组件状态变化

**示例**：
```javascript
// ✅ 好的组件测试
describe('Preview 组件', () => {
  it('应该在点击运行按钮后编译代码', async () => {
    const wrapper = mount(Preview, { /* ... */ });
    
    await wrapper.find('.run-button').trigger('click');
    
    expect(compile).toHaveBeenCalled();
  });
});
```

#### 集成测试 (Integration Tests)

**适用场景**：
- 多个模块协作的流程
- 完整的业务场景
- API 调用链路

**示例**：
```javascript
// ✅ 好的集成测试
describe('编译流程', () => {
  it('应该完整编译 HTML + CSS + JS', async () => {
    const result = await compile('html', 'javascript', 'css', 
      '<div>test</div>', 'console.log(1);', {}, 'body{}');
    
    expect(result.html).toBeDefined();
    expect(result.js).toBeDefined();
    expect(result.css).toBeDefined();
  });
});
```

### 开发工作流

#### 新增功能

```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 编写功能代码
# 3. 编写测试代码
# 4. 运行测试确保通过
npm run test:unit
npm run test:component

# 5. 检查覆盖率（可选）
npm run test:coverage

# 6. 提交代码（测试和功能代码一起提交）
git add .
git commit -m "feat: 添加新功能及测试"
```

#### 修复 Bug

```bash
# 1. 创建 bug 修复分支
git checkout -b fix/bug-description

# 2. 编写失败的测试（重现 bug）
# 3. 修复 bug 使测试通过
# 4. 运行所有测试确保没有回归
npm test

# 5. 提交代码
git commit -m "fix: 修复 XX 问题并添加回归测试"
```

#### 重构代码

```bash
# 1. 确保现有测试通过
npm test

# 2. 进行重构
# 3. 运行测试确保行为不变
npm test

# 4. 如果测试失败，调整测试或代码
# 5. 提交代码
git commit -m "refactor: 重构 XX 模块"
```

### 测试命令

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行组件测试
npm run test:component

# 运行集成测试
npm run test:integration

# 生成覆盖率报告
npm run test:coverage

# 监听模式（开发时使用）
npm run test:watch
```

### 测试文件组织

```
tests/
├── unit/              # 单元测试
│   ├── utils/         # 工具函数测试
│   ├── config/        # 配置测试
│   └── ...
├── component/         # 组件测试
│   ├── Preview.spec.js
│   └── ...
├── integration/       # 集成测试
│   ├── compile-flow.spec.js
│   └── ...
└── e2e/              # E2E 测试（未来）
```

### 持续改进

#### 定期 Review

- 每月 Review 测试覆盖率趋势
- 识别测试薄弱环节
- 优先补充核心功能的测试

#### 测试债务管理

- 在 TODO 中记录需要补充的测试
- 在重构时优先补充测试
- 不要让测试债务累积

#### 团队协作

- Code Review 时检查测试质量
- 分享测试最佳实践
- 鼓励编写可测试的代码

### 参考文档

- [测试实施指南](./documentation/testing/IMPLEMENTATION_GUIDE.md)
- [测试策略](./documentation/testing/TESTING_STRATEGY.md)
- [Vitest 文档](https://vitest.dev/)
- [@vue/test-utils 文档](https://test-utils.vuejs.org/)

---

## 其他开发规范

### 代码风格

- 遵循 ESLint 配置
- 使用 Prettier 格式化代码
- 保持代码简洁和可读性

### Git 提交规范

使用 Conventional Commits 格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型**：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

**示例**：
```
feat(preview): 添加代码预览功能

- 实现实时预览
- 支持多种语言
- 添加错误处理

Closes #123
```

### 代码审查清单

在提交 PR 前，确保：

- [ ] 代码符合项目规范
- [ ] 添加了必要的测试
- [ ] 所有测试通过
- [ ] 更新了相关文档
- [ ] 没有遗留的 console.log 或调试代码
- [ ] 提交信息清晰明确

---

**记住**：好的测试是项目质量的保障，但不要为了测试而测试。每个测试都应该有明确的目的，验证真实的业务场景。
