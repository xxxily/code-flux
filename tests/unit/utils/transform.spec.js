import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock window 对象上的编译器
global.window = global.window || {};

// Mock Babel
global.window.Babel = {
  transform: vi.fn((code, options) => {
    // 简单模拟 Babel 转换
    if (options?.plugins) {
      // 如果有插件，执行插件逻辑
      const plugin = options.plugins[0];
      if (typeof plugin === 'function') {
        const pluginInstance = plugin({
          types: {
            importDeclaration: (specifiers, source) => ({
              type: 'ImportDeclaration',
              specifiers,
              source
            }),
            stringLiteral: (value) => ({ type: 'StringLiteral', value })
          }
        });

        // 模拟访问 ImportDeclaration
        if (pluginInstance.visitor?.ImportDeclaration) {
          const mockPath = {
            node: {
              source: { value: 'vue' },
              specifiers: []
            },
            replaceWith: vi.fn(),
            stop: vi.fn()
          };
          pluginInstance.visitor.ImportDeclaration(mockPath);
        }
      }
    }
    return { code: code };
  })
};

// Mock Pug
global.window.pug = {
  render: vi.fn((code) => `<div>${code}</div>`)
};

// Mock Less
global.window.less = {
  render: vi.fn((code) => Promise.resolve({ css: code }))
};

// Mock Sass
global.window.Sass = class MockSass {
  compile(code, options, callback) {
    callback({ status: 0, text: code });
  }
};

// Mock Stylus
global.window.stylus = {
  render: vi.fn((code, callback) => {
    callback(null, code);
  })
};

// Mock PostCSS
global.window.postcss = vi.fn(() => ({
  process: vi.fn((code) => Promise.resolve({ css: code }))
}));
global.window.cssnext = {};

// Mock TypeScript
global.window.ts = {
  transpileModule: vi.fn((code) => ({
    outputText: code
  }))
};

// Mock CoffeeScript
global.window.CoffeeScript = {
  compile: vi.fn((code) => code)
};

// Mock load 函数
vi.mock('@/utils/load', () => ({
  load: vi.fn(() => Promise.resolve())
}));

// Mock constants
vi.mock('@/config/constants', () => ({
  handleEsModuleCdnUrl: vi.fn((source) => `https://cdn.example.com/${source}`)
}));

// 导入要测试的模块
import transform from '@/utils/transform';

describe('transform.js 单元测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('html 函数', () => {
    it('应该直接返回 HTML 代码', async () => {
      const code = '<div>Hello World</div>';
      const result = await transform.html('html', code);

      expect(result).toBe(code);
    });

    it('应该编译 Pug 代码', async () => {
      const code = 'div Hello World';
      const result = await transform.html('pug', code);

      expect(window.pug.render).toHaveBeenCalledWith(code);
      expect(result).toContain('Hello World');
    });

    it('应该处理空代码', async () => {
      const result = await transform.html('html', '');
      expect(result).toBe('');
    });

    it('应该处理未知的预处理器', async () => {
      const result = await transform.html('unknown', 'code');
      expect(result).toBe('');
    });

    it('应该处理编译错误', async () => {
      window.pug.render.mockImplementationOnce(() => {
        throw new Error('Pug compile error');
      });

      await expect(
        transform.html('pug', 'invalid pug')
      ).rejects.toThrow('Pug compile error');
    });
  });

  describe('css 函数', () => {
    it('应该直接返回 CSS 代码', async () => {
      const code = 'body { margin: 0; }';
      const result = await transform.css('css', code);

      expect(result).toBe(code);
    });

    it('应该编译 Less 代码', async () => {
      const code = '@color: red; body { color: @color; }';
      const result = await transform.css('less', code);

      expect(window.less.render).toHaveBeenCalledWith(code);
      expect(result).toBeDefined();
    });

    it('应该编译 Sass 代码', async () => {
      const code = '$color: red; body { color: $color; }';
      const result = await transform.css('sass', code);

      expect(result).toBeDefined();
    });

    it('应该编译 SCSS 代码', async () => {
      const code = '$color: red; body { color: $color; }';
      const result = await transform.css('scss', code);

      expect(result).toBeDefined();
    });

    it('应该编译 Stylus 代码', async () => {
      const code = 'body\n  margin 0';
      const result = await transform.css('stylus', code);

      expect(window.stylus.render).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('应该编译 PostCSS 代码', async () => {
      const code = 'body { color: red; }';
      const result = await transform.css('postcss', code);

      expect(window.postcss).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('应该处理空代码', async () => {
      const result = await transform.css('css', '');
      expect(result).toBe('');
    });

    it('应该处理未知的预处理器', async () => {
      const result = await transform.css('unknown', 'code');
      expect(result).toBe('');
    });

    it('应该处理 Less 编译错误', async () => {
      window.less.render.mockImplementationOnce(() =>
        Promise.reject(new Error('Less compile error'))
      );

      await expect(
        transform.css('less', 'invalid less')
      ).rejects.toThrow('Less compile error');
    });

    it('应该处理 Stylus 编译错误', async () => {
      window.stylus.render.mockImplementationOnce((code, callback) => {
        callback(new Error('Stylus compile error'));
      });

      await expect(
        transform.css('stylus', 'invalid stylus')
      ).rejects.toThrow('Stylus compile error');
    });

    it('应该处理编译超时', async () => {
      // Mock 一个永远不会完成的编译
      window.less.render.mockImplementationOnce(() =>
        new Promise(() => {}) // 永远不 resolve
      );

      await expect(
        transform.css('less', 'code')
      ).rejects.toThrow('CSS编译超时');
    }, 6000);
  });

  describe('js 函数', () => {
    it('应该直接返回 JavaScript 代码', async () => {
      const code = 'console.log("test");';
      const result = await transform.js('javascript', code, {});

      expect(result).toHaveProperty('useImport');
      expect(result).toHaveProperty('js');
      expect(result.js).toBe(code);
    });

    it('应该编译 TypeScript 代码', async () => {
      const code = 'const x: number = 1;';
      const result = await transform.js('typescript', code, {});

      expect(window.ts.transpileModule).toHaveBeenCalledWith(code, expect.any(Object));
      expect(result).toHaveProperty('js');
    });

    it('应该编译 Babel 代码', async () => {
      const code = 'const x = () => {};';
      const result = await transform.js('babel', code, {});

      expect(window.Babel.transform).toHaveBeenCalled();
      expect(result).toHaveProperty('js');
      expect(result.useImport).toBe(false);
    });

    it('应该编译 CoffeeScript 代码', async () => {
      const code = 'square = (x) -> x * x';
      const result = await transform.js('coffeescript', code, {});

      expect(window.CoffeeScript.compile).toHaveBeenCalledWith(code);
      expect(result).toHaveProperty('js');
    });

    it('应该处理空代码', async () => {
      const result = await transform.js('javascript', '', {});
      expect(result.js).toBe('');
    });

    it('应该处理未知的预处理器', async () => {
      const result = await transform.js('unknown', 'code', {});
      expect(result.js).toBe('');
      expect(result.useImport).toBe(false);
    });

    it('应该处理编译错误', async () => {
      window.ts.transpileModule.mockImplementationOnce(() => {
        throw new Error('TypeScript compile error');
      });

      await expect(
        transform.js('typescript', 'invalid ts', {})
      ).rejects.toThrow('TypeScript compile error');
    });
  });
});
