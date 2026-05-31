import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{C as t,F as n,Gt as r,H as i,Ht as a,K as o,O as s,R as c,T as l,V as u,W as d,Wt as f,X as p,Y as m,_ as h,at as g,b as _,d as v,et as y,g as b,mt as x,n as S,nt as C,o as w,pt as T,rt as E,s as D,ut as O,v as k,w as A,y as j,yt as M}from"./vendor-vue-B1A3DsP7.js";import{A as N,C as P,_ as F,a as I,b as L,c as R,g as z,h as ee,k as B,l as V,n as H,o as U,r as W,s as te,u as G,v as ne,w as re,x as K,y as ie}from"./vendor-element-plus-DhNckaet.js";import{a as ae,d as oe,m as se,n as ce,u as le}from"./constants-B-kgf7Yx.js";import{n as ue,o as de,r as fe}from"./vendor-utils-B5Y1gzHn.js";import{r as pe}from"./vendor-export-CnlDboQ0.js";import{a as me,d as he,f as q,g as ge,h as _e,i as J,l as ve,m as ye,n as be,r as Y,t as X,u as xe}from"./index-yGRDSqro.js";import{t as Z}from"./_plugin-vue_export-helper-BDNMzG2s.js";import{t as Q}from"./localDb-CJIarW0T.js";import{r as Se,t as Ce}from"./monacoEditor-BFtnzuTP.js";var we={class:`left`},Te=Z({__name:`HeaderLogo`,setup(e){return(e,t)=>(d(),_(`div`,we,[h(`h1`,{onClick:t[0]||=(...e)=>M(ye)&&M(ye)(...e),class:`logo-text`},`CodeFlux`)]))}},[[`__scopeId`,`data-v-0b5ae08c`]]),Ee={class:`center`},De=[`value`],Oe=Z({__name:`HeaderTitle`,setup(e){let t=S(),r=b(()=>t.state.editData.title),i=e=>{let n=e.target.value;t.commit(`setCodeTitle`,n)},a=e=>{let r=e.target.value;n(()=>{t.commit(`setCodeTitle`,r)})};return(e,t)=>(d(),_(`div`,Ee,[h(`input`,{type:`text`,value:r.value,onInput:i,onChange:a},null,40,De)]))}},[[`__scopeId`,`data-v-41e0b921`]]),$=typeof window==`object`&&window.window===window?window:typeof self==`object`&&self.self===self?self:typeof global==`object`&&global.global===global?global:void 0;function ke(e,t){return t===void 0?t={autoBom:!1}:typeof t!=`object`&&(console.warn(`Deprecated: Expected third argument to be a object`),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([`﻿`,e],{type:e.type}):e}function Ae(e,t,n){var r=new XMLHttpRequest;r.open(`GET`,e),r.responseType=`blob`,r.onload=function(){Pe(r.response,t,n)},r.onerror=function(){console.error(`could not download file`)},r.send()}function je(e){var t=new XMLHttpRequest;t.open(`HEAD`,e,!1);try{t.send()}catch{}return t.status>=200&&t.status<=299}function Me(e){try{e.dispatchEvent(new MouseEvent(`click`))}catch{var t=document.createEvent(`MouseEvents`);t.initMouseEvent(`click`,!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var Ne=$.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),Pe=$.saveAs||(typeof window!=`object`||window!==$?function(){}:`download`in HTMLAnchorElement.prototype&&!Ne?function(e,t,n){var r=$.URL||$.webkitURL,i=document.createElement(`a`);t=t||e.name||`download`,i.download=t,i.rel=`noopener`,typeof e==`string`?(i.href=e,i.origin===location.origin?Me(i):je(i.href)?Ae(e,t,n):Me(i,i.target=`_blank`)):(i.href=r.createObjectURL(e),setTimeout(function(){r.revokeObjectURL(i.href)},4e4),setTimeout(function(){Me(i)},0))}:`msSaveOrOpenBlob`in navigator?function(e,t,n){if(t=t||e.name||`download`,typeof e==`string`)if(je(e))Ae(e,t,n);else{var r=document.createElement(`a`);r.href=e,r.target=`_blank`,setTimeout(function(){Me(r)})}else navigator.msSaveOrOpenBlob(ke(e,n),t)}:function(e,t,n,r){if(r||=open(``,`_blank`),r&&(r.document.title=r.document.body.innerText=`downloading...`),typeof e==`string`)return Ae(e,t,n);var i=e.type===`application/octet-stream`,a=/constructor/i.test($.HTMLElement)||$.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||i&&a||Ne)&&typeof FileReader<`u`){var s=new FileReader;s.onloadend=function(){var e=s.result;e=o?e:e.replace(/^data:[^;]*;/,`data:attachment/file;`),r?r.location.href=e:location=e,r=null},s.readAsDataURL(e)}else{var c=$.URL||$.webkitURL,l=c.createObjectURL(e);r?r.location=l:location.href=l,r=null,setTimeout(function(){c.revokeObjectURL(l)},4e4)}});$.saveAs=Pe.saveAs=Pe;var Fe=async e=>{if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(e),!0}catch(e){console.warn(`Clipboard API写入失败，尝试其他方法:`,e)}try{let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.top=`-999px`,t.style.left=`-999px`,t.style.width=`2em`,t.style.height=`2em`,t.style.padding=`0`,t.style.border=`none`,t.style.outline=`none`,t.style.boxShadow=`none`,t.style.background=`transparent`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);if(document.body.removeChild(t),n)return!0;console.warn(`execCommand copy 失败`)}catch(e){console.warn(`execCommand copy 出错:`,e)}return!1},Ie=async()=>{if(navigator.clipboard&&navigator.clipboard.readText)try{return await navigator.clipboard.readText()}catch(e){console.warn(`Clipboard API读取失败，尝试其他方法:`,e)}return new Promise(e=>{let t=document.createElement(`textarea`);t.style.position=`fixed`,t.style.top=`-999px`,t.style.left=`-999px`,t.style.width=`2em`,t.style.height=`2em`,t.style.padding=`0`,t.style.border=`none`,t.style.outline=`none`,t.style.boxShadow=`none`,t.style.background=`transparent`,document.body.appendChild(t),t.focus();let n=!1;try{n=document.execCommand(`paste`)}catch(e){console.warn(`execCommand paste 失败:`,e)}let r=t.value;document.body.removeChild(t),e(n?r:``)})},Le=async()=>await Fe(``),Re={class:`shortcuts-list`},ze={class:`shortcut-name`},Be={class:`shortcut-key`},Ve=Z({__name:`ShortcutsDialog`,props:{modelValue:{type:Boolean,required:!0}},emits:[`update:modelValue`],setup(e,{emit:t}){let n=q(),i=e,a=t,s=b({get(){return i.modelValue},set(e){a(`update:modelValue`,e)}});return(e,t)=>(d(),k(M(F),{title:`常用快捷键`,modelValue:s.value,"onUpdate:modelValue":t[0]||=e=>s.value=e,width:M(n)?`100%`:`400px`,"close-on-click-modal":!0,"close-on-press-escape":!0},{default:C(()=>[h(`div`,Re,[(d(!0),_(v,null,o(M(X),e=>(d(),_(`div`,{class:`shortcut-item`,key:e.id},[h(`span`,ze,r(e.name),1),h(`span`,Be,r(e.description.split(`(`)[1].replace(`)`,``)),1)]))),128))])]),_:1},8,[`modelValue`,`width`]))}},[[`__scopeId`,`data-v-c1ffb531`]]),He={class:`right`},Ue={key:0,class:`divider`},We=[`title`],Ge=[`title`],Ke=[`title`],qe=[`title`],Je=[`title`],Ye=[`title`],Xe=[`title`],Ze=[`title`],Qe={key:0,class:`divider`},$e=2e3,et=Z({__name:`HeaderTools`,props:{isEdit:Boolean,loading:Boolean},emits:[`open-setting`,`open-template`,`export-zip`,`login`,`logout`,`show-gists`,`show-local-gists`,`create-share-url`,`create-embed-url`,`create-embed-code`],setup(e,{emit:t}){let n=e,o=t,{proxy:f}=s(),p=S(),g=D(),y=w(),x=q();/macintosh|mac os x/i.test(navigator.userAgent);let C=b(()=>n.isEdit||!!y.query.data),T=O(!1),k=O(!1),P=O(!1),F=e=>{T.value=e===void 0?!T.value:e,R(T)},I=e=>{k.value=e===void 0?!k.value:e,R(k)},L=e=>{P.value=e===void 0?!P.value:e,R(P)},R=e=>{[T,k,P].filter(t=>t!==e).forEach(e=>{e.value=!1})};document.body.addEventListener(`click`,R),c(()=>{document.body.removeEventListener(`click`,R)});let z=b(()=>p.state.githubToken),ee=()=>{f.$eventEmitter.emit(`run`),p.state.editData.config.layout===`newWindowPreview`&&f.$eventEmitter.emit(`preview_window_run`)},B=O(0),V=()=>{z.value?L():U()},U=async()=>{let e=Date.now();if(e-B.value<$e){W.warning(`保存太频繁，请稍后再试`);return}B.value=e;try{p.commit(`setLoading`,!0);let e=await G(),t;y.name===`LocalEdit`&&y.params.id?(await Q.updateGist(Number(y.params.id),e),t=y.params.id):(t=await Q.saveGist(e),g.replace({name:`LocalEdit`,params:{id:t}})),p.commit(`setLoading`,!1),W.success(`保存成功`),L(!1),f.$eventEmitter.emit(`save_success`,{type:`local`,id:t,data:e,mode:y.name===`LocalEdit`?`update`:`create`,routeName:`LocalEdit`})}catch(e){if(e===`cancel`)return;console.log(e),p.commit(`setLoading`,!1),W.error(`保存失败`)}},te=async()=>{let e=Date.now();if(e-B.value<$e){W.warning(`保存太频繁，请稍后再试`);return}B.value=e;try{p.commit(`setLoading`,!0);let e=await G(),t=`POST`,r=``;n.isEdit&&y.name===`Edit`&&y.params.id&&(t=`PATCH`,r=`/`+y.params.id,e.gist_id=y.params.id);let{data:i}=await me(`${t} /gists${r}`,e);p.commit(`setLoading`,!1),W.success(`保存成功，请注意：保存不是一个同步的过程！`),g.replace({name:`Edit`,params:{id:i.id}}),L(!1),f.$eventEmitter.emit(`save_success`,{type:`gist`,id:i.id,data:e,mode:t===`POST`?`create`:`update`,routeName:`Edit`})}catch(e){if(e===`cancel`)return;console.log(e),p.commit(`setLoading`,!1),W.error(`保存失败，请检查此token的权限是否包含创建gist`)}},G=async()=>{if(!p.state.editData.title||p.state.editData.title===`未命名`){let e=(p.state.editData.code?.HTML?.content||``).match(/<title>(.*?)<\/title>/i);if(e&&e[1])p.commit(`setCodeTitle`,e[1]);else if(x){let{value:e}=await H.prompt(`请输入标题`,`保存`,{confirmButtonText:`确定`,cancelButtonText:`取消`,inputValue:p.state.editData.title,inputValidator:e=>e.trim()?!0:`标题不能为空`});e&&e.trim()&&p.commit(`setCodeTitle`,e.trim())}}let e={description:p.state.editData.title,files:{},public:!0};return e.files[`coderun.json`]={content:JSON.stringify(p.state.editData)},e},ne=()=>o(`open-setting`),re=()=>o(`open-template`),K=()=>{o(`export-zip`),F(!1)},ie=()=>o(`login`),ae=()=>o(`logout`),oe=()=>{if(z.value===``){o(`login`);return}o(`show-gists`)},se=async()=>{try{let e=await new Promise(e=>{f.$eventEmitter.emit(`clear_all_code`,t=>{e(t)})});console.log(`清空结果:`,e),e&&(g.replace({name:`Editor`,query:{blank:!0}}),I(!1),W.success(`创建新项目成功`))}catch(e){console.error(`创建新项目失败:`,e),W.error(`创建新项目失败`)}},ce=()=>o(`create-share-url`),le=()=>o(`create-embed-url`),ue=()=>o(`create-embed-code`),de=()=>{f.$eventEmitter.emit(`clear_all_code`),F(!1)},fe=()=>{o(`show-local-gists`),I(!1)},pe=()=>{let{title:e,code:t}=p.state.editData||{};if(!t)return``;let n=`# ${e||`未命名代码`}\n\n`;return t.HTML?.content&&(n+=`## HTML

\`\`\`html
`,n+=t.HTML.content,n+=`
\`\`\`

`),t.CSS?.content&&(n+=`## CSS

\`\`\`css
`,n+=t.CSS.content,n+=`
\`\`\`

`),t.JS?.content&&(n+=`## JavaScript

\`\`\`javascript
`,n+=t.JS.content,n+=`
\`\`\`

`),t.VUE?.content&&(n+=`## Vue

\`\`\`vue
`,n+=t.VUE.content,n+=`
\`\`\`

`),n},he=()=>{let e=pe();if(!e||e===`# ${p.state.editData?.title||`未命名代码`}\n\n`){W.error(`没有可导出的代码内容`);return}Pe(new Blob([e],{type:`text/markdown;charset=utf-8`}),`${p.state.editData?.title||`code`}.md`),F(!1),W.success(`Markdown 文件导出成功`)},ge=async()=>{let e=pe();if(!e||e===`# ${p.state.editData?.title||`未命名代码`}\n\n`){W.error(`没有可复制的代码内容`);return}try{if(await Fe(e))F(!1),W.success(`Markdown 内容已复制到剪贴板`);else throw Error(`所有复制方法都失败了`)}catch(e){console.error(`复制失败:`,e),W.error(`复制失败`)}},_e=()=>{try{let e=``,t=window.location.origin;if(y.params.id)e=`${t}${`#/preview/`+y.params.id}`;else if(y.query.data)e=`${t}${`#/preview/?data=`+encodeURIComponent(y.query.data)}`;else{W.info(`当前状态无法预览，请先保存或分享`);return}e&&(window.open(e,`_blank`),I(!1))}catch(e){console.error(`打开预览失败:`,e),W.error(`打开预览失败`)}},J=b(()=>y.name===`Edit`&&y.params.id?`转存到本地`:`保存到本地`),ve=b(()=>y.name===`LocalEdit`&&y.params.id?`转存到Gist`:`保存到Gist`),be=async()=>{try{f.$eventEmitter.emit(`run`),await new Promise(e=>setTimeout(e,100));let e=p.state.previewDoc;if(!e){W.error(`没有可复制的预览内容`);return}if(e=e.replace(/<script[^>]*data-assist-code="true"[^>]*>[\s\S]*?<\/script>/g,``),e=e.replace(/<style[^>]*>\s*<\/style>/g,``),e=e.replace(/<script(?![^>]*src\s*=\s*["'][^"']*["'])[^>]*>\s*<\/script>/gi,``),await Fe(e))F(!1),W.success(`预览HTML已复制到剪贴板`);else throw Error(`复制失败`)}catch(e){console.error(`复制失败:`,e),W.error(`复制失败`)}},Y=e=>{let t=p.state.privateConfig.saveCallback;if(t?.trim())try{let n=p.state.previewDoc;n&&=n.replace(/<script[^>]*data-assist-code="true"[^>]*>[\s\S]*?<\/script>/g,``).replace(/<style[^>]*>\s*<\/style>/g,``).replace(/<script(?![^>]*src\s*=\s*["'][^"']*["'])[^>]*>\s*<\/script>/gi,``),Function(`saveInfo`,`console`,`alert`,`
      try {
        ${t}
        
        if (typeof onSaveSuccess === 'function') {
          onSaveSuccess({...saveInfo, previewDoc});
        }
      } catch (error) {
        console.error('回调执行错误:', error);
        throw error;
      }
    `)({...e,previewDoc:n},console,alert)}catch(e){console.error(`执行保存回调失败:`,e),W.error(`执行保存回调失败: `+e.message)}};f.$eventEmitter.on(`save_success`,e=>{Y(e)});let xe=b(()=>(y.name===`LocalEdit`||y.name===`Edit`)&&y.params.id),Z=async()=>{try{let e=`${p.state.editData.title||`未命名`}的副本`,{value:t}=await H.prompt(`请输入新副本标题`,`另存为`,{confirmButtonText:`确定`,cancelButtonText:`取消`,inputValue:e,inputValidator:e=>e.trim()?!0:`标题不能为空`});if(t&&t.trim()){if(p.commit(`setCodeTitle`,t.trim()),y.name===`LocalEdit`||!z.value){p.commit(`setLoading`,!0);let e=await G(),t=await Q.saveGist(e);g.replace({name:`LocalEdit`,params:{id:t}}),p.commit(`setLoading`,!1),W.success(`另存成功`),f.$eventEmitter.emit(`save_success`,{type:`local`,id:t,data:e,mode:`create`,routeName:`LocalEdit`})}else{p.commit(`setLoading`,!0);let e=await G(),{data:t}=await me(`POST /gists`,e);g.replace({name:`Edit`,params:{id:t.id}}),p.commit(`setLoading`,!1),W.success(`另存成功`),f.$eventEmitter.emit(`save_success`,{type:`gist`,id:t.id,data:e,mode:`create`,routeName:`Edit`})}L(!1)}}catch(e){if(e===`cancel`)return;console.error(e),p.commit(`setLoading`,!1),W.error(`另存失败`)}},Se=()=>{y.name===`LocalEdit`&&y.params.id?U():y.name===`Edit`&&y.params.id?te():V()};u(()=>{f.$eventEmitter.on(`shortcut_save`,Se),f.$eventEmitter.on(`shortcut_save_as_new`,()=>{xe.value&&Z()}),f.$eventEmitter.on(`shortcut_new_project`,se),f.$eventEmitter.on(`shortcut_new_window`,ye),f.$eventEmitter.on(`shortcut_preview_window`,_e)}),i(()=>{f.$eventEmitter.off(`shortcut_save`,Se),f.$eventEmitter.off(`shortcut_save_as_new`),f.$eventEmitter.off(`shortcut_new_project`),f.$eventEmitter.off(`shortcut_new_window`),f.$eventEmitter.off(`shortcut_preview_window`)});let Ce=O(!1),we=()=>{Ce.value=!0,F(!1)};return(t,n)=>{let i=m(`loading`);return d(),_(v,null,[h(`div`,He,[M(x)?j(``,!0):(d(),_(`div`,{key:0,class:`btn`,onClick:ne},[...n[9]||=[h(`span`,{class:`icon iconfont icon-shezhitianchong`},null,-1),A(` 设置 `,-1)]])),h(`div`,{class:`btn`,onClick:re},[...n[10]||=[h(`span`,{class:`icon iconfont icon-moban`},null,-1),A(` 模板 `,-1)]]),h(`div`,{class:`dropdownBtn`,onClick:n[1]||=N(()=>{},[`stop`])},[h(`div`,{class:`btn`,onClick:n[0]||=e=>F()},[...n[11]||=[h(`span`,{class:`icon iconfont icon-gongju`},null,-1),A(` 工具 `,-1)]]),h(`ul`,{class:a([`toolList`,{show:T.value}])},[h(`li`,{class:`toolItem`,onClick:K},`导出zip`),h(`li`,{class:`toolItem`,onClick:he},`导出 Markdown`),h(`li`,{class:`toolItem`,onClick:ge},`复制 Markdown`),h(`li`,{class:`toolItem`,onClick:be},`复制 预览HTML`),C.value?(d(),_(`li`,Ue)):j(``,!0),C.value?(d(),_(`li`,{key:1,class:`toolItem`,onClick:ce},` 生成分享链接 `)):j(``,!0),C.value?(d(),_(`li`,{key:2,class:`toolItem`,onClick:le},` 生成嵌入链接 `)):j(``,!0),C.value?(d(),_(`li`,{key:3,class:`toolItem`,onClick:ue},` 生成嵌入代码 `)):j(``,!0),n[12]||=h(`li`,{class:`divider`},null,-1),h(`li`,{class:`toolItem`,onClick:we},`常用快捷键`),n[13]||=h(`li`,{class:`divider`},null,-1),h(`li`,{class:`toolItem`,onClick:de},`清空代码`)],2)]),h(`div`,{class:`btn`,onClick:ee},[...n[14]||=[h(`span`,{class:`icon iconfont icon-shuaxin`},null,-1),A(` 运行 `,-1)]]),z.value?(d(),_(`div`,{key:1,class:`dropdownBtn`,onClick:n[3]||=N(()=>{},[`stop`])},[E((d(),_(`div`,{class:`btn`,onClick:n[2]||=e=>L(),title:M(X).find(e=>e.id===`save`)?.description},[...n[15]||=[h(`span`,{class:`icon iconfont icon-w_yunduan`},null,-1),A(` 保存 `,-1)]],8,We)),[[i,e.loading]]),h(`ul`,{class:a([`toolList`,{show:P.value}])},[h(`li`,{class:`toolItem`,onClick:U,title:M(X).find(e=>e.id===`save`)?.description},r(J.value),9,Ge),h(`li`,{class:`toolItem`,onClick:te,title:M(X).find(e=>e.id===`save`)?.description},r(ve.value),9,Ke),xe.value?(d(),_(`li`,{key:0,class:`toolItem`,onClick:Z,title:M(X).find(e=>e.id===`saveAsNew`)?.description},` 另存为副本 `,8,qe)):j(``,!0)],2)])):E((d(),_(`div`,{key:2,class:`btn`,onClick:U,title:M(X).find(e=>e.id===`save`)?.description},[...n[16]||=[h(`span`,{class:`icon iconfont icon-w_yunduan`},null,-1),A(` 保存 `,-1)]],8,Je)),[[i,e.loading]]),h(`div`,{class:`dropdownBtn`,onClick:n[7]||=N(()=>{},[`stop`])},[h(`div`,{class:`btn`,onClick:n[4]||=e=>I()},[...n[17]||=[h(`span`,{class:`icon iconfont icon-gengduo`},null,-1)]]),h(`ul`,{class:a([`toolList`,{show:k.value}])},[h(`li`,{class:`toolItem`,onClick:n[5]||=(...e)=>M(ye)&&M(ye)(...e),title:M(X).find(e=>e.id===`newWindow`)?.description},` 新开窗口 `,8,Ye),h(`li`,{class:`toolItem`,onClick:se,title:M(X).find(e=>e.id===`newProject`)?.description},` 新建项目 `,8,Xe),h(`li`,{class:`toolItem`,onClick:_e,title:M(X).find(e=>e.id===`previewInNewWindow`)?.description},` 新窗预览 `,8,Ze),n[18]||=h(`li`,{class:`divider`},null,-1),h(`li`,{class:`toolItem`,onClick:fe},`本地项目`),h(`li`,{class:`toolItem`,onClick:oe},`我的Gist`),h(`li`,{class:`toolItem`,onClick:n[6]||=e=>z.value?ae():ie()},r(z.value?`退出Gist`:`登录Gist`),1),M(x)?(d(),_(`li`,Qe)):j(``,!0),M(x)?(d(),_(`li`,{key:1,class:`toolItem`,onClick:ne},`系统设置`)):j(``,!0)],2)])]),l(Ve,{modelValue:Ce.value,"onUpdate:modelValue":n[8]||=e=>Ce.value=e},null,8,[`modelValue`])],64)}}},[[`__scopeId`,`data-v-243be168`]]),tt=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20153.71%2038'%3e%3cdefs%3e%3cstyle%3e.cls-1,.cls-2{fill:%23409eff;}.cls-1{fill-rule:evenodd;}%3c/style%3e%3c/defs%3e%3ctitle%3e资源%201%3c/title%3e%3cg%20id='图层_2'%20data-name='图层%202'%3e%3cg%20id='图层_1-2'%20data-name='图层%201'%3e%3cpath%20id='Shape-Copy'%20class='cls-1'%20d='M142,26.16s.28,0,.82,0a.72.72,0,0,1,.69.41s1.08,2,1.37,2.48,0,.42-.12.41h0s-.31,0-3.45,0a4.93,4.93,0,0,1-4.54-4.54v-7H134.3V15.28c0-.36.41-.41.41-.41h2.07V12.25a.6.6,0,0,1,.41-.55l2.3-.66c.34-.1.59,0,.59.35V15h3.58c.34,0,.41.41.41.41V18h-4v6.06c0,1.76,1.93,2.07,1.93,2.07Zm-10.6,3h-2.2c-.43,0-.41-.55-.41-.55V18.45c0-.62-.83-.83-.83-.83h-4.54c-.68,0-.69.83-.69.83V28.77a.41.41,0,0,1-.41.42h-2.2c-.48,0-.41-.55-.41-.55V15.83c0-1,1.24-1.24,1.24-1.24h9.63c1,0,1.23,1.24,1.23,1.24V28.5c0,.72-.41.69-.41.69ZM115.73,23.4H107.2v2.07c0,.74,1,1,1,1H115a1.16,1.16,0,0,1,.82.42s.61,1.25.83,1.79-.41.55-.41.55H106c-1.24,0-1.51-1.52-1.51-1.52V16c0-.67,1-1,1-1h10.32c1,0,1.24,1.23,1.24,1.23v5.93c0,1-1.24,1.23-1.24,1.23Zm-1.52-4.95s-.08-.69-.68-.69h-5.65s-.68.18-.68.69V20a.69.69,0,0,0,.68.69h5.65a.9.9,0,0,0,.68-.83V18.45ZM101.28,29.19h-2.2c-.29,0-.41-.42-.41-.42V18.45c0-.64-.83-.83-.83-.83H95.78c-.58,0-.69.83-.69.83V28.77c0,.35-.41.42-.41.42h-2.2c-.31,0-.42-.42-.42-.42V18.45c0-.66-.82-.83-.82-.83H89.17c-.63,0-.68.83-.68.83V28.77a.39.39,0,0,1-.42.42h-2.2a.41.41,0,0,1-.41-.42V15.69c0-.75,1.1-1.1,1.1-1.1h13.76c1.1,0,1.37,1.38,1.37,1.38v12.8c0,.48-.41.42-.41.42Zm-20-5.79H72.8v2.07c0,.74,1,1,1,1h6.88a1.19,1.19,0,0,1,.83.42s.6,1.25.82,1.79-.41.55-.41.55H71.56c-1.24,0-1.51-1.52-1.51-1.52V16c0-.67,1-1,1-1H81.33c1,0,1.24,1.23,1.24,1.23v5.93c0,1-1.24,1.23-1.24,1.23Zm-1.51-4.95s-.09-.69-.69-.69H73.49s-.69.18-.69.69V20a.69.69,0,0,0,.69.69h5.64a.91.91,0,0,0,.69-.83V18.45ZM68,29.19H62.76a4.35,4.35,0,0,1-4.13-4c0-3.91,0-16.1,0-16.1h2.48a.79.79,0,0,1,.82.82V24.37A2.58,2.58,0,0,0,63.86,26h2.2s.72-.23,1.24.69l1.1,1.93s.08.55-.41.55Zm-26.56-.83V10.19a1,1,0,0,1,.69-1H55.05c.73,0,.42.83.42.83s-.41,1.12-.69,1.65a1,1,0,0,1-.83.55H45.56a.77.77,0,0,0-.83.69v4.54h9.5c.55,0,.27.69.27.69s-.71,1.52-1,1.93a1.05,1.05,0,0,1-.83.41h-8v4.82a.91.91,0,0,0,.69.83h8.81a.85.85,0,0,1,.82.41l1.24,1.93c.37.56-.14.69-.14.69H42.26C41.68,29.19,41.43,28.36,41.43,28.36Zm-8.14-1.14c0,1.57-.83,1.93-.83,1.93S18.32,37.31,17.4,37.83a1.68,1.68,0,0,1-1.52,0S1.09,29.25.55,28.87a1.29,1.29,0,0,1-.55-1s0-17,0-17.78S1,8.76,1,8.76L15.75.21a2,2,0,0,1,1.79,0S30.6,7.8,32,8.62a2.08,2.08,0,0,1,1.25,2.06s0,15.07,0,16.54Zm-5.9-17c-3-1.74-10.16-5.87-10.16-5.87a1.58,1.58,0,0,0-1.41,0L4.22,11s-.77.46-.76,1.08S3.46,26,3.46,26a1,1,0,0,0,.43.75c.43.3,12,7,12,7a1.3,1.3,0,0,0,1.19,0c.72-.4,11.82-6.79,11.82-6.79s.65-.28.65-1.51c0-.36,0-1.74,0-3.47L16.53,29.88v-3a3,3,0,0,1,1-2.07l11.56-7a2.49,2.49,0,0,0,.55-1.46c0-1.27,0-2.37,0-3.07L16.53,21.2V18a2.17,2.17,0,0,1,.83-1.79Z'/%3e%3cpath%20class='cls-1'%20d='M150.32,11.21h-2.24v-5c0-.11.12-.21.29-.24l1.44-.26c.26,0,.51.07.51.24Z'/%3e%3cpath%20class='cls-1'%20d='M148.08,9h2.24v5.11c0,.11-.11.21-.28.25l-1.45.26c-.26.05-.51-.07-.51-.24Z'/%3e%3cpath%20class='cls-2'%20d='M145.09,9h8.22a.4.4,0,0,1,.4.4v1.85a0,0,0,0,1,0,0h-9a0,0,0,0,1,0,0V9.36A.4.4,0,0,1,145.09,9Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e`,nt=`data:image/png;base64,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`,rt=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='-11.5%20-10.23174%2023%2020.46348'%3e%3ctitle%3eReact%20Logo%3c/title%3e%3ccircle%20cx='0'%20cy='0'%20r='2.05'%20fill='%2361dafb'/%3e%3cg%20stroke='%2361dafb'%20stroke-width='1'%20fill='none'%3e%3cellipse%20rx='11'%20ry='4.2'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='rotate(60)'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='rotate(120)'/%3e%3c/g%3e%3c/svg%3e`,it=``+new URL(`element-iru5vMx6.svg`,import.meta.url).href,at=``+new URL(`echarts-DbDI3Y3H.png`,import.meta.url).href,ot=``+new URL(`g2-DW7PXhRC.png`,import.meta.url).href,st=``+new URL(`angular-BipNjDrd.png`,import.meta.url).href,ct=``+new URL(`vant-CzXYZSVD.png`,import.meta.url).href,lt=``+new URL(`leaflet-AUiTHFZX.png`,import.meta.url).href,ut=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAeCAMAAADQFyqnAAAAP1BMVEUNgs0Ngs0Lgs4Ng8wNg80GhNAA3P8Mgs0AjeUNgs0Ogs0Ig9AKgtANgs0Lg84Ngs0Ng80Ngs0Ngs0Mgs4Og804MxNHAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfhDBwDMAeNl3qoAAABKklEQVRIx+2V4W7EIAiAMSUxNmlMDO//rOuVqiic7XXdlizlj4DgpxYpwCOP/IY4esmqbCMF9rLBc8SuVPTq5YD0UqdNjfuqnvM/AIMEk/QhGZFk7Ebk3wmmT8B0BzjsFg7A2KenG8C+mMIbN3XJGaDSj8FRg/MYW3BTclmfVDYekFGewgZPLZgscFPF7OO9+DG4v5lsuLqeDV4kWCanvt5G4OptwCTAkey7sa7LnQaTAqceDLMFnk0wngePcn3zikskby2px/RNsD6x6kq10MF6iwfgADYYDPCbJnUVvH+8ZFXwEFw+ursIBgU5B1Z92f8t2OeZ8AbsS3O6CnYdGNvA5cfAu10AqbTZ4Q/K0zzhEjls1eoEsvtY1rQgWvLMLQW6Bv7II/9SvgBfPlMV5cTAeAAAAABJRU5ErkJggg==`,dt=`data:image/webp;base64,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`,ft=``+new URL(`mindMap-DL3dkWy7.png`,import.meta.url).href,pt=[{name:`默认模版`,icon:nt,code:Y},{name:`思维导图`,icon:ft,code:{HTML:{language:`html`,content:`<div id="mindMapContainer"></div>`,resources:[]},CSS:{language:`css`,content:`
#mindMapContainer {
  width: 800px;
  height: 500px;
}

#mindMapContainer * {
  margin: 0;
  padding: 0;
}          
`,resources:[{name:`simple-mind-map`,url:`https://unpkg.com/simple-mind-map@0.6.3/dist/simpleMindMap.esm.css`}]},JS:{language:`javascript`,content:`
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById('mindMapContainer'),
  data: {
    "data": {
        "text": "根节点"
    },
    "children": []
  }
});
          `,resources:[{name:``,url:``}],importMap:`
{
    "imports": {
        "simple-mind-map": "https://unpkg.com/simple-mind-map@0.6.3/dist/simpleMindMap.esm.js"
    }
}
            `},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`使用ES6模块语法`,icon:dt,code:{HTML:{language:`html`,content:`<div id="app">
{{ message }}
</div>`,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:`import Vue from 'vue'
import moment from 'moment'
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello ' + moment().format('YYYY')
    }
})`,resources:[],importMap:`
{
    "imports": {
        "vue": "https://unpkg.com/vue@2.7.14/dist/vue.esm.browser.min.js"
    }
}
            `},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`Vue 3单文件`,isVueSFC:!0,icon:nt,code:{HTML:{language:`html`,content:``,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:``,resources:[],importMap:`
{
    "imports": {
        "vue": "https://unpkg.com/vue@3.3.4/dist/vue.esm-browser.js"
    }
}
            `},VUE:{language:`vue3`,content:`<template>
    <h1>{{ msg }}</h1>
    <input v-model="msg">
</template>

<script setup>
import { ref, createApp } from 'vue'
import moment from 'moment'
// 导出createApp是必须的
const msg = ref('Hello World!' + moment().format('YYYY'))
<\/script>

<style lang="less">
h1 {
    color: red;
}
</style>  
            `,resources:[]}}},{name:`Vue 2单文件 ESM版`,isVueSFC:!0,icon:nt,code:{HTML:{language:`html`,content:``,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:``,resources:[],importMap:`
{
    "imports": {
        "vue": "https://unpkg.com/vue@2.7.14/dist/vue.esm.browser.js"
    }
}
            `},VUE:{language:`vue2`,content:`
<template>
    <div>
        <div class="example">{{ msg }}</div>
        <input v-model="msg">
    </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

export default {
    data () {
        return {
            msg: 'Hello world!' + moment().format('YYYY')
        }
    }
}
<\/script>

<style>
.example {
    color: red;
}
</style>  
            `,resources:[]}}},{name:`Vue 2单文件`,isVueSFC:!0,icon:nt,code:{HTML:{language:`html`,content:``,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:``,resources:[{name:`Vue 2`,url:`https://unpkg.com/vue@2.6.14/dist/vue.js`}]},VUE:{language:`vue2`,content:`
<template>
    <div>
        <div class="example">{{ msg }}</div>
        <input v-model="msg">
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello world!'
        }
    }
}
<\/script>

<style>
.example {
    color: red;
}
</style>  
            `,resources:[]}}},{name:`Vue 3`,icon:nt,code:{HTML:{language:`html`,content:`<div id="hello-vue" class="demo">
{{ message }}
</div>`,resources:[]},CSS:{language:`css`,content:`.demo {
font-family: sans-serif;
border: 1px solid #eee;
border-radius: 2px;
padding: 20px 30px;
margin-top: 1em;
margin-bottom: 40px;
user-select: none;
overflow-x: auto;
}`,resources:[]},JS:{language:`javascript`,content:`const HelloVueApp = {
data() {
    return {
    message: 'Hello Vue!!'
    }
}
}

Vue.createApp(HelloVueApp).mount('#hello-vue')`,resources:[{name:`Vue 3`,url:`https://unpkg.com/vue@3.3.4/dist/vue.global.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`Vue 2`,icon:nt,code:{HTML:{language:`html`,content:`<div id="app">
{{ message }}
</div>`,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:`var app = new Vue({
el: '#app',
data: {
    message: 'Hello Vue!'
}
})`,resources:[{name:`Vue 2`,url:`https://unpkg.com/vue@2.7.14/dist/vue.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`React`,icon:rt,code:{HTML:{language:`html`,content:`<div id="root"></div>`,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`babel`,content:`ReactDOM.render(
<h1>Hello, world!</h1>,
document.getElementById('root')
);`,resources:[{name:`React`,url:`https://unpkg.com/react@18.2.0/umd/react.development.js`},{name:`react-dom`,url:`https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`element-plus`,icon:tt,code:{HTML:{language:`html`,content:`<div id="app">
<el-button>{{ message }}</el-button>
</div>`,resources:[]},CSS:{language:`css`,content:``,resources:[{name:`element-plus`,url:`https://unpkg.com/element-plus@2.3.7/dist/index.css`}]},JS:{language:`javascript`,content:`const App = {
data() {
    return {
    message: "Hello Element Plus",
    };
},
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");`,resources:[{name:`Vue 3`,url:`https://unpkg.com/vue@3.3.4/dist/vue.global.js`},{name:`element-plus`,url:`https://unpkg.com/element-plus@2.3.7/dist/index.full.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`element-ui`,icon:it,code:{HTML:{language:`html`,content:`<div id="app">
<el-button @click="visible = true">按钮</el-button>
<el-dialog :visible.sync="visible" title="Hello world">
    <p>欢迎使用 Element</p>
</el-dialog>
</div>`,resources:[]},CSS:{language:`css`,content:``,resources:[{name:`element-ui`,url:`https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css`}]},JS:{language:`javascript`,content:`new Vue({
el: '#app',
data: function() {
    return { visible: false }
}
})`,resources:[{name:`Vue 2`,url:`https://unpkg.com/vue@2.7.14/dist/vue.js`},{name:`element-ui`,url:`https://unpkg.com/element-ui@2.15.13/lib/index.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`ECharts`,icon:at,code:{HTML:{language:`html`,content:`<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="width: 600px;height:400px;"></div>`,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:`// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
title: {
    text: 'ECharts 入门示例'
},
tooltip: {},
legend: {
    data:['销量']
},
xAxis: {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
},
yAxis: {},
series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
}]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);`,resources:[{name:`ECharts`,url:`https://unpkg.com/echarts@5.4.2/dist/echarts.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`G2`,icon:ot,code:{HTML:{language:`html`,content:`<div id="container"></div>`,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:`const data = [
    { type: '未知', value: 654, percent: 0.02 },
    { type: '17 岁以下', value: 654, percent: 0.02 },
    { type: '18-24 岁', value: 4400, percent: 0.2 },
    { type: '25-29 岁', value: 5300, percent: 0.24 },
    { type: '30-39 岁', value: 6200, percent: 0.28 },
    { type: '40-49 岁', value: 3300, percent: 0.14 },
    { type: '50 岁以上', value: 1500, percent: 0.06 },
];

const chart = new G2.Chart({
    container: 'container',
    autoFit: true,
    height: 500,
    padding: [50, 20, 50, 20],
    });
    chart.data(data);
    chart.scale('value', {
    alias: '销售额(万)',
});

chart.axis('type', {
    tickLine: {
        alignTick: false,
    },
});
chart.axis('value', false);

chart.tooltip({
    showMarkers: false, 
});
chart.interval().position('type*value');
chart.interaction('element-active');

// 添加文本标注
data.forEach((item) => {
    chart
        .annotation()
        .text({
        position: [item.type, item.value],
        content: item.value,
        style: {
            textAlign: 'center',
        },
        offsetY: -30,
        })
        .text({
        position: [item.type, item.value],
        content: (item.percent * 100).toFixed(0) + '%',
        style: {
            textAlign: 'center',
        },
        offsetY: -12,
        });
});
chart.render();`,resources:[{name:`g2`,url:`https://unpkg.com/@antv/g2@4.2.10/dist/g2.min.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`Angular 1.x`,icon:st,code:{HTML:{language:`html`,content:`<div ng-app="">
    <p>名字 : <input type="text" ng-model="name"></p>
    <h1>Hello {{name}}</h1>
    <p ng-bind="name"></p>
</div>`,resources:[]},CSS:{language:`css`,content:``,resources:[]},JS:{language:`javascript`,content:``,resources:[{name:`angular`,url:`https://unpkg.com/angular@1.8.3/angular.min.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`Vant`,icon:ct,code:{HTML:{language:`html`,content:`
<div id="app"></div>            
            `,resources:[]},CSS:{language:`css`,content:``,resources:[{name:`vant`,url:`https://unpkg.com/vant@2.12.54/lib/index.css`}]},JS:{language:`javascript`,content:`// 在 #app 标签下渲染一个按钮组件
new Vue({
    el: '#app',
    template: '<van-button>按钮</van-button>',
});

// 调用函数组件，弹出一个 Toast
vant.Toast('提示');

// 通过 CDN 引入时不会自动注册 Lazyload 组件
// 可以通过下面的方式手动注册
Vue.use(vant.Lazyload);`,resources:[{name:`Vue 2`,url:`https://unpkg.com/vue@2.7.14/dist/vue.js`},{name:`vant`,url:`https://unpkg.com/vant@2.12.54/lib/vant.min.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`Leaflet`,icon:lt,code:{HTML:{language:`html`,content:`<div id="mapid"></div>`,resources:[]},CSS:{language:`css`,content:`#mapid { height: 180px; }`,resources:[{name:`leaflet`,url:`https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`}]},JS:{language:`javascript`,content:`const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
}).addTo(mymap);`,resources:[{name:`leaflet`,url:`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}},{name:`Konva`,icon:ut,code:{HTML:{language:`html`,content:`<div id="container"></div>`,resources:[]},CSS:{language:`css`,content:`.container {
    width: 500px;
    height: 500px;
}`,resources:[]},JS:{language:`javascript`,content:`// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 500,
    height: 500
});

// then create layer
var layer = new Konva.Layer();

// create our shape
var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

// add the shape to the layer
layer.add(circle);

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();`,resources:[{name:`konva`,url:`https://unpkg.com/konva@9.2.0/konva.min.js`}]},VUE:{language:`vue2`,content:``,resources:[]}}}],mt={class:`templateList`},ht=[`onClick`],gt={class:`name`},_t=Z({__name:`TemplateDialog`,props:{modelValue:Boolean},emits:[`update:modelValue`],setup(e,{emit:t}){let i=q(),a=e,c=t,l=b({get:()=>a.modelValue,set:e=>c(`update:modelValue`,e)}),{proxy:u}=s(),p=S(),m=O(pt),g=b(()=>p.state.editData.config.layout),y=e=>{e.isVueSFC?g.value!==`vue`&&p.commit(`setLayout`,`vue`):g.value===`vue`&&p.commit(`setLayout`,`default`)},x=e=>{y(e),n(()=>{p.commit(`setCode`,JSON.parse(JSON.stringify(e.code))),u.$eventEmitter.emit(`reset_code`),l.value=!1})};return(e,t)=>(d(),k(M(F),{title:`选择模板`,modelValue:l.value,"onUpdate:modelValue":t[0]||=e=>l.value=e,width:M(i)?`100%`:`760`},{default:C(()=>[h(`div`,mt,[(d(!0),_(v,null,o(m.value,e=>(d(),_(`div`,{class:`templateItem`,key:e.name,onClick:t=>x(e)},[h(`div`,{class:`icon`,style:f({backgroundImage:`url(${e.icon})`})},null,4),h(`div`,gt,r(e.name),1)],8,ht))),128))])]),_:1},8,[`modelValue`,`width`]))}},[[`__scopeId`,`data-v-e12ee4b7`]]),vt={class:`settingRow`},yt={class:`content`},bt={class:`control`},xt={class:`settingRow`},St={class:`content`},Ct={class:`control`},wt={class:`settingRow`},Tt={class:`content`},Et={class:`control`},Dt={class:`settingRow resetSection`},Ot=Z({__name:`Setting`,setup(e){let t=()=>{let e=S();return{store:e,config:e.state.editData.config}},n=({store:e,config:t})=>{let n=O(!1);return n.value=t.keepPreviousLogs,y(()=>t.keepPreviousLogs,e=>{n.value=e}),{keepPreviousLogs:n,keepPreviousLogsChange:t=>{e.commit(`setKeepPreviousLogs`,t)}}},r=({store:e,config:t})=>{let n=O(!1);return n.value=t.autoRun,y(()=>t.autoRun,e=>{n.value=e}),{autoRun:n,autoRunChange:t=>{e.commit(`setAutoRun`,t)}}},i=({store:e,config:t})=>{let n=O(!1);return n.value=t.openAlmightyConsole,y(()=>t.openAlmightyConsole,e=>{n.value=e}),{openAlmightyConsole:n,openAlmightyConsoleChange:t=>{e.commit(`setOpenAlmightyConsole`,t)}}},a=({store:e})=>({handleResetSettings:async()=>{try{await H.confirm(`确定要将所有设置恢复到默认状态吗？此操作不可撤销。`,`警告`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`warning`}),e.commit(`resetToDefaultSettings`),W.success(`已恢复默认设置，即将刷新页面...`),setTimeout(()=>{window.location.reload()},2e3)}catch{}}}),{store:o,config:s}=t(),{keepPreviousLogs:c,keepPreviousLogsChange:u}=n({store:o,config:s}),{autoRun:f,autoRunChange:p}=r({store:o,config:s}),{openAlmightyConsole:m,openAlmightyConsoleChange:v}=i({store:o,config:s}),{handleResetSettings:b}=a({store:o});return(e,t)=>(d(),_(`div`,null,[h(`div`,vt,[h(`div`,yt,[t[3]||=h(`span`,{class:`name`},`自动运行`,-1),h(`div`,bt,[l(M(V),{modelValue:M(f),"onUpdate:modelValue":t[0]||=e=>g(f)?f.value=e:null,onChange:M(p)},null,8,[`modelValue`,`onChange`])])]),t[4]||=h(`div`,{class:`desc`},`停止输入后1秒自动运行`,-1)]),h(`div`,xt,[h(`div`,St,[t[5]||=h(`span`,{class:`name`},`保留之前的日志`,-1),h(`div`,Ct,[l(M(V),{modelValue:M(c),"onUpdate:modelValue":t[1]||=e=>g(c)?c.value=e:null,onChange:M(u)},null,8,[`modelValue`,`onChange`])])]),t[6]||=h(`div`,{class:`desc`},`关闭后每次重新运行都会清空日志`,-1)]),h(`div`,wt,[h(`div`,Tt,[t[7]||=h(`span`,{class:`name`},`开启全能调试`,-1),h(`div`,Et,[l(M(V),{modelValue:M(m),"onUpdate:modelValue":t[2]||=e=>g(m)?m.value=e:null,onChange:M(v)},null,8,[`modelValue`,`onChange`])])]),t[8]||=h(`div`,{class:`desc`},` 预览页面右下角会出现一个按钮，点击即可打开全能调试控制台 `,-1)]),h(`div`,Dt,[l(M(L),{type:`danger`,onClick:M(b)},{default:C(()=>[...t[9]||=[A(`恢复默认设置`,-1)]]),_:1},8,[`onClick`]),t[10]||=h(`div`,{class:`desc`},`将所有设置恢复到默认状态`,-1)])]))}},[[`__scopeId`,`data-v-d654a9ea`]]),kt={class:`settingRow`},At={class:`content`},jt={class:`control`},Mt={key:0,class:`previewImg`},Nt=[`src`],Pt=Z({__name:`SettingLayout`,setup(e){let t=()=>({store:S()}),n=({store:e})=>{let t=b(()=>se[n.value]),n=O(``);return n.value=e.state.editData.config.layout,{previewImg:t,layout:n,confirm:()=>{e.commit(`setLayout`,n.value)},layoutChange:t=>{e.commit(`setLayout`,t)}}},{store:r}=t(),{previewImg:i,layout:a,confirm:s,layoutChange:c}=n({store:r});return(e,t)=>(d(),_(`div`,null,[h(`div`,kt,[h(`div`,At,[t[1]||=h(`span`,{class:`name`},`布局`,-1),h(`div`,jt,[l(M(ie),{modelValue:M(a),"onUpdate:modelValue":t[0]||=e=>g(a)?a.value=e:null,onChange:M(c),style:{"min-width":`200px`}},{default:C(()=>[(d(!0),_(v,null,o(M(le),(e,t)=>(d(),_(v,{key:t},[e.type===`divider`?(d(),k(M(z),{key:0})):(d(),k(M(ne),{key:1,label:e.name,value:e.value},null,8,[`label`,`value`]))],64))),128))]),_:1},8,[`modelValue`,`onChange`])])])]),M(i)?(d(),_(`div`,Mt,[h(`img`,{src:M(i),alt:``},null,8,Nt)])):j(``,!0)]))}},[[`__scopeId`,`data-v-1a19a4e9`]]),Ft={class:`settingRow`},It={class:`control`},Lt={class:`settingRow uploadThemeBox`},Rt={class:`right`},zt={class:`settingRow`},Bt={class:`control`},Vt={class:`settingRow`},Ht={class:`control`},Ut=Z({__name:`SettingTheme`,setup(e){let t=()=>{let e=S();return{store:e,config:e.state.editData.config}},n=({store:e,config:t})=>{let n=O(``);return n.value=t.codeTheme,y(()=>t.codeTheme,e=>{n.value=e}),{codeTheme:n,codeThemeChange:async t=>{e.commit(`setCodeTheme`,t)}}},r=({store:e,config:t})=>{let n=O(!1);return n.value=t.pageThemeSyncCodeTheme,y(n,t=>{e.commit(`setPageThemeSyncCodeTheme`,t)}),{pageThemeSyncCodeTheme:n}},i=({store:e,config:t})=>{let n=O(0);return n.value=t.codeFontSize,y(()=>t.codeFontSize,e=>{n.value=e}),{codeFontSize:n,codeFontSizeChange:async t=>{e.commit(`setCodeFontSize`,t)}}},a=O(null),s=({codeTheme:e,codeThemeChange:t})=>{let n=O(``),r=O(``),i=1,o=e=>{r.value=e.name.replace(/\..*$/,``);let t=new FileReader;t.readAsText(e),t.onload=()=>{n.value=t.result},t.onerror=()=>{W.error(`文件上传失败，请检查文件是否存在`)}},s=()=>{a.value.click()},c=e=>{let t=e.target.files[0];o(t)},l=e=>{e.preventDefault();let t=e.dataTransfer.files[0];o(t)},u=e=>{e.preventDefault()},d=null;return y(n,n=>{n&&(clearTimeout(d),d=setTimeout(()=>{try{let a=fe(n);r.value=r.value||`CustomTheme`+ i++,Se.push({name:_e(r.value),value:r.value,custom:!0,loaded:!0,cache:a}),e.value=r.value,t(r.value),r.value=``}catch(e){console.log(e),W.error(`解析失败，请检查主题内容是否正确`)}},500))}),{themeText:n,selectFile:s,fileChange:c,onDrop:l,onDragOver:u}},{store:c,config:u}=t(),{codeTheme:f,codeThemeChange:p}=n({store:c,config:u}),{pageThemeSyncCodeTheme:m}=r({store:c,config:u}),{codeFontSize:b,codeFontSizeChange:x}=i({store:c,config:u}),{themeText:w,selectFile:T,fileChange:E,onDrop:D,onDragOver:A}=s({codeTheme:f,codeThemeChange:p});return(e,t)=>(d(),_(`div`,null,[h(`div`,Ft,[t[8]||=h(`span`,{class:`name`},`代码主题`,-1),h(`div`,It,[l(M(ie),{modelValue:M(f),"onUpdate:modelValue":t[0]||=e=>g(f)?f.value=e:null,onChange:M(p),style:{"min-width":`160px`}},{default:C(()=>[(d(!0),_(v,null,o(M(Se),e=>(d(),k(M(ne),{key:e.value,label:e.name,value:e.value},null,8,[`label`,`value`]))),128))]),_:1},8,[`modelValue`,`onChange`])])]),h(`div`,Lt,[h(`div`,{class:`left`,onClick:t[2]||=(...e)=>M(T)&&M(T)(...e),onDrop:t[3]||=(...e)=>M(D)&&M(D)(...e),onDragover:t[4]||=(...e)=>M(A)&&M(A)(...e)},[t[9]||=h(`span`,{class:`tip`},`点击上传主题文件或将文件拖动到此上传`,-1),h(`input`,{type:`file`,class:`fileInput`,ref_key:`fileInput`,ref:a,onChange:t[1]||=(...e)=>M(E)&&M(E)(...e)},null,544)],32),h(`div`,Rt,[l(M(K),{class:`textarea`,modelValue:M(w),"onUpdate:modelValue":t[5]||=e=>g(w)?w.value=e:null,type:`textarea`,placeholder:`粘贴主题数据`},null,8,[`modelValue`])])]),h(`div`,zt,[t[10]||=h(`span`,{class:`name`},`页面主题是否同步代码主题`,-1),h(`div`,Bt,[l(M(V),{modelValue:M(m),"onUpdate:modelValue":t[6]||=e=>g(m)?m.value=e:null},null,8,[`modelValue`])])]),h(`div`,Vt,[t[11]||=h(`span`,{class:`name`},`代码字号`,-1),h(`div`,Ht,[l(M(ie),{modelValue:M(b),"onUpdate:modelValue":t[7]||=e=>g(b)?b.value=e:null,size:`small`,onChange:M(x),style:{"min-width":`66px`}},{default:C(()=>[(d(!0),_(v,null,o(M(ce),e=>(d(),k(M(ne),{key:e.value,label:e.name,value:e.value},null,8,[`label`,`value`]))),128))]),_:1},8,[`modelValue`,`onChange`])])])]))}},[[`__scopeId`,`data-v-342624b0`]]),Wt={class:`about-container`},Gt={class:`links`},Kt={class:`link-item`},qt=[`href`],Jt={class:`link-item`},Yt=[`href`],Xt={class:`version-info`},Zt=[`href`],Qt=Z({__name:`SettingAbout`,setup(e){return(e,t)=>(d(),_(`div`,Wt,[t[3]||=h(`h2`,null,`CodeFlux`,-1),h(`p`,null,r(M(J).description),1),h(`div`,Gt,[h(`div`,Kt,[t[0]||=h(`span`,{class:`link-label`},`GitHub:`,-1),h(`a`,{href:M(J).repository.url,target:`_blank`},r(M(J).repository.url),9,qt)]),h(`div`,Jt,[t[1]||=h(`span`,{class:`link-label`},`官网:`,-1),h(`a`,{href:M(J).homepage,target:`_blank`},r(M(J).homepage),9,Yt)])]),h(`div`,Xt,[h(`p`,null,[t[2]||=A(` 当前版本: `,-1),h(`a`,{href:M(J).repository.url},r(M(J).version),9,Zt)])])]))}},[[`__scopeId`,`data-v-4df03e25`]]),$t={class:`setting-initial-code`},en={class:`setting-section`},tn={class:`setting-header`},nn={class:`setting-actions`},rn={class:`code-editors`},an={class:`editor-header`},on=Z({__name:`SettingInitialCode`,setup(e){let t=S(),n=O({HTML:Y.HTML.content,CSS:Y.CSS.content,JS:Y.JS.content});u(()=>{try{let e=localStorage.getItem(`codeRun:initialCode`);if(e){let t=JSON.parse(e);Object.keys(n.value).forEach(e=>{n.value[e]=t[e].content})}else Object.keys(n.value).forEach(e=>{n.value[e]=Y[e].content})}catch(e){console.error(`初始化代码内容失败:`,e)}});let i=(e,n)=>{t.commit(`setInitialCode`,{type:e,content:n})},a=async()=>{try{await H.confirm(`确定要清空所有初始代码吗？`,`警告`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`warning`}),Object.keys(n.value).forEach(e=>{n.value[e]=``,t.commit(`setInitialCode`,{type:e,content:``})}),W.success(`已清空所有代码`)}catch{}},s=async()=>{try{await H.confirm(`确定要恢复默认代码吗？`,`警告`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`warning`}),t.commit(`resetInitialCode`),Object.keys(n.value).forEach(e=>{n.value[e]=Y[e].content}),W.success(`已恢复默认代码`)}catch{}};return(e,t)=>(d(),_(`div`,$t,[h(`div`,en,[h(`div`,tn,[t[2]||=h(`h3`,null,`初始代码设置`,-1),h(`div`,nn,[l(M(L),{size:`small`,onClick:a},{default:C(()=>[...t[0]||=[A(`清空代码`,-1)]]),_:1}),l(M(L),{size:`small`,type:`primary`,onClick:s},{default:C(()=>[...t[1]||=[A(`恢复默认`,-1)]]),_:1})])]),h(`div`,rn,[(d(),_(v,null,o([`HTML`,`CSS`,`JS`],e=>h(`div`,{key:e,class:`code-editor-item`},[h(`div`,an,r(e),1),l(M(K),{modelValue:n.value[e],"onUpdate:modelValue":t=>n.value[e]=t,type:`textarea`,autosize:{minRows:2,maxRows:2},placeholder:`请输入${e}初始代码`,resize:`vertical`,onChange:t=>i(e,t)},null,8,[`modelValue`,`onUpdate:modelValue`,`placeholder`,`onChange`])])),64))])])]))}},[[`__scopeId`,`data-v-da4d68b7`]]),sn={class:`setting-callback`},cn={class:`setting-section`},ln={class:`setting-header`},un={class:`setting-actions`},dn={class:`callback-editor`},fn=`// 示例脚本:
function onSaveSuccess(saveInfo) {
  const { type, id, data, mode } = saveInfo
  console.log('保存类型:', type)
  console.log('保存ID:', id)
  
  // 可以执行自定义操作
  if (type === 'gist') {
    // 处理 Gist 保存
    console.log('Gist保存成功，ID:', id)
  } else {
    // 处理本地保存
    console.log('本地保存成功，ID:', id)
  }
}

// 或者直接编写代码:
console.log('保存成功:', saveInfo.type, saveInfo.id);
`,pn=Z({__name:`SettingCallback`,setup(e){let n=S(),r=O(n.state.privateConfig.saveCallback||``),i=e=>{n.commit(`setSaveCallback`,e)},a=async()=>{try{await H.confirm(`确定要清空回调脚本吗？`,`警告`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`warning`}),r.value=``,n.commit(`setSaveCallback`,``),W.success(`已清空回调脚本`)}catch{}},o=()=>{try{let e={type:`local`,id:`test-id`,data:{title:`Test`},mode:`create`,routeName:`LocalEdit`},t=r.value.trim();if(!t){W.warning(`脚本内容为空`);return}Function(`saveInfo`,`console`,`alert`,`
      try {
        ${t}
        
        if (typeof onSaveSuccess === 'function') {
          onSaveSuccess(saveInfo);
        }
      } catch (error) {
        console.error('回调执行错误:', error);
        throw error;
      }
    `)(e,console,alert),W.success(`测试运行成功`)}catch(e){W.error(`测试运行失败: ${e.message}`)}},s=()=>{r.value.trim()?H.confirm(`这将覆盖当前的回调脚本，是否继续？`,`提示`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`warning`}).then(()=>{r.value=fn.trim(),n.commit(`setSaveCallback`,fn.trim()),W.success(`已加载示例代码`)}).catch(()=>{}):(r.value=fn.trim(),n.commit(`setSaveCallback`,fn.trim()),W.success(`已加载示例代码`))};return(e,n)=>(d(),_(`div`,sn,[h(`div`,cn,[h(`div`,ln,[n[4]||=h(`h3`,null,`保存回调设置`,-1),h(`div`,un,[l(M(L),{size:`small`,onClick:s},{default:C(()=>[...n[1]||=[A(`使用示例代码`,-1)]]),_:1}),l(M(L),{size:`small`,onClick:a},{default:C(()=>[...n[2]||=[A(`清空脚本`,-1)]]),_:1}),l(M(L),{size:`small`,type:`primary`,onClick:o},{default:C(()=>[...n[3]||=[A(`测试运行`,-1)]]),_:1})])]),h(`div`,dn,[l(M(K),{modelValue:r.value,"onUpdate:modelValue":n[0]||=e=>r.value=e,type:`textarea`,rows:10,placeholder:fn,onChange:i},null,8,[`modelValue`])]),n[5]||=t(`<div class="callback-tips" data-v-7e5e588a><p data-v-7e5e588a>说明:</p><ul data-v-7e5e588a><li data-v-7e5e588a>脚本将在保存成功后执行，以便跟外部系统联动或拓展个性化能力</li><li data-v-7e5e588a>可以通过 saveInfo 参数获取保存相关信息:</li><li data-v-7e5e588a>- type: 保存类型 (&#39;local&#39;/&#39;gist&#39;)</li><li data-v-7e5e588a>- id: 保存后的ID</li><li data-v-7e5e588a>- data: 完整的保存数据</li><li data-v-7e5e588a>- mode: 保存模式 (&#39;create&#39;/&#39;update&#39;)</li><li data-v-7e5e588a>- routeName: 路由名称</li><li data-v-7e5e588a>- previewDoc: 预览文档</li></ul></div>`,1)])]))}},[[`__scopeId`,`data-v-7e5e588a`]]),mn={class:`settingBox`},hn={class:`settingContent`},gn=Z({__name:`SettingDialog`,props:{modelValue:Boolean},emits:[`update:modelValue`],setup(e,{emit:t}){let n=q(),r=e,i=t,a=b({get:()=>r.modelValue,set:e=>i(`update:modelValue`,e)}),o=O(`layout`),s=T({theme:Ut,layout:Pt,"initial-code":on,callback:pn,setting:Ot,about:Qt});return(e,t)=>(d(),k(M(F),{"custom-class":`settingDialog`,title:`设置`,width:M(n)?`100%`:`600`,modelValue:a.value,"onUpdate:modelValue":t[1]||=e=>a.value=e},{default:C(()=>[h(`div`,mn,[l(M(U),{"tab-position":M(n)?`top`:`left`,modelValue:o.value,"onUpdate:modelValue":t[0]||=e=>o.value=e},{default:C(()=>[l(M(I),{label:`布局设置`,name:`layout`}),l(M(I),{label:`主题设置`,name:`theme`}),l(M(I),{label:`初始代码`,name:`initial-code`}),l(M(I),{label:`保存回调`,name:`callback`}),l(M(I),{label:`其他设置`,name:`setting`}),l(M(I),{label:`关于`,name:`about`})]),_:1},8,[`tab-position`,`modelValue`]),h(`div`,hn,[(d(),k(p(s.value[o.value])))])])]),_:1},8,[`width`,`modelValue`]))}},[[`__scopeId`,`data-v-28b3682e`]]),_n=e(pe()),vn={html:`html`,pug:`pug`,javascript:`js`,babel:`js`,typescript:`ts`,coffeescript:`coffee`,css:`css`,less:`less`,scss:`scss`,stylus:`styl`,postcss:`css`,vue:`vue`,vue2:`vue`,vue3:`vue`},yn=e=>e.replace(/<script[^>]*data-assist-code="true"[^>]*>[\s\S]*?<\/script>/g,``).replace(/<style[^>]*>\s*<\/style>/g,``).replace(/<script(?![^>]*src\s*=\s*["'][^"']*["'])[^>]*>\s*<\/script>/gi,``),bn=async e=>{let t=e.value.code.HTML.content,n=e.value.code.HTML.language,r=e.value.code.JS.content,i=e.value.code.JS.language,a=e.value.code.CSS.content,o=e.value.code.CSS.language,s=new _n.default;return s.folder(`src`),s.file(`src/index.`+vn[n],t),s.file(`src/script.`+vn[i],r),s.file(`src/style.`+vn[o],a),s.folder(`dist`),s.file(`dist/index.html`,yn(be.state.previewDoc)),s},xn=async e=>{let t=e.value.code.VUE.content,n=e.value.code.VUE.language,r=new _n.default;return r.folder(`src`),r.file(`src/index.`+vn[n],t),r.folder(`dist`),r.file(`dist/index.html`,yn(be.state.previewDoc)),r},Sn=async(e,t)=>{let n=null;switch(e.value.config.layout){case`vue`:n=await xn(e);break;default:n=await bn(e)}n.generateAsync({type:`blob`}).then(e=>{Pe(e,t+`.zip`,{autoBom:!0})})},Cn={class:`dialog-footer`},wn={__name:`ExportDialog`,props:{modelValue:Boolean},emits:[`update:modelValue`],setup(e,{expose:t,emit:n}){let r=q(),i=e,a=n,o=b({get:()=>i.modelValue,set:e=>a(`update:modelValue`,e)}),s=S(),c=O(``),u=b(()=>s.state.editData),f=()=>{if(c.value.trim()===``){W.warning({message:`请输入文件名`,type:`warning`});return}o.value=!1,Sn(u,c.value.trim())};return t({open:()=>{c.value=s.state.editData.title||``}}),(e,t)=>(d(),k(M(F),{title:`输入导出文件名称`,modelValue:o.value,"onUpdate:modelValue":t[2]||=e=>o.value=e,width:M(r)?`100%`:`600`},{footer:C(()=>[h(`span`,Cn,[l(M(L),{onClick:t[1]||=e=>o.value=!1},{default:C(()=>[...t[3]||=[A(`取 消`,-1)]]),_:1}),l(M(L),{type:`primary`,onClick:f},{default:C(()=>[...t[4]||=[A(`确 定`,-1)]]),_:1})])]),default:C(()=>[l(M(K),{modelValue:c.value,"onUpdate:modelValue":t[0]||=e=>c.value=e},null,8,[`modelValue`])]),_:1},8,[`modelValue`,`width`]))}},Tn={class:`dialog-footer`},En=Z({__name:`GithubTokenDialog`,props:{modelValue:Boolean},emits:[`update:modelValue`],setup(e,{emit:t}){let n=q(),r=e,i=t,a=b({get:()=>r.modelValue,set:e=>i(`update:modelValue`,e)}),o=S(),s=D(),c=w(),u=O(``),f=()=>{let e=u.value;if(!e){W.warning(`请输入token`);return}o.dispatch(`saveGithubToken`,e),a.value=!1,u.value=``,c.name===`Editor`&&c.query.data&&s.replace({name:`Editor`})},p=()=>{a.value=!1,u.value=``};return(e,t)=>(d(),k(M(F),{title:`请输入您的github token`,modelValue:a.value,"onUpdate:modelValue":t[1]||=e=>a.value=e,width:M(n)?`100%`:`600`},{footer:C(()=>[h(`span`,Tn,[l(M(L),{onClick:p},{default:C(()=>[...t[2]||=[A(`取 消`,-1)]]),_:1}),l(M(L),{type:`primary`,onClick:f},{default:C(()=>[...t[3]||=[A(`确 定`,-1)]]),_:1})])]),default:C(()=>[l(M(K),{modelValue:u.value,"onUpdate:modelValue":t[0]||=e=>u.value=e,type:`password`,"show-password":``,placeholder:`请输入您的Token`},null,8,[`modelValue`]),t[4]||=h(`p`,{class:`tip`},[A(` 如果你没有创建过github token，或者忘记了之前创建的，可以去创建一个新的`),h(`a`,{href:`https://github.com/settings/tokens/new?scopes=repo`,target:`_blank`},`token`),A(`，注意一定要勾选上【scopes】里的【gist】选项。 `)],-1)]),_:1},8,[`modelValue`,`width`]))}},[[`__scopeId`,`data-v-7a3bd109`]]),Dn=e(de()),On={style:{flex:`1`,display:`flex`,"align-items":`center`,"justify-content":`space-between`}},kn={class:`gistBox`},An={class:`paginationBox`},jn=Z({__name:`GistDrawer`,props:{modelValue:Boolean},emits:[`update:modelValue`],setup(e,{emit:t}){let n=q(),i=e,a=t,o=b({get:()=>i.modelValue,set:e=>a(`update:modelValue`,e)}),s=D(),c=w(),u=O([]),f=O(!1),p=O(1),g=O(1),_=O([]),v=O(),y=async()=>{try{f.value=!0;let{data:e}=await me(`GET /gists`,{page:p.value,per_page:20});e.length>0&&(g.value=p.value+1),console.log(`[gistList]`,JSON.parse(JSON.stringify(e))),u.value=e,f.value=!1}catch{f.value=!1,W.error(`获取失败`)}},x=e=>{p.value=e,y()},S=()=>{u.value=[],p.value=1,_.value=[]},T=async(e,t)=>{try{f.value=!0,await me(`DELETE /gists/${e}`,{gist_id:e}),f.value=!1,u.value.splice(t,1),W.success(`删除成功，注意：删除不是一个同步的过程，建议一分钟内不要重复删除！`),e===c.params.id&&s.replace({name:`Editor`})}catch(e){console.log(e),f.value=!1,W.error(`删除失败`)}},F=e=>{o.value=!1,s.replace({name:`Edit`,params:{id:e}})},I=e=>{_.value=e},z=e=>{let t=v.value;t&&t.toggleRowSelection(e)},B=async()=>{try{await H.confirm(`确定要删除选中的 ${_.value.length} 个项目吗？`,`警告`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`warning`}),f.value=!0;let e=_.value.map(e=>me(`DELETE /gists/${e.id}`,{gist_id:e.id}));await Promise.all(e);let t=_.value.map(e=>e.id);u.value=u.value.filter(e=>!t.includes(e.id)),_.value=[],W.success(`批量删除成功，注意：删除不是一个同步的过程！`),t.includes(c.params.id)&&s.replace({name:`Editor`})}catch(e){if(e===`cancel`)return;console.error(e),W.error(`批量删除失败`)}finally{f.value=!1}};return(e,t)=>{let i=m(`loading`);return d(),k(M(ee),{modelValue:o.value,"onUpdate:modelValue":t[0]||=e=>o.value=e,title:`我的Gists`,direction:`rtl`,size:M(n)?`100%`:`900px`,onOpen:y,onClosed:S},{header:C(()=>[h(`div`,On,[t[1]||=h(`span`,null,`我的Gists`,-1),_.value.length?(d(),k(M(L),{key:0,type:`danger`,size:`small`,onClick:B,style:{"margin-right":`10px`}},{default:C(()=>[A(` 批量删除(`+r(_.value.length)+`) `,1)]),_:1})):j(``,!0)])]),default:C(()=>[h(`div`,kn,[E((d(),k(M(te),{ref_key:`tableRef`,ref:v,data:u.value,style:{width:`100%`},"empty-text":`好像没有更多了~`,height:`100%`,onSelectionChange:I,onRowClick:z},{default:C(()=>[l(M(R),{type:`selection`,width:`28`}),l(M(R),{label:`名称`,prop:`description`}),l(M(R),{label:`是否公开`,prop:`public`,width:`80`,align:`center`},{default:C(e=>[A(r(e.row.public?`是`:`否`),1)]),_:1}),l(M(R),{label:`创建时间`,prop:`created_at`,width:`110`,align:`center`},{default:C(e=>[A(r(M(Dn.default)(e.row.created_at).format(`YYYY/MM/DD`)),1)]),_:1}),l(M(R),{label:`更新时间`,prop:`updated_at`,width:`150`,align:`center`},{default:C(e=>[A(r(M(Dn.default)(e.row.updated_at).format(`YYYY/MM/DD HH:mm`)),1)]),_:1}),l(M(R),{fixed:`right`,label:`操作`,width:M(n)?`86`:`120`,align:`center`},{default:C(e=>[l(M(L),{type:`primary`,icon:M(re),circle:``,size:`small`,onClick:N(t=>F(e.row.id),[`stop`])},null,8,[`icon`,`onClick`]),l(M(L),{type:`danger`,icon:M(P),circle:``,size:`small`,onClick:N(t=>T(e.row.id,e.$index),[`stop`])},null,8,[`icon`,`onClick`])]),_:1},8,[`width`])]),_:1},8,[`data`])),[[i,f.value]]),h(`div`,An,[l(M(G),{layout:`prev, next`,"current-page":p.value,"page-count":g.value,"prev-text":`上一页`,"next-text":`下一页`,onCurrentChange:x},null,8,[`current-page`,`page-count`])])])]),_:1},8,[`modelValue`,`size`])}}},[[`__scopeId`,`data-v-26192c63`]]),Mn={class:`tip`},Nn=Z({__name:`Share`,props:{isEdit:{type:Boolean,default:!1}},setup(e,{expose:t}){let i=w(),a=O(null),{copyDialogTitle:o,copyDialogTip:s,shareDialogVisible:c,shareUrl:u,createShareUrl:f,createEmbedUrl:p,createEmbedCode:m}=(()=>{let e=O(``),t=O(``),r=O(!1),o=O(``),s=e=>{e&&(o.value=e,r.value=!0,n(()=>{a.value.select()}))};return{copyDialogTitle:e,copyDialogTip:t,shareDialogVisible:r,shareUrl:o,createShareUrl:n=>{e.value=`分享`,t.value=`复制url进行分享吧~`,s(xe(i.params.id,n))},createEmbedUrl:n=>{e.value=`嵌入`,t.value=`复制url嵌入到你页面的iframe里吧~`,s(ve(i.params.id,n))},createEmbedCode:n=>{e.value=`嵌入`,t.value=`复制代码插入到你页面里吧~`,s(`<iframe height="500" style="width: 100%;" scrolling="no" src="${ve(i.params.id,n)}" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>`)}}})();return t({createShareUrl:f,createEmbedUrl:p,createEmbedCode:m}),(e,t)=>(d(),k(M(F),{title:M(o),modelValue:M(c),"onUpdate:modelValue":t[1]||=e=>g(c)?c.value=e:null,width:600},{default:C(()=>[l(M(K),{modelValue:M(u),"onUpdate:modelValue":t[0]||=e=>g(u)?u.value=e:null,type:`textarea`,autosize:``,readonly:``,ref_key:`shareUrlInput`,ref:a},null,8,[`modelValue`]),h(`p`,Mn,r(M(s)),1)]),_:1},8,[`title`,`modelValue`]))}},[[`__scopeId`,`data-v-db3f4364`]]),Pn={class:`dialog-footer`},Fn=Z({__name:`ClipboardDetector`,setup(e){let{proxy:t}=s(),n=S(),r=O(!1),a=O(null),o=O({HTML:{content:``},CSS:{content:``},JS:{content:``}}),c=O(``),f=q(),p=e=>{r.value&&e.key===`Enter`&&(e.preventDefault(),T())},m=e=>{r.value&&(e.key===`Enter`?(e.preventDefault(),T()):e.key===`Escape`&&(r.value=!1))},g=/```(?:html|HTML)\s*([\s\S]*?)```/g,_=/```(?:css|CSS)\s*([\s\S]*?)```/g,v=/```(?:javascript|js|JavaScript|JS)\s*([\s\S]*?)```/g,y=async()=>{try{let e=await Ie();if(!e||e.trim()===``)return;c.value=e;let t=g.test(e);if(g.lastIndex=0,!t)return;let n,i=``,a=0;for(;(n=g.exec(e))!==null;){if(a++,a>1)return;i=n[1]?n[1].trim():``}let s,l=``;for(_.lastIndex=0;(s=_.exec(e))!==null;)l+=(s[1]?s[1].trim():``)+`

`;let u,d=``;for(v.lastIndex=0;(u=v.exec(e))!==null;)d+=(u[1]||u[2]?(u[1]||u[2]).trim():``)+`

`;i&&(o.value={HTML:{content:i},CSS:{content:l.trim()},JS:{content:d.trim()}},r.value=!0)}catch(e){console.error(`无法读取或处理剪贴板内容:`,e)}},b=e=>{if(e&&e.clipboardData&&e.clipboardData.getData)try{let t=e.clipboardData.getData(`text/plain`);if(t){x(t);return}}catch(e){console.warn(`从事件获取剪贴板数据失败:`,e)}setTimeout(y,100)},x=e=>{if(!e||e.trim()===``)return;c.value=e,g.lastIndex=0,_.lastIndex=0,v.lastIndex=0;let t=g.test(e);if(g.lastIndex=0,!t)return;let n,i=``,a=0;for(;(n=g.exec(e))!==null;){if(a++,a>1)return;i=n[1]?n[1].trim():``}let s,l=``;for(;(s=_.exec(e))!==null;)l+=(s[1]?s[1].trim():``)+`

`;let u,d=``;for(;(u=v.exec(e))!==null;)d+=(u[1]||u[2]?(u[1]||u[2]).trim():``)+`

`;i&&(o.value={HTML:{content:i},CSS:{content:l.trim()},JS:{content:d.trim()}},r.value=!0)};u(()=>{document.addEventListener(`paste`,b),document.addEventListener(`keydown`,m),y()});let w=async e=>{let t=e.match(/<title[^>]*>(.*?)<\/title>/i);if(t&&t[1])return t[1].trim();let n=e.match(/<h1[^>]*>(.*?)<\/h1>/i);if(n&&n[1])return n[1].trim();if(c.value){let e=c.value.match(/^#\s+(.+)$/m);if(e&&e[1])return e[1].trim()}return`未命名`},T=async()=>{try{let e=await w(o.value.HTML.content||``);n.state.editData.config.layout===`vue`&&n.commit(`setLayout`,`default`),await new Promise((e,n)=>{t.$eventEmitter.emit(`clear_all_code`,t=>{t?e():n(Error(`清空代码失败`))},!0)}),setTimeout(async()=>{let i={title:e,config:{...n.state.editData.config},code:{HTML:{language:`html`,content:o.value.HTML.content||``,resources:[]},CSS:{language:`css`,content:o.value.CSS.content||``,resources:[]},JS:{language:`javascript`,content:o.value.JS.content||``,resources:[]},VUE:{language:`vue2`,content:``,resources:[]}}};n.commit(`setEditData`,i),t.$eventEmitter.emit(`reset_code`),W.success(`代码"${e}"已成功插入`),r.value=!1,await Le()&&(c.value=``)},100)}catch(e){console.error(`插入代码失败:`,e),W.error(`插入代码失败`),r.value=!1}};return i(()=>{document.removeEventListener(`paste`,b),document.removeEventListener(`keydown`,m)}),(e,t)=>(d(),k(M(F),{modelValue:r.value,"onUpdate:modelValue":t[1]||=e=>r.value=e,title:`检测到可用代码`,width:M(f)?`100%`:`400px`,"close-on-press-escape":!0,onKeydown:B(p,[`enter`])},{footer:C(()=>[h(`span`,Pn,[l(M(L),{onClick:t[0]||=e=>r.value=!1},{default:C(()=>[...t[2]||=[A(`取消`,-1)]]),_:1}),l(M(L),{type:`primary`,onClick:T,ref_key:`confirmButton`,ref:a},{default:C(()=>[...t[3]||=[A(`确定`,-1)]]),_:1},512)])]),default:C(()=>[t[4]||=h(`div`,{class:`dialog-content`},[h(`span`,null,`是否将剪贴板里的内容插入代码面板里？此操作会清空原有代码。`)],-1)]),_:1},8,[`modelValue`,`width`]))}},[[`__scopeId`,`data-v-40e90217`]]),In={style:{flex:`1`,display:`flex`,"align-items":`center`,"justify-content":`space-between`}},Ln={class:`gistBox`},Rn={key:0,class:`paginationBox`},zn=Z({__name:`LocalGistDrawer`,props:{modelValue:Boolean},emits:[`update:modelValue`],setup(e,{emit:t}){let n=q(),i=e,a=t,o=b({get:()=>i.modelValue,set:e=>a(`update:modelValue`,e)}),s=D(),c=w(),u=O([]),f=O(!1),p=O(1),g=O(20),v=O(0),y=O([]),x=O(),S=async()=>{try{f.value=!0,v.value=(await Q.getAllGists()).length,u.value=await Q.getGists(p.value,g.value),f.value=!1}catch(e){console.error(e),f.value=!1,W.error(`获取失败`)}},T=e=>{p.value=e,S()},F=()=>{u.value=[],p.value=1,v.value=0,y.value=[]},I=async e=>{try{f.value=!0,await Q.deleteGist(e),f.value=!1,W.success(`删除成功`),S()}catch(e){console.log(e),f.value=!1,W.error(`删除失败`)}},z=async e=>{try{if(!await Q.getGist(e)){W.error(`数据不存在`);return}o.value=!1,s.push({name:`LocalEdit`,params:{id:String(e)}})}catch(e){console.error(e),W.error(`加载数据失败`)}},B=e=>{y.value=e},V=e=>{let t=x.value;t&&t.toggleRowSelection(e)},U=async()=>{try{await H.confirm(`确定要删除选中的 ${y.value.length} 个项目吗？`,`警告`,{confirmButtonText:`确定`,cancelButtonText:`取消`,type:`warning`}),f.value=!0;let e=y.value.map(e=>Q.deleteGist(e.id));await Promise.all(e),W.success(`批量删除成功`);let t=y.value.map(e=>e.id);c.name===`LocalEdit`&&t.includes(Number(c.params.id))&&s.replace({name:`Editor`}),y.value=[],await S()}catch(e){if(e===`cancel`)return;console.error(e),W.error(`批量删除失败`)}finally{f.value=!1}};return(e,t)=>{let i=m(`loading`);return d(),k(M(ee),{modelValue:o.value,"onUpdate:modelValue":t[0]||=e=>o.value=e,title:`本地项目`,direction:`rtl`,size:M(n)?`100%`:`900px`,onOpen:S,onClosed:F},{header:C(()=>[h(`div`,In,[t[1]||=h(`span`,null,`本地项目`,-1),y.value.length?(d(),k(M(L),{key:0,type:`danger`,size:`small`,onClick:U,style:{"margin-right":`10px`}},{default:C(()=>[A(` 批量删除(`+r(y.value.length)+`) `,1)]),_:1})):j(``,!0)])]),default:C(()=>[h(`div`,Ln,[E((d(),k(M(te),{ref_key:`tableRef`,ref:x,data:u.value,style:{width:`100%`},"empty-text":`还没有保存过代码~`,height:`100%`,onSelectionChange:B,onRowClick:V},{default:C(()=>[l(M(R),{type:`selection`,width:`28`}),l(M(R),{label:`名称`,prop:`description`}),l(M(R),{label:`创建时间`,prop:`created_at`,width:`110`,align:`center`},{default:C(e=>[A(r(M(Dn.default)(e.row.created_at).format(`YYYY/MM/DD`)),1)]),_:1}),l(M(R),{label:`更新时间`,prop:`updated_at`,width:`150`,align:`center`},{default:C(e=>[A(r(M(Dn.default)(e.row.updated_at).format(`YYYY/MM/DD HH:mm`)),1)]),_:1}),l(M(R),{fixed:`right`,label:`操作`,width:M(n)?`86`:`120`,align:`center`},{default:C(e=>[l(M(L),{type:`primary`,icon:M(re),circle:``,size:`small`,onClick:N(t=>z(e.row.id),[`stop`])},null,8,[`icon`,`onClick`]),l(M(L),{type:`danger`,icon:M(P),circle:``,size:`small`,onClick:N(t=>I(e.row.id),[`stop`])},null,8,[`icon`,`onClick`])]),_:1},8,[`width`])]),_:1},8,[`data`])),[[i,f.value]]),v.value>0?(d(),_(`div`,Rn,[l(M(G),{layout:`prev, next`,"current-page":p.value,"page-count":Math.ceil(v.value/g.value),"prev-text":`上一页`,"next-text":`下一页`,onCurrentChange:T},null,8,[`current-page`,`page-count`])])):j(``,!0)])]),_:1},8,[`modelValue`,`size`])}}},[[`__scopeId`,`data-v-77e3e99d`]]),Bn={class:`header`},Vn=Z({__name:`Header`,setup(e){let t=S(),n=D(),r=w(),i=O(!1),a=O(!1),o=O(!1),s=O(!1),c=O(!1),u=O(!1),f=O(!1),p=O(null),m=O(null),h=b(()=>!!r.query.data),g=b(()=>(r.name===`Edit`||r.name===`LocalEdit`)&&!!r.params.id),v=()=>{t.dispatch(`saveGithubToken`,null),n.replace({name:`Editor`})},y=()=>{s.value=!0,m.value.open()},x=()=>{if(r.name===`LocalEdit`){let e=ge(JSON.stringify(t.state.editData));p.value.createShareUrl(encodeURIComponent(e))}else p.value.createShareUrl(h.value?encodeURIComponent(r.query.data):null)},C=()=>{if(r.name===`LocalEdit`){let e=ge(JSON.stringify(t.state.editData));p.value.createEmbedUrl(encodeURIComponent(e))}else p.value.createEmbedUrl(h.value?encodeURIComponent(r.query.data):null)},T=()=>{if(r.name===`LocalEdit`){let e=ge(JSON.stringify(t.state.editData));p.value.createEmbedCode(encodeURIComponent(e))}else p.value.createEmbedCode(h.value?encodeURIComponent(r.query.data):null)};return(e,t)=>(d(),_(`div`,Bn,[l(Te),l(Oe),l(et,{isEdit:g.value,loading:i.value,onOpenSetting:t[0]||=e=>o.value=!0,onOpenTemplate:t[1]||=e=>a.value=!0,onExportZip:y,onLogin:t[2]||=e=>c.value=!0,onLogout:v,onShowGists:t[3]||=e=>u.value=!0,onShowLocalGists:t[4]||=e=>f.value=!0,onCreateShareUrl:x,onCreateEmbedUrl:C,onCreateEmbedCode:T},null,8,[`isEdit`,`loading`]),l(_t,{modelValue:a.value,"onUpdate:modelValue":t[5]||=e=>a.value=e},null,8,[`modelValue`]),l(gn,{modelValue:o.value,"onUpdate:modelValue":t[6]||=e=>o.value=e},null,8,[`modelValue`]),l(wn,{ref_key:`exportDialog`,ref:m,modelValue:s.value,"onUpdate:modelValue":t[7]||=e=>s.value=e},null,8,[`modelValue`]),l(En,{modelValue:c.value,"onUpdate:modelValue":t[8]||=e=>c.value=e},null,8,[`modelValue`]),l(jn,{modelValue:u.value,"onUpdate:modelValue":t[9]||=e=>u.value=e},null,8,[`modelValue`]),l(Nn,{ref_key:`ShareComp`,ref:p,isEdit:g.value},null,8,[`isEdit`]),l(Fn),l(zn,{modelValue:f.value,"onUpdate:modelValue":t[10]||=e=>f.value=e},null,8,[`modelValue`])]))}},[[`__scopeId`,`data-v-24054815`]]),Hn=e(ue()),Un={class:`editContainer`},Wn={key:1,class:`content`},Gn=Z({__name:`Index`,props:{embed:{type:Boolean,default:!1}},setup(e){let t=e,n=()=>{let e=S(),t=s().proxy,n=O(!1),r=async e=>{await Ce(),e(),n.value=!0},i=w(),a=async()=>{try{if(Hn.default.start(),i.name===`LocalEdit`){let n=await Q.getGist(Number(i.params.id));if(n){let r=JSON.parse(n.files[`coderun.json`].content);if(!e.state.editData.config.syncLayout){let t=e.state.editData.config.layout;r.config.layout=t}e.commit(`setEditData`,r),t.$eventEmitter.emit(`reset_code`),Hn.default.done();return}}await e.dispatch(`getData`,{id:i.params.id,data:i.query.data,blank:i.query.blank||!1}),t.$eventEmitter.emit(`reset_code`),Hn.default.done()}catch(e){console.error(e),Hn.default.done(),W.error(`获取数据失败`)}};return y(()=>i.params,(e,t)=>{e.id!==t.id&&a()}),a(),{store:e,showContent:n,proxy:t,router:D(),init:r}},r=(e,t)=>{let n=w();y(()=>e.state.editData,()=>{if(e.state.githubToken&&n.params.id||t.currentRoute.value.name===`LocalEdit`)return;let r=ge(JSON.stringify(e.state.editData));t.replace({name:`Editor`,query:{data:r}})},{deep:!0})},a=({store:e})=>{let n=b(()=>e.state.editData.config.layout);return{layout:n,activeLayout:b(()=>t.embed?oe.embed:oe[n.value])}},o=({store:e,layout:t,router:n,proxy:r,themeData:a})=>{let o=null,s=b(()=>e.state.editData),c=()=>{o&&o.postMessage({type:`preview`,data:{config:{...s.value.config,themeData:x(a.value)},code:{HTML:{language:s.value.code.HTML.language,content:s.value.code.HTML.content},CSS:{language:s.value.code.CSS.language,content:s.value.code.CSS.content,resources:s.value.code.CSS.resources.map(e=>({...e}))},JS:{language:s.value.code.JS.language,content:s.value.code.JS.content,resources:s.value.code.JS.resources.map(e=>({...e})),importMap:s.value.code.JS.importMap||``},VUE:{language:s.value.code.VUE.language,content:s.value.code.VUE.content}}}})};r.$eventEmitter.on(`preview_window_run`,c),i(()=>{r.$eventEmitter.off(`preview_window_run`,c)});let l=()=>{if(t.value===`newWindowPreview`){if(!o){let e=n.resolve({name:`Preview`});o=window.open(e.href),o.onload=()=>{c()}}}else o&&=(o.close(),null)};return y(()=>t.value,()=>{l()}),{previewLayoutHandle:l,previewWindowRun:c}},c=({proxy:e,store:t,layout:n})=>{let r=b(()=>t.state.editData.config.pageThemeSyncCodeTheme),a=O(null),o=null,s=t=>{a.value=t,o=t,Object.keys(ae).forEach(e=>{document.documentElement.style.setProperty(e,he(e,t,r.value))}),n.value===`newWindowPreview`&&e.$eventEmitter.emit(`preview_window_run`)};return s(),y(r,()=>{s(o)}),e.$eventEmitter.on(`set-theme`,s),i(()=>{e.$eventEmitter.off(`set-theme`,s)}),{themeData:a}},{proxy:l,router:u,store:f,init:m,showContent:h}=n();r(f,u);let{layout:g,activeLayout:v}=a({store:f}),{themeData:C}=c({proxy:l,store:f,layout:g}),{previewLayoutHandle:T}=o({store:f,layout:g,router:u,proxy:l,themeData:C});return m(()=>{T()}),(t,n)=>(d(),_(`div`,Un,[e.embed?j(``,!0):(d(),k(Vn,{key:0})),M(h)?(d(),_(`div`,Wn,[(d(),k(p(M(v)),{key:M(g),layout:M(g)},null,8,[`layout`]))])):j(``,!0)]))}},[[`__scopeId`,`data-v-5c835cbe`]]);export{Gn as default};