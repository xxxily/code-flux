# 版本发布指引

本文档规范了 Code-Flux 项目的版本发布流程，确保每次发布都遵循统一的标准。

## 版本号规范

采用语义化版本号（Semantic Versioning）：`主版本号.次版本号.修订号`

- **主版本号（Major）**：不兼容的 API 修改
- **次版本号（Minor）**：向下兼容的功能性新增
- **修订号（Patch）**：向下兼容的问题修正

示例：
- `1.0.0` → `2.0.0`：重大架构调整或破坏性变更
- `1.2.0` → `1.3.0`：新增功能特性
- `1.2.3` → `1.2.4`：Bug 修复、文档更新、测试完善

## 发布前检查清单

在开始发布流程前，确保：

- [ ] 所有计划的功能已完成并合并到主分支
- [ ] 本地代码与远程主分支同步
- [ ] 文档已更新（README、CLAUDE.md 等）
- [ ] 没有遗留的 TODO 或 FIXME 注释（针对本次发布）

## 发布流程

### 1. 确定版本号

根据本次更新内容确定新版本号：

```bash
# 查看当前版本
cat package.json | grep version

# 查看最近的提交记录，评估变更类型
git log --oneline -20
```

### 2. 运行质量检查（必须）

在更新版本号前，必须确保代码质量：

```bash
# 1. 运行 ESLint 检查
npm run lint

# 2. 运行所有测试
npm test
```

**质量检查标准**：

- **测试必须全部通过**：任何测试失败都必须修复后才能发布
- **Lint 错误处理**：
  - 功能性错误（如语法错误、逻辑错误）必须修复
  - 代码规范问题（如未使用的变量）可以：
    - 优先选择：立即修复后再发布
    - 备选方案：记录为技术债务，发布后立即修复
  - 使用 `npm run lint -- --fix` 尝试自动修复

**重要**：如果选择带 lint 警告发布，必须：
1. 在 CHANGELOG 中说明存在的代码规范问题
2. 创建 Issue 跟踪这些问题
3. 在下一个版本中优先修复

### 3. 更新版本号

编辑 `package.json`，更新 `version` 字段：

```json
{
  "version": "x.y.z"
}
```

### 4. 更新 CHANGELOG

编辑 `changeLog.md`，在文件顶部添加新版本的更新日志：

```markdown
## x.y.z [YYYY/MM/DD]

* 功能描述 1
* 功能描述 2
* Bug 修复描述
* 文档更新描述
```

**编写规范**：
- 使用简洁明了的语言描述变更
- 按类型分组：新功能、优化、修复、文档、测试等
- 重要变更放在前面
- 使用用户视角描述（而非技术实现细节）

**示例**：
```markdown
## 1.2.4 [2025/05/31]

* 完善自动化测试系统，测试覆盖率提升至 25.6%
* 添加项目开发规范和测试约束文档
* 为核心工具函数和组件添加单元测试
* 优化测试文件组织结构
* 添加测试实施指南和策略文档
```

### 5. 构建生产版本（必须）

构建项目并生成部署文件到 `docs` 目录（用于 GitHub Pages）：

```bash
# 构建生产版本
npm run build

# 验证构建结果
ls -la docs/

# 检查构建产物是否正常
# - docs/index.html 应该存在
# - docs/js/ 和 docs/css/ 目录应该包含打包后的文件
```

**重要**：
- 构建输出目录为 `./docs/`（配置在 `vue.config.js` 中）
- GitHub Pages 会自动从 `docs` 目录部署网站
- 必须将 `docs` 目录的变更一起提交

### 6. 提交版本更新

```bash
# 添加修改的文件（包括构建产物）
git add package.json changeLog.md docs/

# 提交（使用规范的提交信息）
git commit -m "chore: 发布 v1.2.4 版本"
```

### 7. 创建 Git Tag

```bash
# 创建带注释的标签
git tag -a v1.2.4 -m "Release v1.2.4

主要更新：
- 完善自动化测试系统
- 添加开发规范文档
- 提升测试覆盖率
"

# 查看标签是否创建成功
git tag -l | tail -5
```

### 8. 推送到远程仓库

```bash
# 推送代码（包括 docs 目录的构建产物）
git push origin main

# 推送标签
git push origin v1.2.4

# 或者推送所有标签
git push origin --tags
```

**重要**：推送后 GitHub Pages 会自动部署 `docs` 目录的内容到 https://code-flux.anzz.top

**常见问题**：

如果推送时遇到 GitHub Push Protection 警告（检测到疑似密钥）：
- 这通常是误报，构建产物中的示例代码被误认为是密钥
- 访问 GitHub 提供的链接，点击 "Allow secret" 允许推送
- 或者使用 `git push --no-verify` 跳过检查（不推荐）

### 9. 创建 GitHub Release（必须）

使用 GitHub CLI 自动创建 Release：

```bash
# 创建 Release（替换版本号和更新内容）
gh release create v1.2.4 \
  --title "v1.2.4 - 简短标题描述" \
  --notes "## 主要更新

### 新功能
- 功能描述 1
- 功能描述 2

### 优化改进
- 优化描述 1
- 优化描述 2

### Bug 修复
- 修复描述 1

### 文档更新
- 文档更新描述

## 安装使用

### 在线体验
访问 [https://code-flux.anzz.top](https://code-flux.anzz.top) 在线使用

### 本地部署
\`\`\`bash
git clone https://github.com/xxxily/code-flux.git
cd code-flux
npm install
npm run serve
\`\`\`

---

**完整更新日志**: https://github.com/xxxily/code-flux/blob/main/changeLog.md"
```

**Release Notes 编写规范**：
- 使用 Markdown 格式
- 按类型分组：新功能、优化改进、Bug 修复、文档更新等
- 包含安装使用说明
- 链接到完整的 CHANGELOG
- 如果有技术债务或已知问题，在末尾说明

**附加资产**（可选）：
```bash
# 如果需要上传额外文件（如 Tauri 应用）
gh release upload v1.2.4 path/to/app.dmg path/to/app.exe
```

### 10. 验证发布

```bash
# 验证远程标签
git ls-remote --tags origin

# 验证 GitHub Release
# 访问：https://github.com/xxxily/code-flux/releases

# 验证 GitHub Pages 部署
# 访问：https://code-flux.anzz.top
# 检查页面是否正常加载，版本号是否更新
```

### 11. 构建和部署（可选）

如果需要部署到其他环境（非 GitHub Pages）：

```bash
# 使用 Docker 部署
npm run docker:build
npm run docker:up
```

**注意**：GitHub Pages 部署已在步骤 8 推送代码时自动完成。

## 快速发布命令

完整的发布流程可以通过以下命令快速执行：

```bash
# 1. 确保在主分支且代码最新
git checkout main
git pull origin main

# 2. 运行质量检查（必须）
npm run lint
npm test

# 3. 手动编辑 package.json 和 changeLog.md

# 4. 构建生产版本（必须）
npm run build

# 5. 提交并打标签（替换版本号）
VERSION="1.2.4"
git add -A
git commit -m "chore: 发布 v${VERSION} 版本"
git tag -a "v${VERSION}" -m "Release v${VERSION}"

# 6. 推送（会自动触发 GitHub Pages 部署）
git push origin main --no-verify
git push origin "v${VERSION}"

# 7. 创建 GitHub Release
gh release create "v${VERSION}" \
  --title "v${VERSION} - 版本标题" \
  --notes "$(cat <<'EOF'
## 主要更新
- 更新内容 1
- 更新内容 2

## 安装使用
访问 [https://code-flux.anzz.top](https://code-flux.anzz.top) 在线使用

---
**完整更新日志**: https://github.com/xxxily/code-flux/blob/main/changeLog.md
EOF
)"

# 8. 验证部署
# 访问 https://code-flux.anzz.top 检查是否更新
# 访问 https://github.com/xxxily/code-flux/releases 检查 Release
```

## 发布后工作

### 1. 验证部署

- **GitHub Pages**：访问 https://code-flux.anzz.top 确认更新
- **GitHub Release**：访问 https://github.com/xxxily/code-flux/releases 确认发布
- **检查功能**：测试关键功能是否正常

### 2. 通知相关人员

- 在项目群组或频道通知版本发布
- 说明主要更新内容
- 提供升级指引（如有必要）

### 3. 监控反馈

- 关注 GitHub Issues
- 监控生产环境日志
- 收集用户反馈

## 回滚流程

如果发布后发现严重问题需要回滚：

```bash
# 1. 回退到上一个版本的提交
git revert HEAD

# 2. 或者重置到上一个标签（谨慎使用）
git reset --hard v1.2.3

# 3. 强制推送（需要权限，谨慎操作）
git push origin main --force

# 4. 删除错误的标签
git tag -d v1.2.4
git push origin :refs/tags/v1.2.4
```

**注意**：强制推送会影响其他协作者，建议优先使用 `git revert` 而非 `git reset --hard`。

## 常见问题

### Q: 忘记更新 CHANGELOG 怎么办？

```bash
# 修改 CHANGELOG
vim changeLog.md

# 修正提交
git add changeLog.md
git commit --amend --no-edit

# 强制推送（如果已经推送）
git push origin main --force
```

### Q: 标签打错了怎么办？

```bash
# 删除本地标签
git tag -d v1.2.4

# 删除远程标签
git push origin :refs/tags/v1.2.4

# 重新创建正确的标签
git tag -a v1.2.4 -m "Release v1.2.4"
git push origin v1.2.4
```

### Q: 如何查看两个版本之间的差异？

```bash
# 查看提交差异
git log v1.2.3..v1.2.4 --oneline

# 查看代码差异
git diff v1.2.3..v1.2.4
```

## 自动化发布（未来规划）

考虑使用 CI/CD 工具自动化发布流程：

- 使用 GitHub Actions 自动创建 Release
- 自动生成 CHANGELOG
- 自动构建和部署
- 自动运行测试和检查

示例配置文件位置：`.github/workflows/release.yml`

## 参考资源

- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/)
- [Git 标签管理](https://git-scm.com/book/zh/v2/Git-基础-打标签)

---

**最后更新**：2025/05/31  
**维护者**：xxxily
