# 文档结构说明

## 📁 目录结构

```
code-flux/
├── documentation/          # 项目文档（不会被 build 覆盖）
│   ├── fixes/             # 修复相关文档
│   ├── testing/           # 测试相关文档
│   ├── PROJECT_COMPLETION_REPORT.md
│   └── README.md
├── docs/                  # 构建输出目录（会被 build 完全覆盖）
├── public/                # 公共资源（会被复制到 docs/）
│   └── CNAME             # GitHub Pages 域名配置
├── tests/                 # 测试脚本
└── src/                   # 源代码
```

## ⚠️ 重要说明

### 1. 文档存放位置

- ✅ **正确**: 将项目文档放在 `documentation/` 目录
- ❌ **错误**: 将项目文档放在 `docs/` 目录

**原因**: `vue.config.js` 配置了 `outputDir: './docs/'`，执行 `npm run build` 时会**完全清空并重新生成** `docs/` 目录。

### 2. CNAME 文件处理

为了确保 GitHub Pages 的自定义域名配置不被构建覆盖：

- ✅ **CNAME 文件已复制到** `public/CNAME`
- ✅ 构建时会自动复制到 `docs/CNAME`
- ✅ 不需要手动维护 `docs/CNAME`

### 3. 构建流程

```bash
# 执行构建
npm run build

# 构建过程：
# 1. 清空 docs/ 目录
# 2. 编译源代码
# 3. 将 public/ 下的文件复制到 docs/
# 4. 生成最终的构建产物到 docs/
```

### 4. 文件保护

以下文件/目录**不会**被构建覆盖：

- ✅ `documentation/` - 项目文档
- ✅ `tests/` - 测试脚本
- ✅ `src/` - 源代码
- ✅ `public/` - 公共资源

以下文件/目录**会**被构建覆盖：

- ⚠️ `docs/` - 构建输出目录（完全覆盖）

## 📝 维护指南

### 添加新文档

1. 在 `documentation/` 下创建相应的子目录
2. 编写 Markdown 文档
3. 更新 `documentation/README.md` 的目录

### 添加需要在构建后保留的文件

1. 将文件放在 `public/` 目录
2. 构建时会自动复制到 `docs/`

### 示例

```bash
# 添加新的静态文件
cp my-file.txt public/

# 构建后会出现在
# docs/my-file.txt
```

## 🔍 验证

### 验证 CNAME 是否正确

```bash
# 检查 public/CNAME
cat public/CNAME
# 应该输出: code-flux.anzz.top

# 构建后检查 docs/CNAME
npm run build
cat docs/CNAME
# 应该输出: code-flux.anzz.top
```

### 验证文档不被覆盖

```bash
# 构建前
ls documentation/

# 构建
npm run build

# 构建后
ls documentation/
# 应该看到相同的文件，没有被删除
```

## 📚 相关文档

- [项目文档](./documentation/README.md)
- [修复文档](./documentation/fixes/README.md)
- [测试文档](./documentation/testing/README.md)

---

**创建时间**: 2026-05-31  
**最后更新**: 2026-05-31
