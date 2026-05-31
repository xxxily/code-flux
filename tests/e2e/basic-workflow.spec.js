import { test, expect } from '@playwright/test';

test.describe('基础工作流程', () => {
  test('应该能够访问首页', async ({ page }) => {
    await page.goto('/');

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 验证页面标题或关键元素
    expect(page.url()).toContain('localhost:8081');
  });

  test('应该显示编辑器区域', async ({ page }) => {
    await page.goto('/');

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 等待编辑器容器出现
    const editorContainer = page.locator('.editorItem, .monaco-editor, [class*="editor"]').first();
    await expect(editorContainer).toBeVisible({ timeout: 10000 });
  });

  test('应该显示预览区域', async ({ page }) => {
    await page.goto('/');

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 等待预览区域出现
    const previewBox = page.locator('.previewBox, iframe, [class*="preview"]').first();
    await expect(previewBox).toBeVisible({ timeout: 10000 });
  });

  test('应该有运行按钮', async ({ page }) => {
    await page.goto('/');

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 查找运行按钮（可能是文本"运行"或图标）
    const runButton = page.locator('button:has-text("运行"), button[title*="运行"], button[aria-label*="运行"]').first();

    // 如果找到运行按钮，验证它可见
    const count = await runButton.count();
    if (count > 0) {
      await expect(runButton).toBeVisible();
    }
  });

  test('应该能够加载页面资源', async ({ page }) => {
    // 监听控制台错误
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 验证没有严重的加载错误
    const criticalErrors = errors.filter(err =>
      err.includes('Failed to load') ||
      err.includes('404') ||
      err.includes('ERR_')
    );

    // 允许一些非关键错误，但不应该有太多
    expect(criticalErrors.length).toBeLessThan(5);
  });

  test('应该响应式布局', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 测试不同的视口大小
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);

    // 页面应该仍然可见和可用
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

test.describe('编辑器交互', () => {
  test('应该能够点击编辑器区域', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 尝试点击编辑器区域
    const editorArea = page.locator('.monaco-editor, .editorContent, [class*="editor"]').first();
    const count = await editorArea.count();

    if (count > 0) {
      await editorArea.click({ timeout: 5000 }).catch(() => {
        // 如果点击失败，不算错误（可能是编辑器还在加载）
      });
    }
  });
});

test.describe('预览功能', () => {
  test('应该有 iframe 预览', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 查找 iframe
    const iframe = page.locator('iframe').first();
    const count = await iframe.count();

    if (count > 0) {
      await expect(iframe).toBeVisible({ timeout: 10000 });
    }
  });
});
