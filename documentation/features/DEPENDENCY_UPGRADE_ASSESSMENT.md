# Code-Flux 依赖升级需求与技术评估

**状态**：需求规划 / 技术评估阶段  
**日期**：2026-05-31  
**适用范围**：新需求开发前的依赖治理、构建链路现代化、安全风险收敛  
**结论摘要**：建议先做“Node/CI 基线统一 + 安全补丁 + 运行时版本对齐”，再启动“Vue CLI 4 迁移到 Vite”的主升级分支；不建议直接执行全量 `npm update --latest`。
**Phase 2 更新**：已启动 Vite 迁移，主构建配置入口切换为 `vite.config.js`，并移除 Vue CLI 4 / Webpack 4 主链路。
**Phase 3/4 更新**：已迁移到 ESLint flat config，升级 ESLint 主链路，并完成 Monaco `0.55.1` 升级；Vuex、`resize-observer-polyfill`、`cropperjs@1` 暂按保守策略保留。

---

## 1. 背景与目标

Code-Flux 当前是一个 Vue 3 应用，但构建链路仍停留在 Vue CLI 4 / Webpack 4 时代。新需求开发前需要先评估依赖升级，否则后续功能会继续绑定旧构建体系、安全漏洞链路和不一致的运行时版本。

### 1.1 业务目标

1. 降低新需求开发时被旧依赖阻塞的概率。
2. 将前端构建、测试、CI、Docker 环境统一到当前主流 Node/Vite 生态。
3. 优先消除生产依赖安全风险和高危开发链路风险。
4. 保持现有在线编辑、预览、分享、模板、Gist、PWA、Monaco 编辑器等核心能力可用。

### 1.2 非目标

1. 本文档不直接实施依赖升级。
2. 不在同一个阶段强制迁移 Vuex 到 Pinia，除非新需求正好深度改造状态层。
3. 不把 Prettier 3 的格式化差异和业务功能开发混在同一个 PR。
4. 不为了追最新而升级 `vue-router@5`、`cropperjs@2` 等可能带来较大行为变化的包。

---

## 2. 当前项目技术栈事实

### 2.1 依赖入口

当前项目使用 npm 和 `package-lock.json`，没有发现 pnpm/yarn/bun 锁文件。关键脚本在 `package.json:29` 至 `package.json:53`：

- `serve/build/lint` 依赖 `vue-cli-service`。
- 单元/组件/集成测试使用 Vitest。
- E2E 使用 Playwright。
- 构建输出目录为 `docs/`，该目录是部署产物。

### 2.2 运行时依赖

`package.json:55` 至 `package.json:79` 显示当前主要运行时依赖：

| 依赖 | 当前声明 | 当前安装 | 最新/可升级方向 | 评估 |
|---|---:|---:|---:|---|
| `vue` | `^3.3.4` | `3.5.13` | `3.5.35` | 应与 `@vue/compiler-sfc` 同步升级 |
| `@vue/compiler-sfc` | `^3.2.37` | `3.5.13` | `3.5.35` | 声明版本明显落后，需和 Vue 严格对齐 |
| `element-plus` | `^2.9.7` | `2.9.7` | `2.14.1` | 当前生产 audit 有漏洞，应优先升到 `>2.11.0` |
| `vue-router` | `^4.0.6` | `4.5.0` | `4.6.4` | 建议先升 4.x，不建议现在升 5.x |
| `vuex` | `^4.0.0` | `4.x` | `4.1.0` / Pinia | Vuex 可短期保留，Pinia 作为后续架构项 |
| `@octokit/core` | `^4.2.4` | `4.2.4` | `7.0.6` | 有生产 audit 风险，升级要求 Node >= 20 |
| `monaco-editor` | `^0.29.1` | `0.29.1` | `0.55.1` | 升级涉及 worker、TextMate、主题链路，需单独验证 |
| `workbox-webpack-plugin` | dev | `7.3.0` | `7.4.1` | 当前和 Webpack/Vue CLI 绑定；Vite 后应改用 PWA 插件 |

### 2.3 构建与 PWA 链路

`vue.config.js:1` 至 `vue.config.js:35` 显示：

- 仍使用 CommonJS 格式配置 Vue CLI。
- 使用 `monaco-editor-webpack-plugin` 注入 Monaco worker。
- 使用 `workbox-webpack-plugin` 的 `InjectManifest` 生成 Service Worker。
- `outputDir` 是 `./docs/`，需要在迁移后保持。
- 生产环境关闭 source map。

这些配置都是 Vite 迁移的核心改造点。

### 2.4 测试链路

`vitest.config.js:1` 至 `vitest.config.js:41` 已经引入 Vite 测试生态：

- `@vitejs/plugin-vue` 已存在。
- 测试环境为 `happy-dom`。
- 覆盖率阈值为 75%。

`playwright.config.js:1` 至 `playwright.config.js:30` 显示 E2E 期望本地服务在 `http://localhost:8080`。Vite 迁移时建议统一 8080 端口，降低测试改动面。

### 2.5 CI 与 Docker

`.github/workflows/test.yml` 当前使用 Node `18.x` 和 `20.x` 矩阵，并使用 `actions/setup-node@v3`、`actions/checkout@v3`、`actions/upload-artifact@v3`。

`Dockerfile:1` 至 `Dockerfile:15` 使用 `node:18-alpine`，并通过 `npm install` 安装依赖。建议升级为 Node 22 LTS 或至少 Node 20.19+，并改为 `npm ci`。

### 2.6 当前基线验证

在当前本地环境 Node `v24.13.0` / npm `11.6.2` 下执行：

| 命令 | 结果 | 备注 |
|---|---|---|
| `npm test -- --run` | 通过 | 7 个测试文件，162 个测试通过 |
| `npm run build` | 通过但有警告 | 大资源体积、Browserslist 数据过期、Vue deep selector 警告 |
| `npm run lint` | 通过但有警告 | Browserslist 数据过期 |
| `npm audit --json` | 失败 | 135 个漏洞：9 critical、43 high、74 moderate、9 low |
| `npm audit --omit=dev --json` | 失败 | 8 个生产依赖漏洞：含 Octokit、Element Plus、lodash/lodash-es、PostCSS |

基线说明：项目当前还能构建和测试，但安全和工具链风险已经明确。

---

## 3. 外部技术基线

截至 2026-05-31，已核对 npm registry 与官方文档：

1. Vue CLI 官方首页明确标注 Vue CLI 处于 Maintenance Mode，并建议新项目使用 `create-vue` 创建 Vite 项目。来源：https://cli.vuejs.org/
2. Vite 官方文档要求 Node.js `20.19+` 或 `22.12+`。来源：https://vite.dev/guide/
3. Vue 官方 Quick Start 使用 `npm create vue@latest` 作为 Vue 项目初始化入口。来源：https://vuejs.org/guide/quick-start.html
4. ESLint 最新迁移文档说明 flat config 自 ESLint v9 起成为默认配置格式，并且 `package.json` 中的 `eslintConfig` 不再适用于 flat config。来源：https://eslint.org/docs/latest/use/configure/migration-guide
5. `@octokit/core@7` 要求 Node `>=20`，`@vitejs/plugin-vue@6` 要求 Node `^20.19.0 || >=22.12.0`。

外部基线结论：未来主干应以 Node 20.19+/22 LTS、Vite、ESLint flat config 为目标，而不是继续投入 Vue CLI 4。

---

## 4. 核心问题清单

### 4.1 版本声明与实际安装不一致

`package.json` 声明 `vue@^3.3.4`、`@vue/compiler-sfc@^3.2.37`，但 lock 实际安装为 `3.5.13`。这类不一致会导致：

- 新机器 `npm ci` 和 `npm install` 行为预期不清晰。
- 自动化升级工具难以判断真实目标版本。
- Vue 编译器与运行时如果错位，SFC 行为可能出现隐性问题。

### 4.2 Vue CLI 4 / Webpack 4 依赖链风险高

`@vue/cli-service@4.5.19` 带来 Webpack 4、webpack-dev-server 3、request、旧 loader、旧 PostCSS 等依赖链。`npm audit` 中大量 critical/high 漏洞来自该链路。

这不是简单升级一两个小包能彻底解决的问题。

### 4.3 生产依赖仍有安全风险

`npm audit --omit=dev` 仍有 8 个生产依赖漏洞，主要来自：

- `@octokit/core<=5.0.0-beta.5`
- `element-plus<=2.11.0`
- `lodash/lodash-es<=4.17.23`
- `@vue/compiler-sfc` 内部旧 PostCSS

这些风险应在新需求开发前优先处理。

### 4.4 Monaco 编辑器升级复杂度高

源码中 Monaco 使用点集中在：

- `src/utils/monacoEditor.js`
- `src/utils/codeToImg.js`
- `src/components/Editor.vue`
- `src/components/EditorItem.vue`
- `src/components/EditImportMap.vue`

当前还依赖：

- `monaco-editor-webpack-plugin`
- `monaco-textmate`
- `monaco-editor-textmate`
- `onigasm`
- 手动构建的 worker bundle

迁移到 Vite 后，Monaco worker 加载方式必须重新设计，不能只升级版本。

### 4.5 PWA 与静态部署需要保留

当前 `vue.config.js` 使用 `InjectManifest`，构建输出到 `docs/`。Vite 迁移后需要保证：

- `docs/` 仍是部署目录。
- `publicPath: './'` 对应 Vite `base: './'`。
- `src/service-worker.js` 的 Workbox 注入方式不变或等价。
- 大文件缓存策略可控，避免 Service Worker 缓存失败或过期缓存影响线上。

### 4.6 Lint/Format 需要单独治理

当前 `package.json:110` 至 `package.json:123` 使用旧式 `eslintConfig`，并依赖 `eslint@6`、`babel-eslint@10`、`eslint-plugin-vue@7`、`prettier@1`。

升级到 ESLint 9/10 后需要迁移到 `eslint.config.js`。Prettier 3 会造成较大格式化 diff，应独立处理，避免污染业务 PR。

---

## 5. 升级选项评估

### 5.1 选项 A：只做安全补丁，继续保留 Vue CLI 4

**做法**：

- 升级 Vue、Element Plus、Octokit、Workbox、Babel、core-js 等直接依赖。
- 使用 `npm audit fix` 和必要的 overrides 清理部分漏洞。
- 不改构建系统。

**优点**：

- 开发周期短。
- 对业务代码影响较小。
- 可以作为新需求前的最低门槛。

**缺点**：

- Vue CLI 4 / Webpack 4 的漏洞链仍会大量存在。
- 继续投资维护模式技术栈。
- 后续新需求仍可能被旧 loader/webpack 限制。

**结论**：可作为 Phase 1，但不能作为最终目标。

### 5.2 选项 B：从 Vue CLI 4 升级到 Vue CLI 5

**做法**：

- 升级 `@vue/cli-service`、`@vue/cli-plugin-babel`、`@vue/cli-plugin-eslint` 到 `5.0.9`。
- 迁移到 Webpack 5。
- 同步升级 loader、Monaco plugin、Workbox。

**优点**：

- 比直接迁移 Vite 小一些。
- 可以清理部分 Webpack 4 风险。
- `vue.config.js` 模型基本保留。

**缺点**：

- Vue CLI 仍是维护模式。
- 未来仍需要迁移 Vite，等于做两次构建升级。
- CLI 5 与最新 ESLint/Vite 生态仍存在代际差异。

**结论**：只有在 Vite 迁移风险不可接受时作为中间方案，不推荐作为长期方案。

### 5.3 选项 C：迁移到 Vite

**做法**：

- 新增 `vite.config.js`，替代 `vue.config.js`。
- `npm run serve/build` 改为 Vite。
- 保持 `base: './'`、`build.outDir: 'docs'`。
- 使用 Vite 方式处理 Monaco worker。
- 使用 `vite-plugin-pwa` 或等价方案替代 `workbox-webpack-plugin`。
- 更新 CI、Docker、Playwright server。

**优点**：

- 对齐 Vue 官方推荐和当前前端主流工具链。
- 减少旧 Webpack/Vue CLI 依赖链漏洞。
- 与现有 Vitest 配置天然一致。
- 后续新功能开发体验更好。

**缺点**：

- Monaco worker、PWA、静态资源路径是主要风险点。
- 构建产物 chunk、缓存策略、部署路径会变化。
- 需要完整 E2E 和线上静态部署验证。

**结论**：推荐作为主升级路线。

---

## 6. 推荐升级路线

### 总体策略

采用“两段式主线”：

1. **先治理基础风险**：Node/CI/Docker 基线、生产漏洞、Vue 运行时版本一致性。
2. **再迁移构建体系**：Vue CLI 4 -> Vite，重点验证 Monaco/PWA/部署。

不建议在一个 PR 中同时做 Vite、ESLint flat config、Prettier 3、Pinia、Monaco 大版本和业务新需求。

### Phase 0：冻结与基线记录

**目标**：让升级前后可比较。

**任务**：

1. 记录当前 `npm ci`、`npm run lint`、`npm test -- --run`、`npm run build`、`npm run test:e2e` 结果。
2. 记录 `npm audit --json` 与 `npm audit --omit=dev --json`。
3. 记录当前构建产物大小，至少保留 `chunk-vendors`、`app`、Monaco worker、`parses/*`。
4. 确认线上部署路径和 `docs/` 的发布方式。

**验收标准**：

- 有一份基线记录可用于升级后对比。
- 当前问题被明确标注为“升级前已存在”。

### Phase 1：Node/CI/Docker 与生产依赖安全升级

**目标**：在不改构建系统的前提下先降低生产风险。

**建议任务**：

1. 增加 Node 版本约束：
   - 推荐 `.nvmrc` 使用 Node 22 LTS。
   - `package.json` 增加 `engines.node: ">=20.19.0"` 或更严格的 Node 22 约束。
   - CI 从 Node 18/20 调整为 Node 20.19+ 和 Node 22。
2. CI action 升级：
   - `actions/checkout@v4`
   - `actions/setup-node@v4`
   - `actions/upload-artifact@v4`
3. Docker 调整：
   - `node:18-alpine` -> `node:22-alpine` 或 `node:20-alpine` 且满足 20.19+。
   - `npm install` -> `npm ci`。
4. 运行时依赖优先升级：
   - `vue` / `@vue/compiler-sfc` -> `3.5.35`
   - `element-plus` -> `2.14.1`
   - `@element-plus/icons-vue` -> `2.3.2`
   - `@octokit/core` -> `7.0.6`
   - `vue-router` -> `4.6.4`
   - `vuex` -> `4.1.0`
   - `core-js` -> `3.49.0`
   - `dayjs` -> `1.11.21`
   - `fflate` -> `0.8.3`
   - `jszip` -> `3.10.1`
   - `html2canvas` -> `1.4.1`
   - `sharp` -> `0.34.5`
5. 暂缓高风险大版本：
   - `cropperjs@2` 暂缓，先保持 1.x。
   - `monaco-editor@0.55` 暂缓到 Vite/Monaco 专项。
   - `prettier@3` 暂缓到格式化专项。

**验收标准**：

- `npm ci` 成功。
- `npm run lint` 成功。
- `npm test -- --run` 通过。
- `npm run build` 成功。
- `npm audit --omit=dev` 为 0，或剩余项有明确无法修复说明。
- `npm audit` 中 critical/high 数量显著下降。

### Phase 2：Vite 构建迁移

**目标**：移除 Vue CLI 4 / Webpack 4 主链路。

**建议任务**：

1. 新增 `vite.config.js`：
   - `base: './'`
   - `publicDir: 'public'`
   - `build.outDir: 'docs'`
   - `resolve.alias['@'] = path.resolve(__dirname, './src')`
   - `server.port = 8080`
2. 更新 npm scripts：
   - `serve` -> `vite --host 0.0.0.0 --port 8080`
   - `build` -> `vite build`
   - 保留测试脚本。
3. Monaco worker 迁移：
   - 用 Vite worker import 或专用 Vite 插件替代 `monaco-editor-webpack-plugin`。
   - 验证 `json/css/html/ts/editor` worker 均加载成功。
   - 验证 `src/utils/monacoEditor.js` 的 `window.MonacoEnvironment` 是否仍需保留。
4. PWA 迁移：
   - 用 `vite-plugin-pwa` 的 injectManifest 模式替代 `workbox-webpack-plugin`。
   - 保留 `src/service-worker.js`。
   - 验证 `maximumFileSizeToCacheInBytes` 或等价配置，避免大文件缓存警告变成错误。
5. 静态资源路径验证：
   - `public/parses/*`
   - `public/prettier/*`
   - `public/monaco/*` 或迁移后的 worker 输出
   - `public/onigasm/onigasm.wasm`
6. 删除或废弃 Vue CLI 专属依赖：
   - `@vue/cli-service`
   - `@vue/cli-plugin-babel`
   - `@vue/cli-plugin-eslint`
   - `monaco-editor-webpack-plugin`
   - `workbox-webpack-plugin`（迁移后）
   - `less-loader`（Vite 不需要 loader 包）

**验收标准**：

- `npm run build` 在 Vite 下成功，输出仍在 `docs/`。
- `npm run test:e2e` 通过。
- 编辑器页面 Monaco 可编辑、主题可切换、worker 无 404。
- Vue SFC / JS / CSS / HTML / LESS / PUG / TypeScript 相关预处理示例可运行。
- Service Worker 在生产构建中可注册，刷新后不出现旧缓存白屏。
- GitHub Pages 或当前静态部署路径可访问。

### Phase 3：Lint 与 Format 现代化

**目标**：升级代码质量工具，但控制 diff。

**建议任务**：

1. 从 `package.json.eslintConfig` 迁移到 `eslint.config.js`。
2. 升级：
   - `eslint` -> `10.4.1` 或当前稳定主线
   - `eslint-plugin-vue` -> `10.9.1`
   - `vue-eslint-parser` -> 最新
   - `@eslint/js` -> 最新
3. 移除 `babel-eslint`，必要时改用 `@babel/eslint-parser`。
4. Prettier 从 1.x 升到 3.x，但作为独立格式化 PR。
5. 先保证 lint 规则等价，再讨论是否提高规则强度。

**验收标准**：

- `npm run lint -- --no-fix` 或等价命令通过。
- 格式化 PR 不包含业务逻辑改动。
- CI 中 lint 命令与本地一致。

**实施结果（2026-05-31）**：

- 新增 `eslint.config.mjs`，移除 `package.json.eslintConfig`。
- `eslint` 升级到 `10.4.1`，`eslint-plugin-vue` 升级到 `10.9.1`，新增 `vue-eslint-parser@10.4.0`、`@eslint/js@10.0.1`、`globals@17.6.0`。
- 移除 `@babel/eslint-parser`。当前源码不依赖 Babel parser 特性，且该包最新 peer dependency 尚未声明支持 ESLint 10。
- 保持规则强度接近旧 `plugin:vue/vue3-essential`，关闭迁移后新增但不属于本阶段目标的 `vue/multi-word-component-names`、`no-useless-assignment` 噪音项，避免扩大业务 diff。
- Prettier 仍保持 `1.19.1`，按原计划留给独立格式化 PR。
- `npm run lint -- --no-fix` 已通过。

### Phase 4：Monaco、状态层和体验型升级

**目标**：处理高价值但非前置阻塞项。

**建议任务**：

1. Monaco 升级到 `0.55.1`，配合 worker 和 TextMate 链路验证。
2. 评估 `monaco-textmate` / `monaco-editor-textmate` / `onigasm` 是否有更现代组合。
3. 状态管理保留 Vuex 4，等新需求稳定后再评估 Pinia。
4. `resize-observer-polyfill` 可评估删除，但需确认目标浏览器。
5. `cropperjs@2` 单独评估 API 变化后再升级。

**实施结果（2026-05-31）**：

- `monaco-editor` 升级到 `0.55.1`。
- 继续使用 Vite `?worker` 导入方式加载 `editor/json/css/html/ts` worker；生产构建已输出对应 worker chunk。
- `monaco-editor-textmate@4.0.0`、`monaco-textmate@3.0.1`、`onigasm@2.2.5` 保留。当前组合仍能构建并通过 E2E，后续如替换 TextMate 链路应单独做编辑器专项。
- 为消除 Monaco 固定依赖 `dompurify@3.2.7` 带来的生产 audit moderate 漏洞，使用 npm `overrides` 将 `dompurify` 提升到 `3.4.7`。
- `vuex@4.1.0` 保留，暂不引入 Pinia 迁移。
- `resize-observer-polyfill@1.5.1` 保留。当前使用点仍在拖拽布局和编辑器尺寸监听，删除前需确认目标浏览器和回归拖拽/布局行为。
- `cropperjs` 保持 1.x（当前解析为 `1.6.2`），暂不升级 2.x，避免影响 `CodeToImg.vue` 的裁剪 API。
- `npm run build`、`npm run test:e2e`、`npm audit`、`npm audit --omit=dev` 已通过。

---

## 7. 新需求开发前置建议

### 7.1 最低前置门槛

如果新需求排期紧，至少先完成 Phase 1：

- Node/CI/Docker 基线统一。
- 生产依赖漏洞清零或可解释。
- Vue / compiler-sfc / Element Plus / Octokit 升级。
- 当前测试和构建全绿。

完成 Phase 1 后可以开始不涉及构建链路的新需求。

### 7.2 推荐前置门槛

如果新需求会涉及编辑器、预览、PWA、静态部署或构建产物，建议先完成 Phase 2 的 Vite 迁移。否则新功能会同时背负旧 Webpack 和新 Vite 测试生态之间的技术债。

---

## 8. 风险与缓解

| 风险 | 影响 | 缓解措施 |
|---|---|---|
| Vite 迁移后静态路径变化 | 线上白屏、资源 404 | 保持 `base: './'`，对 `docs/` 部署做完整 smoke test |
| Monaco worker 加载失败 | 编辑器不可用、语言服务失效 | 单独建立 Monaco worker 验收清单，逐语言验证 |
| PWA 缓存污染 | 用户继续加载旧资源 | 发布时更新 SW 版本策略，必要时提供缓存清理机制 |
| Octokit 7 Node engine 升级 | Node 18 CI/install 失败 | 先升级 Node 基线，再升级 Octokit |
| Element Plus DOM/CSS 变化 | UI 样式回归 | 覆盖 Header、Dialog、Drawer、Table、Message、Form 的视觉/交互 smoke test |
| Prettier 3 大量格式化 diff | Review 成本高 | 独立格式化 PR，不与功能或依赖升级混合 |
| `vue-router@5` 引入额外 peer 约束 | 路由升级变复杂 | 先锁定 `vue-router@4.6.4`，避免无必要大版本 |
| `cropperjs@2` API 变化 | 代码图片裁剪功能异常 | 单独测试 `CodeToImg.vue` 后再升级 |
| Service Worker 不缓存大文件 | 离线体验下降 | 调整 Workbox/Vite PWA 配置，并记录大文件策略 |

---

## 9. 验收标准

### 9.1 自动化验收

每个升级阶段必须满足：

1. `npm ci`
2. `npm run lint`
3. `npm test -- --run`
4. `npm run build`
5. `npm run test:e2e`
6. `npm audit --omit=dev`

Phase 2 后还需要在 Node 20.19+ 和 Node 22 LTS 上至少各跑一次 CI。

### 9.2 手动 smoke test

1. 首页编辑器正常加载。
2. Monaco 编辑器输入、主题切换、语言切换正常。
3. HTML/CSS/JS 三栏编辑后预览刷新正常。
4. Vue SFC 模板可运行。
5. 模板弹窗、设置弹窗、导出弹窗正常。
6. 本地保存、Gist 保存、分享链接、导出 ZIP 正常。
7. CodeToImg 截图和裁剪正常。
8. 移动端布局切换正常。
9. 生产构建下 Service Worker 注册正常，刷新后无白屏。
10. `docs/` 静态部署路径正常。

### 9.3 安全验收

1. 生产依赖漏洞为 0，或剩余项有明确不可利用说明。
2. 开发依赖 critical 为 0。
3. 不引入新的未维护构建插件。
4. 不把 token、Gist 配置、私有配置写入构建产物或日志。

---

## 10. 建议任务拆分

### Epic 1：依赖基线与安全修复

- 建立 Node 版本约束。
- 升级 CI actions。
- Docker 改为 Node 22 + `npm ci`。
- 升级生产直接依赖。
- 修复 `npm audit --omit=dev`。
- 更新 lockfile。

### Epic 2：Vite 构建迁移

- 新增 Vite 配置。
- 替换 scripts。
- 迁移 Monaco worker。
- 迁移 PWA InjectManifest。
- 移除 Vue CLI 依赖。
- 更新 E2E webServer。
- 验证静态部署。

### Epic 3：Lint/Format 工具升级

- 新增 `eslint.config.js`。
- 移除 package 内 `eslintConfig`。
- 升级 ESLint/Vue parser/plugin。
- 独立 Prettier 3 格式化。

### Epic 4：后续架构优化

- Monaco 大版本专项。
- Pinia 可行性评估。
- 删除不再需要的 polyfill。
- 构建产物体积治理。

---

## 11. ADR：推荐决策

### Decision

采用 “Phase 1 安全补丁 + Phase 2 Vite 迁移” 作为主路线；Vue CLI 5 只作为风险兜底方案，不作为长期目标。

### Drivers

1. Vue CLI 官方已经处于维护模式。
2. 当前漏洞主要来自旧 Vue CLI/Webpack 链路。
3. 项目测试链路已经使用 Vite/Vitest，迁移方向自然。
4. 新需求开发前需要减少构建链路不确定性。

### Alternatives Considered

1. **继续 Vue CLI 4**：短期最省事，但安全和维护风险继续存在。
2. **升级到 Vue CLI 5**：中间态可行，但未来仍要迁 Vite。
3. **直接全量升级所有包**：最快但不可控，Monaco/PWA/Prettier/ESLint/Router 会叠加风险。

### Why Chosen

Vite 是 Vue 官方当前推荐方向，能从根上减少旧 Webpack/Vue CLI 依赖链风险；分阶段推进可以先保障生产安全，再处理构建迁移的复杂点。

### Consequences

1. 需要为 Monaco worker 和 PWA 单独投入验证时间。
2. 迁移后构建产物 hash、chunk 和缓存策略会变化。
3. 短期会增加一个依赖升级分支，但能降低后续功能开发成本。

### Follow-ups

1. Phase 1 完成后重新跑 `npm outdated` 和 `npm audit`。
2. Phase 2 完成后补充 Vite 迁移记录。
3. 新需求开发前由技术负责人确认是否需要先完成 Phase 2。

---

## 12. 资料来源

### 本地证据

- `package.json:29` 至 `package.json:53`
- `package.json:55` 至 `package.json:79`
- `package.json:81` 至 `package.json:108`
- `vue.config.js:1` 至 `vue.config.js:35`
- `vitest.config.js:1` 至 `vitest.config.js:41`
- `playwright.config.js:1` 至 `playwright.config.js:30`
- `Dockerfile:1` 至 `Dockerfile:15`
- `.github/workflows/test.yml`
- `src/utils/monacoEditor.js`
- `scripts/buildVueCompilerSfc.js`

### 实时命令

- `npm outdated --json`
- `npm audit --json`
- `npm audit --omit=dev --json`
- `npm ls @vue/cli-service webpack vue @vue/compiler-sfc ... --depth=0`
- `npm view <package> version peerDependencies engines --json`
- `npm test -- --run`
- `npm run build`
- `npm run lint`

### 官方资料

- Vue CLI Maintenance Mode：https://cli.vuejs.org/
- Vue Quick Start：https://vuejs.org/guide/quick-start.html
- Vite Guide / Node compatibility：https://vite.dev/guide/
- ESLint flat config migration：https://eslint.org/docs/latest/use/configure/migration-guide
- Node.js releases：https://nodejs.org/en/about/previous-releases
