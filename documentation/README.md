# CodeFlux 项目文档

本目录包含 CodeFlux 项目的所有技术文档。

> **注意**: 本目录位于项目根目录，不会被 `npm run build` 覆盖。`docs/` 目录是构建输出目录，会被完全覆盖。

---

## 📚 文档目录

### 1. [修复文档](./fixes/)
预览卡住问题的分析、修复和测试文档

- [PREVIEW_ISSUES_ANALYSIS.md](./fixes/PREVIEW_ISSUES_ANALYSIS.md) - 完整的问题分析
- [FIXES_SUMMARY.md](./fixes/FIXES_SUMMARY.md) - 修复总结（任务1-3）
- [FIXES_COMPLETE.md](./fixes/FIXES_COMPLETE.md) - 完整修复总结（任务1-7）
- [TEST_FIXES.md](./fixes/TEST_FIXES.md) - 测试指南
- [test-preview-fixes.html](./fixes/test-preview-fixes.html) - 可视化测试页面
- [README.md](./fixes/README.md) - 修复文档导航

### 2. [测试文档](./testing/)
自动化测试系统的规划和实施指南

- [TESTING_STRATEGY.md](./testing/TESTING_STRATEGY.md) - 完整的测试策略规划
- [IMPLEMENTATION_GUIDE.md](./testing/IMPLEMENTATION_GUIDE.md) - 实施指南
- [README.md](./testing/README.md) - 测试文档导航

### 3. [项目完成报告](./PROJECT_COMPLETION_REPORT.md)
整个项目的完成总结报告

---

## 🚀 快速导航

### 我想...

- **了解修复了什么问题** → [FIXES_COMPLETE.md](./fixes/FIXES_COMPLETE.md)
- **进行功能测试** → [test-preview-fixes.html](./fixes/test-preview-fixes.html)
- **了解测试规划** → [TESTING_STRATEGY.md](./testing/TESTING_STRATEGY.md)
- **开始编写测试** → [IMPLEMENTATION_GUIDE.md](./testing/IMPLEMENTATION_GUIDE.md)
- **查看项目总结** → [PROJECT_COMPLETION_REPORT.md](./PROJECT_COMPLETION_REPORT.md)

---

## 📊 项目状态

### 已完成
- ✅ 7个修复任务全部完成
- ✅ 31个自动化验证测试，100%通过
- ✅ 88KB 详细文档
- ✅ 完整的测试系统规划

### 测试结果
```
总计: 31 个测试
✅ 通过: 31
❌ 失败: 0
成功率: 100.00%
```

---

## 🛠️ 相关目录

- **源代码**: `src/`
- **测试脚本**: `tests/`
- **构建输出**: `docs/` (会被 build 覆盖，不要放文档)
- **公共资源**: `public/`

---

## 📝 文档维护

### 添加新文档
1. 在 `documentation/` 下创建相应的子目录
2. 编写 Markdown 文档
3. 更新本 README 的目录

### 注意事项
- ⚠️ **不要**在 `docs/` 目录下放置文档，它会被构建覆盖
- ✅ 所有项目文档都应该放在 `documentation/` 目录
- ✅ 需要在构建后保留的文件（如 CNAME）应放在 `public/` 目录

---

**最后更新**: 2026-05-31  
**维护者**: CodeFlux Team
