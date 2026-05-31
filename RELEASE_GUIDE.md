# 发布指引

本文档规范了 Code-Flux 项目的版本发布流程，确保每次发布都遵循统一的标准。

## 版本号规范

遵循语义化版本（Semantic Versioning）：`主版本号.次版本号.修订号`

- **主版本号（Major）**：不兼容的 API 修改
- **次版本号（Minor）**：向下兼容的功能性新增
- **修订号（Patch）**：向下兼容的问题修正

## 发布前检查清单

在开始发布流程前，请确认以下事项：

- [ ] 所有代码已提交到 Git
- [ ] 所有测试通过（`npm test`）
- [ ] 代码通过 Lint 检查（`npm run lint`）
- [ ] 功能已在本地充分测试
- [ ] 已更新相关文档

## 发布流程

### 1. 更新版本号

编辑 `package.json`，更新 `version` 字段：

```bash
# 手动编辑 package.json
# 或使用 npm version 命令（会自动创建 git commit 和 tag）
npm version patch  # 修订号 +1
npm version minor  # 次版本号 +1
npm version major  # 主版本号 +1
```

**注意**：如果使用 `npm version` 命令，它会自动创建 commit 和 tag，可以跳过步骤 4 和 5。

### 2. 更新 CHANGELOG.md

在 `CHANGELOG.md` 文件顶部添加新版本的变更记录：

```markdown
## [版本号] - YYYY-MM-DD

### Added（新增）
- 新增的功能描述

### Changed（变更）
- 变更的功能描述

### Fixed（修复）
- 修复的 Bug 描述

### Removed（移除）
- 移除的功能描述

### Security（安全）
- 安全相关的修复
```

**分类说明**：
- **Added**：新功能
- **Changed**：对现有功能的变更
- **Deprecated**：即将移除的功能
- **Removed**：已移除的功能
- **Fixed**：Bug 修复
- **Security**：安全相关的修复

### 3. 运行测试和 Lint

确保所有测试通过，代码符合规范：

```bash
# 运行测试
npm test

# 运行 Lint 检查
npm run lint

# 如果有 Lint 错误，自动修复
npm run lint -- --fix
```

### 4. 提交变更

提交版本号和 CHANGELOG 的变更：

```bash
git add package.json CHANGELOG.md
git commit -m "chore: 发布 v版本号 版本"
```

**提交信息格式**：
- 使用 `chore:` 前缀表示构建/发布相关的变更
- 简洁描述本次发布的主要内容

### 5. 创建 Git Tag

为新版本创建 Git 标签：

```bash
git tag -a v版本号 -m "版本号 版本发布说明"

# 示例
git tag -a v1.2.4 -m "v1.2.4 - 修复 Lint 错误，优化代码质量"
```

**Tag 命名规范**：
- 格式：`v主版本号.次版本号.修订号`
- 示例：`v1.2.4`、`v2.0.0`

**Tag 说明信息**：
- 简要描述本次发布的主要内容
- 可以包含关键的变更点

### 6. 推送到远程仓库

推送代码和标签到远程仓库：

```bash
# 推送代码
git push origin main

# 推送标签
git push origin v版本号

# 或一次性推送所有标签
git push origin --tags
```

### 7. 创建 GitHub Release

在 GitHub 上创建正式的 Release：

1. 访问项目的 GitHub 页面
2. 点击 "Releases" 标签
3. 点击 "Draft a new release" 按钮
4. 选择刚才创建的 tag（v版本号）
5. 填写 Release 标题：`v版本号 - 简短描述`
6. 在描述框中粘贴 CHANGELOG.md 中对应版本的内容
7. 如果是预发布版本，勾选 "This is a pre-release"
8. 点击 "Publish release" 发布

**Release 描述建议**：
- 从 CHANGELOG.md 复制对应版本的内容
- 突出显示重要的变更
- 如有破坏性变更，需要特别说明
- 可以添加升级指南或注意事项

### 8. 构建和部署（可选）

如果项目需要构建和部署：

```bash
# 构建生产版本
npm run build

# 部署到服务器（根据实际情况）
# 例如：上传到 CDN、部署到服务器等
```

## 快速发布命令

为了简化发布流程，可以使用以下命令快速完成发布：

```bash
# 1. 确保所有测试通过
npm test && npm run lint

# 2. 更新版本号（会自动创建 commit 和 tag）
npm version patch -m "chore: 发布 v%s 版本"

# 3. 推送到远程
git push origin main --tags

# 4. 手动在 GitHub 上创建 Release
```

## 版本发布示例

### 示例 1：修复 Bug（Patch 版本）

```bash
# 1. 修改 package.json 版本号：1.2.3 -> 1.2.4
# 2. 更新 CHANGELOG.md
# 3. 运行测试
npm test && npm run lint

# 4. 提交变更
git add package.json CHANGELOG.md
git commit -m "chore: 发布 v1.2.4 版本"

# 5. 创建标签
git tag -a v1.2.4 -m "v1.2.4 - 修复 Lint 错误，优化代码质量"

# 6. 推送
git push origin main
git push origin v1.2.4

# 7. 在 GitHub 创建 Release
```

### 示例 2：新增功能（Minor 版本）

```bash
# 1. 修改 package.json 版本号：1.2.4 -> 1.3.0
# 2. 更新 CHANGELOG.md
# 3. 运行测试
npm test && npm run lint

# 4. 提交变更
git add package.json CHANGELOG.md
git commit -m "chore: 发布 v1.3.0 版本"

# 5. 创建标签
git tag -a v1.3.0 -m "v1.3.0 - 新增代码分享功能"

# 6. 推送
git push origin main
git push origin v1.3.0

# 7. 在 GitHub 创建 Release
```

## 回滚版本

如果发现发布的版本有严重问题，需要回滚：

```bash
# 1. 删除远程标签
git push origin :refs/tags/v版本号

# 2. 删除本地标签
git tag -d v版本号

# 3. 回滚代码（如果已经合并到主分支）
git revert HEAD

# 4. 在 GitHub 上删除 Release
# 访问 GitHub Release 页面，点击对应版本的 "Delete" 按钮
```

## 注意事项

1. **版本号一旦发布，不要修改**：如果发现问题，应该发布新版本修复
2. **保持 CHANGELOG.md 更新**：每次发布都要更新变更日志
3. **Tag 和 Release 保持一致**：GitHub Release 应该基于 Git Tag 创建
4. **测试充分后再发布**：确保所有测试通过，避免发布有问题的版本
5. **重要变更要通知用户**：如果有破坏性变更，需要在 Release 中明确说明
6. **保持发布节奏**：定期发布小版本，避免积累太多变更

## 自动化发布（未来计划）

未来可以考虑使用 CI/CD 工具自动化发布流程：

- 使用 GitHub Actions 自动运行测试
- 自动创建 Release
- 自动部署到生产环境
- 自动生成 CHANGELOG

## 相关文档

- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)
- [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)

---

**最后更新**：2025/05/31
