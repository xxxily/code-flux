import { test, expect } from '@playwright/test';

const gotoApp = async page => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'CodeFlux' })).toBeVisible({ timeout: 30000 });
};

const expectEditorReady = async page => {
  await expect(page.locator('.monaco-editor').first()).toBeVisible({ timeout: 30000 });
};

const expectPreviewReady = async page => {
  await expect(page.locator('.previewBox iframe').first()).toBeVisible({ timeout: 30000 });
};

test.describe('基础工作流程', () => {
  test('应该能够访问首页', async ({ page }) => {
    await gotoApp(page);

    // 验证页面标题或关键元素
    expect(page.url()).toMatch(/(localhost:8080|127\.0\.0\.1:4173)/);
  });

  test('应该显示编辑器区域', async ({ page }) => {
    await gotoApp(page);
    await expectEditorReady(page);
  });

  test('应该显示预览区域', async ({ page }) => {
    await gotoApp(page);
    await expectPreviewReady(page);
  });

  test('应该有运行按钮', async ({ page }) => {
    await gotoApp(page);

    // HeaderTools uses a div-based button for run.
    const runButton = page.locator('.btn').filter({ hasText: '运行' }).first();
    await expect(runButton).toBeVisible({ timeout: 10000 });
  });

  test('应该能够加载页面资源', async ({ page }) => {
    // 监听控制台错误
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await gotoApp(page);
    await expectPreviewReady(page);

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
    await gotoApp(page);

    // 测试不同的视口大小
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: 'CodeFlux' })).toBeVisible();
    await expectPreviewReady(page);

    await page.setViewportSize({ width: 1280, height: 720 });

    // 页面应该仍然可见和可用
    await expect(page.getByRole('heading', { name: 'CodeFlux' })).toBeVisible();
    await expectPreviewReady(page);
  });
});

test.describe('编辑器交互', () => {
  test('应该能够点击编辑器区域', async ({ page }) => {
    await gotoApp(page);
    await expectEditorReady(page);

    // 尝试点击编辑器区域
    await page.locator('.monaco-editor').first().click({ timeout: 10000 });
  });
});

test.describe('预览功能', () => {
  test('应该有 iframe 预览', async ({ page }) => {
    await gotoApp(page);
    await expectPreviewReady(page);
  });
});
