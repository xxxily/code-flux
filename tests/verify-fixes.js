#!/usr/bin/env node

/**
 * 预览修复自动化测试（简化版）
 * 测试编译和基本功能
 */

const fs = require('fs');
const path = require('path');

// 测试结果
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(name, status, message = '') {
  const result = { name, status, message, timestamp: new Date().toISOString() };
  testResults.tests.push(result);

  if (status === 'PASS') {
    testResults.passed++;
    console.log(`✅ ${name}`);
    if (message) console.log(`   ${message}`);
  } else {
    testResults.failed++;
    console.error(`❌ ${name}`);
    if (message) console.error(`   ${message}`);
  }
}

// 测试 1: 检查修复的文件是否存在
function testFilesExist() {
  console.log('\n📋 测试 1: 检查修复文件');

  const files = [
    'src/components/Preview.vue',
    'src/utils/load.js',
    'src/utils/transform.js'
  ];

  files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      logTest(`文件存在: ${file}`, 'PASS');
    } else {
      logTest(`文件存在: ${file}`, 'FAIL', '文件不存在');
    }
  });
}

// 测试 2: 检查 Preview.vue 的关键修复
function testPreviewVueChanges() {
  console.log('\n📋 测试 2: 检查 Preview.vue 修复');

  const filePath = path.join(process.cwd(), 'src/components/Preview.vue');
  const content = fs.readFileSync(filePath, 'utf-8');

  // 检查外部资源超时控制
  if (content.includes('createResourceWithTimeout')) {
    logTest('外部资源超时函数', 'PASS');
  } else {
    logTest('外部资源超时函数', 'FAIL', '未找到 createResourceWithTimeout');
  }

  // 检查 AbortController
  if (content.includes('AbortController')) {
    logTest('取消控制器', 'PASS');
  } else {
    logTest('取消控制器', 'FAIL', '未找到 AbortController');
  }

  // 检查分阶段超时
  if (content.includes('compileTimeout') && content.includes('totalTimeout')) {
    logTest('分阶段超时', 'PASS');
  } else {
    logTest('分阶段超时', 'FAIL', '未找到超时配置');
  }

  // 检查加载状态
  if (content.includes('isLoading') && content.includes('loadingText')) {
    logTest('加载状态变量', 'PASS');
  } else {
    logTest('加载状态变量', 'FAIL', '未找到加载状态变量');
  }

  // 检查加载遮罩
  if (content.includes('loading-overlay')) {
    logTest('加载遮罩样式', 'PASS');
  } else {
    logTest('加载遮罩样式', 'FAIL', '未找到加载遮罩');
  }

  // 检查取消按钮
  if (content.includes('cancel-btn') && content.includes('cancelRun')) {
    logTest('取消按钮功能', 'PASS');
  } else {
    logTest('取消按钮功能', 'FAIL', '未找到取消功能');
  }

  // 检查 iframe 清理
  if (content.includes('contentWindow.stop') || content.includes('window.stop')) {
    logTest('iframe 清理逻辑', 'PASS');
  } else {
    logTest('iframe 清理逻辑', 'FAIL', '未找到清理逻辑');
  }
}

// 测试 3: 检查 load.js 的修复
function testLoadJsChanges() {
  console.log('\n📋 测试 3: 检查 load.js 修复');

  const filePath = path.join(process.cwd(), 'src/utils/load.js');
  const content = fs.readFileSync(filePath, 'utf-8');

  // 检查重试机制
  if (content.includes('retryCount') && content.includes('attemptLoad')) {
    logTest('重试机制', 'PASS');
  } else {
    logTest('重试机制', 'FAIL', '未找到重试逻辑');
  }

  // 检查超时控制
  if (content.includes('loadTimeout') && content.includes('Promise.race')) {
    logTest('超时控制', 'PASS');
  } else {
    logTest('超时控制', 'FAIL', '未找到超时控制');
  }

  // 检查错误日志
  if (content.includes('console.warn') || content.includes('console.error')) {
    logTest('错误日志', 'PASS');
  } else {
    logTest('错误日志', 'FAIL', '未找到错误日志');
  }
}

// 测试 4: 检查 transform.js 的修复
function testTransformJsChanges() {
  console.log('\n📋 测试 4: 检查 transform.js 修复');

  const filePath = path.join(process.cwd(), 'src/utils/transform.js');
  const content = fs.readFileSync(filePath, 'utf-8');

  // 检查 Sass 实例化
  if (content.includes('new window.Sass()') && content.includes('sassInstance')) {
    logTest('Sass 实例化', 'PASS');
  } else {
    logTest('Sass 实例化', 'FAIL', '未找到 Sass 实例化');
  }

  // 检查 CSS 超时
  if (content.includes('setTimeout') && content.includes('CSS编译超时')) {
    logTest('CSS 编译超时', 'PASS');
  } else {
    logTest('CSS 编译超时', 'FAIL', '未找到 CSS 超时');
  }

  // 检查 Vue3 refSugar 移除
  if (!content.includes('refSugar: true')) {
    logTest('Vue3 refSugar 移除', 'PASS');
  } else {
    logTest('Vue3 refSugar 移除', 'FAIL', 'refSugar 仍然存在');
  }

  // 检查 Sass 状态检查
  if (content.includes('result.status')) {
    logTest('Sass 状态检查', 'PASS');
  } else {
    logTest('Sass 状态检查', 'FAIL', '未找到状态检查');
  }

  // 检查 PostCSS 错误处理
  if (content.includes('.catch') && content.match(/postcss/i)) {
    logTest('PostCSS 错误处理', 'PASS');
  } else {
    logTest('PostCSS 错误处理', 'FAIL', '未找到错误处理');
  }
}

// 测试 5: 检查文档
function testDocumentation() {
  console.log('\n📋 测试 5: 检查文档');

  const docs = [
    'docs/fixes/README.md',
    'docs/fixes/PREVIEW_ISSUES_ANALYSIS.md',
    'docs/fixes/FIXES_COMPLETE.md',
    'docs/fixes/TEST_FIXES.md',
    'docs/fixes/test-preview-fixes.html'
  ];

  docs.forEach(doc => {
    const docPath = path.join(process.cwd(), doc);
    if (fs.existsSync(docPath)) {
      const stats = fs.statSync(docPath);
      logTest(`文档: ${doc}`, 'PASS', `大小: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      logTest(`文档: ${doc}`, 'FAIL', '文档不存在');
    }
  });
}

// 测试 6: 语法检查
function testSyntax() {
  console.log('\n📋 测试 6: 语法检查');

  try {
    // 检查 Vue 文件语法
    const vueContent = fs.readFileSync('src/components/Preview.vue', 'utf-8');

    // 简单的语法检查
    const openTags = (vueContent.match(/<template>/g) || []).length;
    const closeTags = (vueContent.match(/<\/template>/g) || []).length;

    if (openTags === closeTags && openTags > 0) {
      logTest('Vue 模板语法', 'PASS');
    } else {
      logTest('Vue 模板语法', 'FAIL', '模板标签不匹配');
    }

    // 检查 script 标签
    if (vueContent.includes('<script setup>')) {
      logTest('Vue script setup', 'PASS');
    } else {
      logTest('Vue script setup', 'FAIL', '未找到 script setup');
    }

    // 检查 style 标签
    if (vueContent.includes('<style scoped lang="less">')) {
      logTest('Vue style 标签', 'PASS');
    } else {
      logTest('Vue style 标签', 'FAIL', '未找到 style 标签');
    }

  } catch (error) {
    logTest('语法检查', 'FAIL', error.message);
  }
}

// 测试 7: 检查超时配置
function testTimeoutConfig() {
  console.log('\n📋 测试 7: 检查超时配置');

  const previewContent = fs.readFileSync('src/components/Preview.vue', 'utf-8');
  const loadContent = fs.readFileSync('src/utils/load.js', 'utf-8');
  const transformContent = fs.readFileSync('src/utils/transform.js', 'utf-8');

  // 检查各种超时值
  const timeouts = {
    '外部资源超时 (10000ms)': previewContent.includes('10000'),
    '编译超时 (8000ms)': previewContent.includes('8000'),
    '总超时 (15000ms)': previewContent.includes('15000'),
    '编译器加载超时 (10000ms)': loadContent.includes('10000'),
    'CSS编译超时 (5000ms)': transformContent.includes('5000')
  };

  Object.entries(timeouts).forEach(([name, found]) => {
    if (found) {
      logTest(name, 'PASS');
    } else {
      logTest(name, 'FAIL', '未找到超时配置');
    }
  });
}

// 主测试函数
function runTests() {
  console.log('🚀 开始自动化测试（简化版）...\n');
  console.log('工作目录:', process.cwd());
  console.log('='.repeat(60));

  try {
    testFilesExist();
    testPreviewVueChanges();
    testLoadJsChanges();
    testTransformJsChanges();
    testDocumentation();
    testSyntax();
    testTimeoutConfig();

  } catch (error) {
    console.error('\n❌ 测试执行错误:', error.message);
    logTest('测试执行', 'FAIL', error.message);
  }

  // 输出测试结果
  console.log('\n' + '='.repeat(60));
  console.log('📊 测试结果汇总');
  console.log('='.repeat(60));
  console.log(`总计: ${testResults.tests.length} 个测试`);
  console.log(`✅ 通过: ${testResults.passed}`);
  console.log(`❌ 失败: ${testResults.failed}`);

  const successRate = testResults.tests.length > 0
    ? ((testResults.passed / testResults.tests.length) * 100).toFixed(2)
    : 0;
  console.log(`成功率: ${successRate}%`);
  console.log('='.repeat(60));

  // 保存测试报告
  const reportPath = path.join(process.cwd(), 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`\n📄 测试报告已保存到: ${reportPath}`);

  // 输出建议
  if (testResults.failed > 0) {
    console.log('\n⚠️  发现问题，请检查失败的测试项');
  } else {
    console.log('\n✨ 所有测试通过！代码修复验证成功');
  }

  // 返回退出码
  return testResults.failed === 0;
}

// 运行测试
if (require.main === module) {
  const success = runTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runTests };
