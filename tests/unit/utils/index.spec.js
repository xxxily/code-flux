import { describe, it, expect } from 'vitest';
import { parseHtmlContent, assembleHtml, type, generateUUID } from '@/utils/index';

describe('parseHtmlContent', () => {
  it('应该正确解析完整的 HTML 结构', () => {
    const html = '<!DOCTYPE html><html><head><title>Test</title></head><body><div>content</div></body></html>';
    const result = parseHtmlContent(html);

    expect(result.isFullHtml).toBe(true);
    expect(result.head).toContain('Test');
    expect(result.body).toContain('content');
  });

  it('应该处理带注释的完整 HTML', () => {
    const html = '<!-- comment --><!DOCTYPE html><html><head></head><body>test</body></html>';
    const result = parseHtmlContent(html);

    expect(result.isFullHtml).toBe(true);
  });

  it('应该处理小写的 doctype', () => {
    const html = '<!doctype html><html><head></head><body>test</body></html>';
    const result = parseHtmlContent(html);

    expect(result.isFullHtml).toBe(true);
  });

  it('应该处理不完整的 HTML', () => {
    const html = '<div>test</div>';
    const result = parseHtmlContent(html);

    expect(result.isFullHtml).toBe(false);
    expect(result.body).toBe('<div>test</div>');
    expect(result.head).toBe('');
  });

  it('应该处理空字符串', () => {
    const result = parseHtmlContent('');

    expect(result.isFullHtml).toBe(false);
    expect(result.body).toBe('');
    expect(result.head).toBe('');
  });

  it('应该正确提取 head 内容', () => {
    const html = '<html><head><title>Title</title><meta charset="UTF-8"></head><body></body></html>';
    const result = parseHtmlContent(html);

    expect(result.head).toContain('Title');
    expect(result.head).toContain('charset');
  });

  it('应该正确提取 body 内容', () => {
    const html = '<html><head></head><body><div id="app">Hello World</div></body></html>';
    const result = parseHtmlContent(html);

    expect(result.body).toContain('Hello World');
    expect(result.body).toContain('id="app"');
  });

  it('应该处理空的 head 和 body 标签', () => {
    const html = '<html><head></head><body></body></html>';
    const result = parseHtmlContent(html);

    expect(result.isFullHtml).toBe(true);
    expect(result.head).toBe('');
    expect(result.body).toBe('');
  });
});

describe('assembleHtml', () => {
  it('应该正确拼接简单的 HTML', () => {
    const head = '<title>Test</title>';
    const body = '<div>content</div>';
    const result = assembleHtml(head, body);

    expect(result).toContain('<!DOCTYPE html>');
    expect(result).toContain('<title>Test</title>');
    expect(result).toContain('<div>content</div>');
    expect(result).toContain('charset="UTF-8"');
  });

  it('应该处理空的 head 和 body', () => {
    const result = assembleHtml('', '');

    expect(result).toContain('<!DOCTYPE html>');
    expect(result).toContain('<html>');
    expect(result).toContain('<head>');
    expect(result).toContain('<body>');
  });

  it('应该在 body 是完整 HTML 时合并 head 内容', () => {
    const head = '<style>body { margin: 0; }</style>';
    const body = '<!DOCTYPE html><html><head><title>Original</title></head><body>content</body></html>';
    const result = assembleHtml(head, body);

    expect(result).toContain('body { margin: 0; }');
    expect(result).toContain('Original');
  });

  it('应该移除重复的 title 标签', () => {
    const head = '<title>Head Title</title>';
    const body = '<!DOCTYPE html><html><head><title>Body Title</title></head><body>content</body></html>';
    const result = assembleHtml(head, body);

    // head 中的 title 应该被移除，保留 body 中的
    expect(result).toContain('Body Title');
    expect(result).not.toContain('Head Title');
  });

  it('应该自动添加 charset 如果缺失', () => {
    const head = '<title>Test</title>';
    const body = '<!DOCTYPE html><html><head></head><body>content</body></html>';
    const result = assembleHtml(head, body);

    expect(result).toContain('charset="UTF-8"');
  });

  it('应该不重复添加 charset', () => {
    const head = '';
    const body = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>content</body></html>';
    const result = assembleHtml(head, body);

    // 只应该有一个 charset
    const charsetMatches = result.match(/charset/gi);
    expect(charsetMatches).toHaveLength(1);
  });
});

describe('type', () => {
  it('应该正确识别对象类型', () => {
    expect(type({})).toBe('object');
    expect(type([])).toBe('array');
    expect(type('')).toBe('string');
    expect(type(123)).toBe('number');
    expect(type(true)).toBe('boolean');
    expect(type(null)).toBe('null');
    expect(type(undefined)).toBe('undefined');
    expect(type(() => {})).toBe('function');
    expect(type(new Date())).toBe('date');
    expect(type(/test/)).toBe('regexp');
  });
});

describe('generateUUID', () => {
  it('应该生成有效的 UUID', () => {
    const uuid = generateUUID();

    expect(uuid).toBeDefined();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBeGreaterThan(0);
  });

  it('应该生成唯一的 UUID', () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();

    expect(uuid1).not.toBe(uuid2);
  });

  it('应该符合 UUID 格式', () => {
    const uuid = generateUUID();

    // UUID 格式: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(uuid)).toBe(true);
  });
});
