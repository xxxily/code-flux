import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  parseHtmlContent,
  assembleHtml,
  type,
  generateUUID,
  splitHumpStr,
  utoa,
  atou,
  isMobileDevice,
  getDeviceConfig,
  newWindowOpenUrl,
  getBaseUrl,
  openAppInNewWindow,
  createShareUrl,
  createEmbedUrl
} from '@/utils/index';

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

describe('splitHumpStr', () => {
  it('应该正确分割驼峰字符串', () => {
    expect(splitHumpStr('helloWorld')).toBe('hello World');
    expect(splitHumpStr('myVariableName')).toBe('my Variable Name');
  });

  it('应该使用自定义分隔符', () => {
    expect(splitHumpStr('helloWorld', '-')).toBe('hello-World');
    expect(splitHumpStr('myVariableName', '_')).toBe('my_Variable_Name');
  });

  it('应该处理已经有空格的字符串', () => {
    expect(splitHumpStr('hello World')).toBe('hello  World');
  });

  it('应该处理空字符串', () => {
    expect(splitHumpStr('')).toBe('');
  });

  it('应该处理没有大写字母的字符串', () => {
    expect(splitHumpStr('hello')).toBe('hello');
  });

  it('应该处理连续大写字母', () => {
    expect(splitHumpStr('HTMLParser')).toBe('H T M L Parser');
  });
});

describe('utoa', () => {
  it('应该正确编码字符串', () => {
    const result = utoa('hello');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('应该编码中文字符', () => {
    const result = utoa('你好世界');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('应该处理空字符串', () => {
    const result = utoa('');
    expect(result).toBeDefined();
  });

  it('应该处理特殊字符', () => {
    const result = utoa('!@#$%^&*()');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});

describe('atou', () => {
  it('应该正确解码字符串', () => {
    const encoded = utoa('hello');
    const decoded = atou(encoded);
    expect(decoded).toBe('hello');
  });

  it('应该解码中文字符', () => {
    const encoded = utoa('你好世界');
    const decoded = atou(encoded);
    expect(decoded).toBe('你好世界');
  });

  it('应该处理空字符串', () => {
    const encoded = utoa('');
    const decoded = atou(encoded);
    expect(decoded).toBe('');
  });

  it('应该处理特殊字符', () => {
    const original = '!@#$%^&*()';
    const encoded = utoa(original);
    const decoded = atou(encoded);
    expect(decoded).toBe(original);
  });

  it('编码和解码应该是可逆的', () => {
    const testStrings = [
      'hello world',
      '你好世界',
      '123456',
      'Test@#$%',
      'Mixed中英文123'
    ];

    testStrings.forEach(str => {
      const encoded = utoa(str);
      const decoded = atou(encoded);
      expect(decoded).toBe(str);
    });
  });
});

describe('isMobileDevice', () => {
  it('应该返回布尔值', () => {
    const result = isMobileDevice();
    expect(typeof result).toBe('boolean');
  });

  it('应该在桌面环境返回 false', () => {
    // 在测试环境中，userAgent 通常是桌面浏览器
    const result = isMobileDevice();
    expect(result).toBe(false);
  });
});

describe('getDeviceConfig', () => {
  it('应该返回设备配置对象', () => {
    const config = getDeviceConfig();
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('应该包含必要的配置属性', () => {
    const config = getDeviceConfig();
    expect(config).toHaveProperty('fontSize');
    expect(config).toHaveProperty('lineNumbers');
    expect(config).toHaveProperty('minimap');
    expect(config).toHaveProperty('padding');
  });

  it('配置值应该是正确的类型', () => {
    const config = getDeviceConfig();
    expect(typeof config.fontSize).toBe('number');
    expect(typeof config.lineNumbers).toBe('boolean');
    expect(typeof config.minimap).toBe('boolean');
    expect(typeof config.padding).toBe('number');
  });
});

describe('newWindowOpenUrl', () => {
  let createElementSpy;
  let clickSpy;

  beforeEach(() => {
    clickSpy = vi.fn();
    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      click: clickSpy,
      href: '',
      target: ''
    });
  });

  afterEach(() => {
    createElementSpy.mockRestore();
  });

  it('应该创建一个 a 标签', () => {
    newWindowOpenUrl('https://example.com');
    expect(createElementSpy).toHaveBeenCalledWith('a');
  });

  it('应该设置正确的 URL', () => {
    const mockElement = { click: clickSpy, href: '', target: '' };
    createElementSpy.mockReturnValue(mockElement);

    newWindowOpenUrl('https://example.com');

    expect(mockElement.href).toBe('https://example.com');
  });

  it('应该设置 target 为 _blank', () => {
    const mockElement = { click: clickSpy, href: '', target: '' };
    createElementSpy.mockReturnValue(mockElement);

    newWindowOpenUrl('https://example.com');

    expect(mockElement.target).toBe('_blank');
  });

  it('应该触发点击', () => {
    newWindowOpenUrl('https://example.com');
    expect(clickSpy).toHaveBeenCalled();
  });
});

describe('getBaseUrl', () => {
  it('应该返回字符串', () => {
    const result = getBaseUrl();
    expect(typeof result).toBe('string');
  });

  it('应该包含 origin', () => {
    const result = getBaseUrl();
    expect(result).toContain(window.location.origin);
  });
});

describe('openAppInNewWindow', () => {
  let windowOpenSpy;

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => {});
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  it('应该调用 window.open', () => {
    openAppInNewWindow();
    expect(windowOpenSpy).toHaveBeenCalled();
  });

  it('应该使用 _blank 目标', () => {
    openAppInNewWindow();
    expect(windowOpenSpy).toHaveBeenCalledWith(expect.any(String), '_blank');
  });

  it('应该生成包含 blank=true 的 URL', () => {
    openAppInNewWindow();
    const callArgs = windowOpenSpy.mock.calls[0];
    expect(callArgs[0]).toContain('blank=true');
  });
});

describe('createShareUrl', () => {
  it('应该生成分享 URL', () => {
    const id = 'test123';
    const result = createShareUrl(id);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result).toContain(id);
  });

  it('应该包含 share 路径', () => {
    const id = 'test123';
    const result = createShareUrl(id);

    expect(result).toContain('share');
  });

  it('应该处理 queryData', () => {
    const id = 'test123';
    const queryData = 'encoded-data-string';
    const result = createShareUrl(id, queryData);

    expect(result).toContain('data=');
    expect(result).toContain(queryData);
  });

  it('应该在没有 queryData 时使用 id', () => {
    const id = 'test123';
    const result = createShareUrl(id);

    expect(result).toContain(id);
  });
});

describe('createEmbedUrl', () => {
  it('应该生成嵌入 URL', () => {
    const id = 'test123';
    const result = createEmbedUrl(id);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result).toContain(id);
  });

  it('应该包含 embed 标识', () => {
    const id = 'test123';
    const result = createEmbedUrl(id);

    expect(result).toContain('embed');
  });

  it('应该处理 queryData', () => {
    const id = 'test123';
    const queryData = 'encoded-data-string';
    const result = createEmbedUrl(id, queryData);

    expect(result).toContain('data=');
    expect(result).toContain(queryData);
  });

  it('应该在没有 queryData 时使用 id', () => {
    const id = 'test123';
    const result = createEmbedUrl(id);

    expect(result).toContain(id);
  });
});
