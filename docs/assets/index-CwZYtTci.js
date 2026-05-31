const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Index-CXSmBGA5.js","./_plugin-vue_export-helper-BDNMzG2s.js","./rolldown-runtime-CMxvf4Kt.js","./constants-BNtvDrx3.js","./vendor-vue-B1A3DsP7.js","./vendor-element-plus-DhNckaet.js","./vendor-element-plus-BslXLrM4.css","./vendor-utils-B5Y1gzHn.js","./vendor-utils-1oWo33m3.css","./vendor-export-CnlDboQ0.js","./vendor-export-cx_wrqbx.css","./monacoEditor-CfRz2RhO.js","./vendor-monaco-kO6itbf0.js","./vendor-monaco-BKiP-cbD.js","./vendor-monaco-CFVOH4lq.js","./vendor-monaco-C3f8Fq-K.css","./vendor-monaco-CCxKnpKg.js","./vendor-monaco-C7sF_AH1.js","./vendor-monaco-CPf1SLKb.js","./vendor-monaco-BqCvXSJ3.css","./vendor-monaco-CGLMOvZJ.js","./vendor-monaco-GHtDMt5R.js","./vendor-monaco-Cejm3ynn.js","./vendor-monaco-zXKshsnM.js","./vendor-monaco-DKMIUB5a.js","./vendor-monaco-4HDLdCux.js","./vendor-monaco-jSUqsJg3.css","./vendor-monaco-Dgm7tXZx.css","./vendor-monaco-CJ-UBJxE.css","./localDb-CJIarW0T.js","./Index-5JmpOWlx.css","./Preview-BlUO6jz8.js","./Console-BQMmJh5j.js","./Console-EThs3rtq.css","./DragItem-CLhjDcHV.js","./DragItem-CgDP-5Nh.css","./Preview-BQ1_8dJ4.js","./Preview-7z7ROw-J.css","./Preview-CjUruGHl.css","./Index-DFDASA3i.js"])))=>i.map(i=>d[i]);
import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{J as t,W as n,i as r,r as i,t as a,v as o}from"./vendor-vue-B1A3DsP7.js";import{E as s,i as c,n as l,r as u}from"./vendor-element-plus-DhNckaet.js";import{a as ee,b as d,c as f}from"./constants-BNtvDrx3.js";import{a as te,c as p,i as ne,s as m}from"./vendor-utils-B5Y1gzHn.js";import{a as h,i as g,o as re,s as ie}from"./vendor-export-CnlDboQ0.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var ae={__name:`App`,setup(e){return(e,r)=>{let i=t(`router-view`);return n(),o(i)}}},_=()=>d(()=>import(`./Index-CXSmBGA5.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]),import.meta.url),v=()=>d(()=>import(`./Preview-BlUO6jz8.js`),__vite__mapDeps([31,1,2,3,4,5,6,7,8,32,33,34,35,36,37,29,38]),import.meta.url),y=()=>d(()=>import(`./Index-DFDASA3i.js`),__vite__mapDeps([39,4,0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]),import.meta.url),b=[{path:`/`,name:`Editor`,component:_},{path:`/:id`,name:`Edit`,component:_},{path:`/share/:id?`,name:`Share`,component:v,props:!0},{path:`/preview/:id?`,name:`Preview`,component:v,props:!0},{path:`/embed/:id`,name:`Embed`,component:y},{path:`/embed/`,name:`QueryEmbed`,component:y},{path:`/local/:id`,name:`LocalEdit`,component:_}],oe=i({history:r(`./`),routes:b}),se=e(p()),x={html:!0,javascript:!0,css:!0},ce={postcss:[`postcss-cssnext`,`postcss`],scss:[`sass`]},S=(e,t=2)=>{let n=e.filter(e=>!x[e]);return n.length<=0?Promise.resolve():new Promise((e,r)=>{let i=(a=0)=>{let o=[];n.forEach(e=>{let t=(ce[e]||[e]).map(t=>/^https?/.test(e)?e:`./parses/${t}.js`);o.push(...t)});let s=new Promise((e,t)=>{setTimeout(()=>t(Error(`编译器加载超时`)),1e4)});Promise.race([(0,se.default)(o,{returnPromise:!0}),s]).then(()=>{n.forEach(e=>{x[e]=!0}),e()}).catch(e=>{a<t?(console.warn(`编译器加载失败，重试 ${a+1}/${t}`,e),setTimeout(()=>i(a+1),1e3)):(console.error(`编译器加载失败，已达到最大重试次数`,e),r(e))})};i()})},C=(e,t)=>E(e)?{useImport:!0,js:window.Babel.transform(e,{plugins:[T(t)]}).code}:{useImport:!1,js:e},w=e=>!(/^https?:\/\//.test(e)||/^(\/|\.\/|\.\.\/)/.test(e)),T=(e={})=>{let t={};return function(n){let r=n.types;return{visitor:{ImportDeclaration(n){let i=n.node.source.value;w(i)&&!t[i]&&(e[i]||(i=f(i)),t[i]=!0,n.replaceWith(r.importDeclaration(n.node.specifiers,r.stringLiteral(i))))}}}}},E=e=>{let t=!1;return window.Babel.transform(e,{plugins:[function(){return{visitor:{ImportDeclaration(e){t=!0,e.stop()}}}}]}),t},le=(e,t)=>new Promise((n,r)=>{try{switch(e){case`html`:n(t);break;case`pug`:n(window.pug.render(t));break;default:n(``);break}}catch(e){r(e)}}),ue=async(e,t,n)=>{await S([`babel`]);let r=``;switch(e){case`javascript`:return C(t,n);case`babel`:return r=window.Babel.transform(t,{presets:[`env`,`react`]}).code,{useImport:!1,js:r};case`typescript`:return r=window.ts.transpileModule(t,{reportDiagnostics:!0,compilerOptions:{module:`es2015`}}).outputText,C(r,n);case`coffeescript`:return r=window.CoffeeScript.compile(t),C(r,n);case`livescript`:return r=(window.LiveScript||window.require(`livescript`)).compile(t),{useImport:!1,js:r};default:return{useImport:!1,js:``}}},D=(e=``)=>e.replace(/(@import\s+)('|")([^'"]+)('|")/g,(e,...t)=>{let n=w(t[2])?f(t[2],!1):t[2];return`${t[0]}${t[1]}${n}${t[1]}`}),O=(e,t)=>new Promise((n,r)=>{let i=setTimeout(()=>{r(Error(`CSS编译超时`))},5e3);try{switch(e){case`css`:clearTimeout(i),n(D(t));break;case`less`:window.less.render(t).then(e=>{clearTimeout(i),n(D(e.css))},e=>{clearTimeout(i),r(e)});break;case`sass`:case`scss`:new window.Sass().compile(t,{indentedSyntax:e===`sass`},e=>{clearTimeout(i),e.status===0?n(D(e.text)):r(Error(e.message||`Sass编译失败`))});break;case`stylus`:window.stylus.render(t,(e,t)=>{clearTimeout(i),e?r(e):n(D(t))});break;case`postcss`:window.postcss([window.cssnext]).process(t).then(e=>{clearTimeout(i),n(D(e.css))}).catch(e=>{clearTimeout(i),r(e)});break;default:n(``);break}}catch(e){r(e)}}),k=(e,t,n)=>{e.traverse({ObjectExpression(e){e.parent&&e.parent.type===`NewExpression`&&(e.node.properties.push(t.objectProperty(t.identifier(`el`),t.stringLiteral(`#app`))),n.template&&n.template.content&&e.node.properties.push(t.objectProperty(t.identifier(`template`),t.stringLiteral(n.template.content))),e.stop())}})},de=e=>function(t){let n=t.types;return{visitor:{ExportDefaultDeclaration(t){t.replaceWith(n.expressionStatement(n.newExpression(n.identifier(`Vue`),[t.get(`declaration`).node]))),k(t,n,e)},AssignmentExpression(t){try{let r=t.get(`left.object.name`),i=t.get(`left.property.name`);r&&r.node===`module`&&i&&i.node===`exports`&&(t.replaceWith(n.newExpression(n.identifier(`Vue`),[t.get(`right`).node])),k(t,n,e))}catch{}}}}},fe=(e,t,n)=>{let r=!0;e.traverse({ObjectExpression(e){r&&(r=!1,n.template&&n.template.content&&e.node.properties.push(t.objectProperty(t.identifier(`template`),t.stringLiteral(n.template.content))),e.stop())}})},pe=e=>function(t){let n=t.types;return{visitor:{ExportDefaultDeclaration(t){t.replaceWith(n.expressionStatement(n.callExpression(n.memberExpression(n.callExpression(n.identifier(`createApp`),[t.get(`declaration`).node]),n.identifier(`mount`)),[n.stringLiteral(`#app`)]))),fe(t,n,e)}}}},A=async(e,t,n,r)=>{await S([`babel`]);let i={useImport:!1,js:``};e.script&&(i=n===`vue2`&&E(e.script.content)||n===`vue3`?{useImport:!0,js:window.Babel.transform(e.script.content,{plugins:[T(r),t(e)]}).code}:{useImport:!1,js:window.Babel.transform(e.script.content,{presets:[`env`],plugins:[t(e)]}).code});let a=[];for(let t=0;t<e.styles.length;t++){let n=e.styles[t],r=n.lang||`css`;r!==`css`&&await S([r]);let i=await O(r,n.content);a.push(i)}return{html:`<div id="app"></div>`,js:i,css:a.join(`\r
`)}},j={html:le,js:ue,css:O,vue:async(e,t,n)=>{let r,i;switch(e){case`vue2`:return r=window.VueTemplateCompiler.parseComponent(t),i=await A(r,de,`vue2`,n),i;case`vue3`:if(r=window.Vue3TemplateCompiler.parse(t),r.descriptor.scriptSetup){r.descriptor.script=null;let e=window.Vue3TemplateCompiler.compileScript(r.descriptor,{inlineTemplate:!0,id:Math.random()+``});r.descriptor.script={content:e.content}}return i=await A(r.descriptor,pe,`vue3`,n),i;default:return{useImport:!1,js:``}}}},me=e=>{let t={head:``,body:``,isFullHtml:!1};if(/^\s*(?:<!--[\s\S]*?-->\s*)*(?:<!doctype\s+html|<html)/i.test(e)){t.isFullHtml=!0;let n=e.match(/<head[^>]*>([\s\S]*?)<\/head>/i);n&&(t.head=n[1]?.trim()||``);let r=e.match(/<body[^>]*>([\s\S]*?)<\/body>/i);r&&(t.body=r[1]?.trim()||``)}else t.body=e;return t},he=(e,t)=>{let n=me(t);if(n.isFullHtml){let r=e;return t.match(/<title[^>]*>[\s\S]*?<\/title>/i)&&(r=r.replace(/<title[^>]*>[\s\S]*?<\/title>/i,``)),t.match(/<meta[^>]*charset[^>]*>/i)||(r=`<meta charset="UTF-8" />
      ${r}`),t.replace(/<head[^>]*>[\s\S]*?<\/head>/i,`<head>
        ${n.head}
        ${r}
      </head>`)}return`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    ${e}
</head>
<body>
    ${t}
</body>
</html>`},ge=()=>{let e=new Date().getTime();return window.performance&&typeof window.performance.now==`function`&&(e+=performance.now()),`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g,t=>{let n=(e+Math.random()*16)%16|0;return e=Math.floor(e/16),(t==`x`?n:n&3|8).toString(16)})},_e=async(e,t,n,r,i,a,o)=>{await S([e,t,n]);let s=j.html(e,r),c=j.js(t,i,a),l=j.css(n,o);return new Promise((e,t)=>{Promise.all([s,c,l]).then(([t,n,r])=>{e({html:t,js:n,css:r})}).catch(e=>{t(e)})})},M=async(e,t,n)=>{await S([e]);let r=j.vue(e,t,n);return new Promise((e,t)=>{Promise.all([r]).then(([t])=>{e(t?{...t}:null)}).catch(e=>{t(e)})})},N=(e,t=` `)=>e.replace(/([A-Z])/g,`-$1`).split(`-`).filter(e=>!!e).join(t),P=e=>{let t=document.createElement(`a`);t.href=e,t.target=`_blank`,t.click()},F=()=>window.location.origin,I=()=>{let e=`${F()}#/?blank=true`;window.open(e,`_blank`)},ve=(e,t)=>{let n=F();return t?`${n}#/share/?data=${t}`:`${n}#/share/${e}`},ye=(e,t)=>{let n=F();return t?`${n}#/embed/?data=${t}`:`${n}#/embed/${e}`},be=(e,t,n)=>{let r=ee[e],i=r.length;if(!t||!n)return r[i-1];for(let e=0;e<i-1;e++){let n=r[e];if(t.colors[n]!==void 0)return t.colors[n]}return r[i-1]},xe=e=>{let t=g(ie(h(e),{level:9}),!0);return btoa(t)},Se=e=>{let t=atob(e);return t.startsWith(`xÚ`)?g(re(h(t,!0))):decodeURIComponent(escape(t))},L=()=>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<980,R=null,Ce=e=>{R=e?new m({auth:e}):new m},z=(...e)=>{if(R)return R.request(...e)},B={name:`code-flux`,description:`AI生成式前端代码预览/微调辅助工具，前端代码在线运行/发布平台，codepen、jsbin、jsfiddle等的开源替代方案`,version:`1.2.4`,authors:[{name:`xxxily (二开作者)`},{name:`街角小林(原始作者)`,email:`1013335014@qq.com`},{name:`理想青年实验室(原始作者网站)`,url:`http://lxqnsys.com/`}],license:`MIT`,repository:{type:`git`,url:`https://github.com/xxxily/code-flux`},homepage:`https://code-flux.anzz.top`,keywords:[`javascript`,`code`,`frontend`],scripts:{serve:`vite --host 0.0.0.0 --port 8080`,build:`vite build`,lint:`eslint "src/**/*.{js,vue}" "tests/**/*.{js,vue}"`,buildConsole:`babel --config-file ./public/console/babel.config.json ./public/console/index.js --out-file ./public/console/compile.js`,convertTheme:`node ./scripts/convertTheme.js`,createThemeList:`node ./scripts/createThemeList.js`,buildLiveScript:`node ./scripts/buildLiveScript.js`,buildVueSFCCompiler:`node ./scripts/buildVueCompilerSfc.js`,format:`prettier --write src/**`,"docker:build":`docker build -t code-flux .`,"docker:run":`docker run -p 8080:80 code-flux`,"docker:up":`docker-compose up -d`,"docker:down":`docker-compose down`,"build:extension":`npm run build && cp extension/manifest.json extension/background.js extension/dist/ && cp -r extension/icons extension/dist/`,test:`vitest`,"test:unit":`vitest run tests/unit`,"test:component":`vitest run tests/component`,"test:integration":`vitest run tests/integration`,"test:e2e":`playwright test`,"test:coverage":`vitest run --coverage`,"test:watch":`vitest watch`,"test:ui":`vitest --ui`,"test:all":`npm run test:unit && npm run test:component && npm run test:integration && npm run test:e2e`},engines:{node:`>=20.19.0`},dependencies:{"@element-plus/icons-vue":`^2.3.2`,"@octokit/core":`^5.2.2`,"core-js":`^3.49.0`,cropperjs:`^1.5.12`,dayjs:`^1.11.21`,"element-plus":`^2.14.1`,eventemitter3:`^4.0.7`,fflate:`^0.8.3`,html2canvas:`^1.4.1`,jszip:`^3.10.1`,livescript:`^1.6.0`,loadjs:`^4.2.0`,"monaco-editor":`^0.55.1`,"monaco-editor-textmate":`^4.0.0`,"monaco-textmate":`^3.0.1`,nprogress:`^0.2.0`,onigasm:`^2.2.5`,"register-service-worker":`^1.7.2`,"resize-observer-polyfill":`^1.5.1`,sharp:`^0.34.5`,"vscode-theme-to-monaco-theme-web":`^1.0.0`,vue:`^3.5.35`,"vue-router":`^4.6.4`,vuex:`^4.1.0`},devDependencies:{"@babel/cli":`^7.29.7`,"@babel/core":`^7.29.7`,"@babel/plugin-transform-modules-commonjs":`^7.29.7`,"@babel/plugin-transform-strict-mode":`^7.29.7`,"@babel/preset-env":`^7.29.7`,"@eslint/js":`^10.0.1`,"@playwright/test":`^1.60.0`,"@vitejs/plugin-vue":`^6.0.7`,"@vitest/coverage-v8":`^4.1.7`,"@vitest/ui":`^4.1.7`,"@vue/compiler-sfc":`^3.5.35`,"@vue/test-utils":`^2.4.10`,esbuild:`^0.27.0`,eslint:`^10.4.1`,"eslint-plugin-vue":`^10.9.1`,"fs-extra":`^7.0.1`,globals:`^17.6.0`,"happy-dom":`^20.9.0`,less:`^4.6.4`,msw:`^2.14.6`,prettier:`^1.19.1`,vite:`^8.0.14`,"vite-plugin-pwa":`^1.3.0`,vitest:`^4.1.7`,"vscode-theme-to-monaco-theme-node":`^1.0.0`,"vue-eslint-parser":`^10.4.0`},overrides:{"brace-expansion@<=1.1.12":`1.1.15`,dompurify:`3.4.7`,"minimatch@<=3.1.3":`3.1.5`,"picomatch@<=2.3.1":`2.3.2`},browserslist:[`> 1%`,`last 2 versions`,`not dead`]},V={HTML:{language:`html`,content:`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CodeFlux</title>
</head>
<body>
<!-- 渐变背景容器 -->
<div class="gradient-bg">
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
  <div class="gradients-container">
    <div class="g1"></div>
    <div class="g2"></div>
    <div class="g3"></div>
    <div class="g4"></div>
    <div class="g5"></div>
    <div class="interactive"></div>
  </div>
</div>

<main>
  <section>
    <div class="about-container">
      <h2>CodeFlux</h2>
      <p id="description">${B.description}</p>

      <div class="links">
        <div class="link-item">
          <span class="link-label">GitHub:</span>
          <a id="repo-url" href="${B.repository.url}" target="_blank">${B.repository.url.replace(/^https?:\/\//,``)}</a>
        </div>
        <div class="link-item">
          <span class="link-label">&nbsp;&nbsp;&nbsp;&nbsp;官网:</span>
          <a id="homepage-url" href="${B.homepage}" target="_blank">${B.homepage.replace(/^https?:\/\//,``)}</a>
        </div>
      </div>

      <div class="version-info">
        <p>
          当前版本: <a id="version-link" href="${B.repository.url}">${B.version}</a>
        </p>
      </div>
    </div>
  </section>
</main>
</body>
</html>`,resources:[]},CSS:{language:`css`,content:`:root {
  --color-bg1: rgb(108, 0, 162);
  --color-bg2: rgb(0, 17, 82);
  --color1: 18, 113, 255;
  --color2: 221, 74, 255;
  --color3: 100, 220, 255;
  --color4: 200, 50, 50;
  --color5: 180, 180, 50;
  --color-interactive: 140, 100, 255;
  --circle-size: 80%;
  --blending: hard-light;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  overscroll-behavior-x: none;
  overscroll-behavior-y: none;
  scroll-behavior: smooth;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 0;
  padding: 0;
}

body {
  font-family: "Geist", sans-serif;
  position: relative;
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  color: #e0e0e0;
}

@keyframes moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}

.gradient-bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
  top: 0;
  left: 0;
  z-index: -1;
}

.gradient-bg svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.gradient-bg .gradients-container {
  filter: url(#goo) blur(40px);
  width: 100%;
  height: 100%;
}

.gradient-bg .g1 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: center center;
  animation: moveVertical 30s ease infinite;
  opacity: 1;
}

.gradient-bg .g2 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 400px);
  animation: moveInCircle 20s reverse infinite;
  opacity: 1;
}

.gradient-bg .g3 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2 + 200px);
  left: calc(50% - var(--circle-size) / 2 - 500px);
  transform-origin: calc(50% + 400px);
  animation: moveInCircle 40s linear infinite;
  opacity: 1;
}

.gradient-bg .g4 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 200px);
  animation: moveHorizontal 40s ease infinite;
  opacity: 0.7;
}

.gradient-bg .g5 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: calc(var(--circle-size) * 2);
  height: calc(var(--circle-size) * 2);
  top: calc(50% - var(--circle-size));
  left: calc(50% - var(--circle-size));
  transform-origin: calc(50% - 800px) calc(50% + 200px);
  animation: moveInCircle 20s ease infinite;
  opacity: 1;
}

.gradient-bg .interactive {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: 100%;
  height: 100%;
  top: -50%;
  left: -50%;
  opacity: 0.7;
}

main {
  position: relative;
  z-index: 2;
}

section {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: grid;
  place-items: center;
}

h1, h2 {
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 0 0 10px rgba(120, 0, 255, 0.5);
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px rgba(120, 0, 255, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(120, 0, 255, 0.8), 0 0 30px rgba(120, 0, 255, 0.6);
  }
}

.about-container {
  background-color: rgba(20, 20, 40, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 38px;
  max-width: 540px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 15px rgba(120, 0, 255, 0.2),
    inset 0 0 1px rgba(255, 255, 255, 0.1);
  border: 0px solid rgba(255, 255, 255, 0.1);
  transform: translateY(30px) perspective(1000px);
  opacity: 0;
  animation: fadeIn 1s ease-out forwards 0.3s;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-container:hover {
  transform: translateY(0) perspective(1000px) rotateX(2deg) rotateY(2deg);
  box-shadow: 
    0 15px 45px rgba(0, 0, 0, 0.4),
    0 0 25px rgba(120, 0, 255, 0.3),
    inset 0 0 2px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.about-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  animation: rotate 20s linear infinite;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.about-container:hover::before {
  opacity: 0.2;
}

.about-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: 0.5s;
  pointer-events: none;
}

.about-container:hover::after {
  left: 100%;
  transition: 0.8s ease-in-out;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0) perspective(1000px);
  }
}

.about-container h2,
.about-container p,
.about-container .links,
.about-container .version-info {
  transition: transform 0.3s ease;
}

.about-container:hover h2 {
  transform: translateY(-2px);
  text-shadow: 0 0 15px rgba(120, 0, 255, 0.8);
}

.links {
  margin: 20px 0;
}

.link-item {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.link-label {
  color: #a0a0a0;
  margin-right: 10px;
}

a {
  color: #fff;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: none;
  color: #c0c0ff;
}

a::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #c0c0ff;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.version-info {
  margin-top: 40px;
  font-size: 14px;
  color: rgba(200, 200, 255, 0.7);
  opacity: 1;
  animation: fadeInText 1s ease-out forwards 1.2s;
}`,resources:[]},JS:{language:`javascript`,content:`console.log('Hello, CodeFlux!');`,resources:[]}},we=()=>{let e=/```(?:html|HTML)\s*([\s\S]*?)```/g,t=/```(?:css|CSS)\s*([\s\S]*?)```/g,n=/```(?:javascript|js|JavaScript|JS)\s*([\s\S]*?)```/g;return{htmlRegex:e,cssRegex:t,jsRegex:n,extractCodeBlocks:r=>{e.lastIndex=0,t.lastIndex=0,n.lastIndex=0;let i=``,a=``,o=``,s=0,c;for(;(c=e.exec(r))!==null;){if(s++,s>1)return null;i=c[1]?c[1].trim():``}let l;for(;(l=t.exec(r))!==null;)a+=(l[1]?l[1].trim():``)+`

`;let u;for(;(u=n.exec(r))!==null;)o+=(u[1]?u[1].trim():``)+`

`;return{HTML:{content:i},CSS:{content:a.trim()},JS:{content:o.trim()}}}}},H=L(),U=`codeRun:githubToken`,W=`codeRun:config`,G=`codeRun:initialCode`,K=`codeRun:privateConfig`,q={codeTheme:`OneDarkPro`,pageThemeSyncCodeTheme:!0,syncLayout:!1,openAlmightyConsole:!!H,autoRun:!0,layout:H?`tabs2`:`default`,keepPreviousLogs:!H,codeFontSize:H?12:14},Te={saveCallback:``},Ee=()=>{try{let e=localStorage.getItem(K);return e?JSON.parse(e):null}catch(e){return console.error(`读取私有配置失败:`,e),null}},De=()=>{try{let e=localStorage.getItem(W);return e?JSON.parse(e):null}catch(e){return console.error(`读取配置失败:`,e),null}},Oe=()=>{try{let e=localStorage.getItem(G);return e?JSON.parse(e):null}catch(e){return console.error(`读取初始代码配置失败:`,e),null}},J=(e=!1)=>{let t=De(),n=Oe()||{...V};return e&&(n={JS:{content:``,language:`javascript`,resources:[]},HTML:{content:``,language:`html`,resources:[]},CSS:{content:``,language:`css`,resources:[]}}),{config:t||{...q},title:`未命名`,code:n}},Y=a({state(){return{uuid:ge(),loading:!1,editData:J(),githubToken:``,previewDoc:``,privateConfig:Ee()||{...Te}}},mutations:{setEditData(e,t){e.editData=t},setCodeContent(e,{type:t,code:n}){e.editData.code[t].content=n},setCodePreprocessor(e,{type:t,preprocessor:n}){e.editData.code[t].language=n},setCodeResource(e,{type:t,resources:n}){e.editData.code[t].resources=n},setImportMap(e,t){e.editData.code.JS.importMap=t},setCode(e,t){e.editData.code=t},setCodeTheme(e,t){e.editData.config.codeTheme=t,this.commit(`saveConfig`)},setAutoRun(e,t){e.editData.config.autoRun=t,this.commit(`saveConfig`)},setOpenAlmightyConsole(e,t){e.editData.config.openAlmightyConsole=t,this.commit(`saveConfig`)},setLayout(e,t){e.editData.config.layout=t,this.commit(`saveConfig`)},setKeepPreviousLogs(e,t){e.editData.config.keepPreviousLogs=t,this.commit(`saveConfig`)},setCodeFontSize(e,t){e.editData.config.codeFontSize=t,this.commit(`saveConfig`)},setPageThemeSyncCodeTheme(e,t){e.editData.config.pageThemeSyncCodeTheme=t,this.commit(`saveConfig`)},setGithubToken(e,t){e.githubToken=t||``,Ce(t)},setCodeTitle(e,t){e.editData.title=t},setPreviewDoc(e,t){e.previewDoc=t},saveConfig(e){try{localStorage.setItem(W,JSON.stringify(e.editData.config))}catch(e){console.error(`保存配置失败:`,e)}},resetToDefaultSettings(e){localStorage.removeItem(W),e.editData.config={...q}},setInitialCode(e,{type:t,content:n}){try{let e=localStorage.getItem(G),r=e?JSON.parse(e):{...V};r[t].content=n,localStorage.setItem(G,JSON.stringify(r))}catch(e){console.error(`保存初始代码失败:`,e)}},resetInitialCode(e){try{localStorage.removeItem(G),e.editData.code={...V}}catch(e){console.error(`重置初始代码失败:`,e)}},setSyncLayout(e,t){e.editData.config.syncLayout=t,this.commit(`saveConfig`)},setLoading(e,t){e.loading=t},setSaveCallback(e,t){e.privateConfig.saveCallback=t,this.commit(`savePrivateConfig`)},savePrivateConfig(e){try{localStorage.setItem(K,JSON.stringify(e.privateConfig))}catch(e){console.error(`保存私有配置失败:`,e)}},handleDroppedFile(e,{type:t,content:n}){if(!e.editData.code[t]){u.error(`不支持的文件类型: ${t}`);return}let r={HTML:`html`,CSS:`css`,JS:`javascript`};e.editData.code[t]={...e.editData.code[t],content:n,language:r[t]||e.editData.code[t].language}},setDetectedCode(e,t){e.editData={title:`未命名`,config:{...e.editData.config},code:{HTML:{language:`html`,content:t.HTML.content||``,resources:[]},CSS:{language:`css`,content:t.CSS.content||``,resources:[]},JS:{language:`javascript`,content:t.JS.content||``,resources:[]},VUE:{language:`vue2`,content:``,resources:[]}}}}},actions:{async getData(e,{id:t,data:n,blank:r}){try{let i=J(r||!1);if(t){let{data:e}=await z(`GET /gists/${t}`,{gist_id:t});i=JSON.parse(e.files[`coderun.json`].content)}else n&&(i=JSON.parse(Se(n)));if(!e.state.editData.config.syncLayout){let t=e.state.editData.config.layout;i.config.layout=t}let a=e.state.editData.config.saveCallback;i.config.saveCallback=a,e.commit(`setEditData`,i)}catch(e){throw console.log(e),u.error(`请求失败`),e}},saveGithubToken(e,t){e.commit(`setGithubToken`,t),t?localStorage.setItem(U,t):localStorage.removeItem(U)},getGithubToken(e){let t=localStorage.getItem(U);e.commit(`setGithubToken`,t)},clearAllCode(e){let t=JSON.parse(JSON.stringify(e.state.editData));return Object.keys(t.code).forEach(e=>{t.code[e].content=``}),e.commit(`setEditData`,t),Promise.resolve()},handleFileDrop({commit:e},t){return new Promise((n,r)=>{let i={html:`HTML`,htm:`HTML`,css:`CSS`,js:`JS`,javascript:`JS`,md:`MD`,markdown:`MD`}[t.name.split(`.`).pop().toLowerCase()];if(!i){u.error(`不支持的文件类型`),r(Error(`Unsupported file type`));return}let a=new FileReader;a.onload=async r=>{let a=r.target.result;if(i===`MD`){let{htmlRegex:r,extractCodeBlocks:i}=we();if(!r.test(a)){u.warning(`未检测到可用的代码块`),n();return}let o=i(a);try{await l.confirm(`检测到可用的代码块,是否导入?`,`提示`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`info`}),e(`setDetectedCode`,o),u.success(`${t.name} 代码导入成功`)}catch{u.info(`已取消导入`)}}else e(`handleDroppedFile`,{type:i,content:a}),u.success(`${t.name} 导入成功`);n()},a.onerror=e=>{u.error(`读取文件失败`),r(e)},a.readAsText(t)})}}}),X=new(e(te())).default,Z=/macintosh|mac os x/i.test(navigator.userAgent),ke=e=>{let t=[];return e.modifier&&t.push(Z?`⌘`:`Ctrl`),e.shift&&t.push(Z?`⇧`:`Shift`),e.alt&&t.push(Z?`⌥`:`Alt`),t.join(` + `)},Q=e=>`${ke(e)} + ${e.key.toUpperCase()}`,$=[{id:`save`,name:`保存`,key:`s`,modifier:Z?`meta`:`ctrl`,shift:!1,alt:!1,description:`保存 (${Q({key:`s`,modifier:!0})})`,event:`shortcut_save`},{id:`saveAsNew`,name:`另存为副本`,key:`s`,modifier:Z?`meta`:`ctrl`,shift:!0,alt:!1,description:`另存为副本 (${Q({key:`s`,modifier:!0,shift:!0})})`,event:`shortcut_save_as_new`},{id:`newProject`,name:`新建项目`,key:`o`,modifier:Z?`meta`:`ctrl`,description:`新建项目 (${Q({key:`o`,modifier:!0})})`,event:`shortcut_new_project`},{id:`newWindow`,name:`新开窗口`,key:`b`,modifier:Z?`meta`:`ctrl`,description:`新开窗口 (${Q({key:`b`,modifier:!0})})`,event:`shortcut_new_window`},{id:`previewInNewWindow`,name:`新窗预览`,key:`p`,modifier:Z?`meta`:`ctrl`,description:`新窗预览 (${Q({key:`p`,modifier:!0})})`,event:`shortcut_preview_window`}],Ae=e=>t=>{let n=Z?t.metaKey:t.ctrlKey;for(let r of $){let i=t.key.toLowerCase()===r.key.toLowerCase(),a=n===!0,o=t.shiftKey===!!r.shift,s=t.altKey===!!r.alt;if(i&&a&&o&&s){console.log(`shortcut match`,r),t.preventDefault(),t.stopPropagation(),r.event?e.emit(r.event):r.handler&&r.handler();return}}};ne(`./service-worker.js`,{ready(){console.log(`App is being served from cache by a service worker.
For more details, visit https://goo.gl/AFskqB`)},registered(e){console.log(`Service worker has been registered.`),setInterval(()=>{e.update()},1e3*60*60)},cached(){console.log(`Content has been cached for offline use.`)},updatefound(){console.log(`New content is downloading.`)},updated(e){console.log(`New content is available; please refresh.`);let t=document.createElement(`div`);t.id=`update-notification`,t.innerHTML=`
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #409eff;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          animation: slideIn 0.3s ease-out;
        ">
          <span>🎉 发现新版本！</span>
          <button id="update-btn" style="
            background: white;
            color: #409eff;
            border: none;
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
          ">立即更新</button>
          <button id="dismiss-btn" style="
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          ">稍后</button>
        </div>
        <style>
          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          #update-btn:hover {
            opacity: 0.9;
          }
          #dismiss-btn:hover {
            background: rgba(255,255,255,0.1);
          }
        </style>
      `,document.body.appendChild(t),document.getElementById(`update-btn`).addEventListener(`click`,()=>{e.waiting&&e.waiting.postMessage({type:`SKIP_WAITING`}),window.location.reload()}),document.getElementById(`dismiss-btn`).addEventListener(`click`,()=>{t.remove(),setTimeout(()=>{document.getElementById(`update-notification`)||document.body.appendChild(t)},1e3*60*30)})},offline(){console.log(`No internet connection found. App is running in offline mode.`)},error(e){console.error(`Error during service worker registration:`,e)}}),Y.dispatch(`getGithubToken`),(()=>{let e=s(ae);e.config.globalProperties.$eventEmitter=X,document.addEventListener(`keydown`,Ae(X)),e.use(oe),e.use(Y),e.directive(`loading`,c),e.mount(`#app`);let t=document.getElementById(`app-loading`);t&&(window.completeLoading&&window.completeLoading(),setTimeout(()=>{t.style.opacity=`0`,setTimeout(()=>{t.style.display=`none`},300)},500))})();export{z as a,M as c,be as d,L as f,xe as g,N as h,B as i,ye as l,I as m,Y as n,he as o,P as p,V as r,_e as s,$ as t,ve as u};