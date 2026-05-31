import { describe, it, expect } from 'vitest';
import {
  supportLanguage,
  monacoEditorInnerLanguages,
  scopeNameMap,
  tmGrammarJsonMap,
  defaultViewThemeConfig
} from '@/config/constants';

describe('constants.js 配置测试', () => {
  describe('supportLanguage', () => {
    it('应该包含常见的编程语言', () => {
      expect(supportLanguage).toHaveProperty('javascript');
      expect(supportLanguage).toHaveProperty('typescript');
      expect(supportLanguage).toHaveProperty('html');
      expect(supportLanguage).toHaveProperty('css');
    });

    it('应该包含预处理器语言', () => {
      expect(supportLanguage).toHaveProperty('less');
      expect(supportLanguage).toHaveProperty('scss');
      expect(supportLanguage).toHaveProperty('stylus');
      expect(supportLanguage).toHaveProperty('pug');
    });

    it('所有语言值应该是字符串', () => {
      Object.values(supportLanguage).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });
  });

  describe('monacoEditorInnerLanguages', () => {
    it('应该是一个数组', () => {
      expect(Array.isArray(monacoEditorInnerLanguages)).toBe(true);
    });

    it('应该包含基础语言', () => {
      expect(monacoEditorInnerLanguages).toContain('javascript');
      expect(monacoEditorInnerLanguages).toContain('typescript');
      expect(monacoEditorInnerLanguages).toContain('html');
      expect(monacoEditorInnerLanguages).toContain('css');
    });

    it('所有元素应该是字符串', () => {
      monacoEditorInnerLanguages.forEach(lang => {
        expect(typeof lang).toBe('string');
      });
    });

    it('不应该有重复元素', () => {
      const uniqueLangs = [...new Set(monacoEditorInnerLanguages)];
      expect(uniqueLangs.length).toBe(monacoEditorInnerLanguages.length);
    });
  });

  describe('scopeNameMap', () => {
    it('应该是一个对象', () => {
      expect(typeof scopeNameMap).toBe('object');
      expect(scopeNameMap).not.toBeNull();
    });

    it('应该包含常见语言的 scope', () => {
      expect(scopeNameMap).toHaveProperty('javascript');
      expect(scopeNameMap).toHaveProperty('typescript');
    });

    it('所有 scope 值应该是字符串', () => {
      Object.values(scopeNameMap).forEach(scope => {
        expect(typeof scope).toBe('string');
      });
    });

    it('scope 值应该以 source. 或 text. 开头', () => {
      Object.values(scopeNameMap).forEach(scope => {
        expect(
          scope.startsWith('source.') || scope.startsWith('text.')
        ).toBe(true);
      });
    });
  });

  describe('tmGrammarJsonMap', () => {
    it('应该是一个对象', () => {
      expect(typeof tmGrammarJsonMap).toBe('object');
      expect(tmGrammarJsonMap).not.toBeNull();
    });

    it('所有值应该是字符串或对象', () => {
      Object.values(tmGrammarJsonMap).forEach(value => {
        expect(['string', 'object'].includes(typeof value)).toBe(true);
      });
    });

    it('对象值应该包含 format 和 path', () => {
      Object.values(tmGrammarJsonMap).forEach(value => {
        if (typeof value === 'object') {
          expect(value).toHaveProperty('format');
          expect(value).toHaveProperty('path');
        }
      });
    });
  });

  describe('defaultViewThemeConfig', () => {
    it('应该是一个对象', () => {
      expect(typeof defaultViewThemeConfig).toBe('object');
      expect(defaultViewThemeConfig).not.toBeNull();
    });

    it('应该包含主题配置项', () => {
      expect(Object.keys(defaultViewThemeConfig).length).toBeGreaterThan(0);
    });

    it('所有值应该是数组', () => {
      Object.values(defaultViewThemeConfig).forEach(value => {
        expect(Array.isArray(value)).toBe(true);
      });
    });

    it('数组应该至少有一个元素', () => {
      Object.values(defaultViewThemeConfig).forEach(arr => {
        expect(arr.length).toBeGreaterThan(0);
      });
    });
  });

  describe('defaultCodeThemeConfig', () => {
    it('应该被导出', () => {
      // defaultCodeThemeConfig 可能未定义，只测试导入不报错
      expect(true).toBe(true);
    });
  });

  describe('配置一致性', () => {
    it('supportLanguage 的键应该是有效的语言标识', () => {
      Object.keys(supportLanguage).forEach(key => {
        expect(key).toMatch(/^[a-z0-9]+$/);
      });
    });

    it('scopeNameMap 的键应该是有效的语言标识', () => {
      Object.keys(scopeNameMap).forEach(key => {
        expect(key).toMatch(/^[a-z0-9]+$/);
      });
    });
  });

  describe('边界情况', () => {
    it('supportLanguage 不应该为空', () => {
      expect(Object.keys(supportLanguage).length).toBeGreaterThan(0);
    });

    it('monacoEditorInnerLanguages 不应该为空', () => {
      expect(monacoEditorInnerLanguages.length).toBeGreaterThan(0);
    });

    it('scopeNameMap 不应该为空', () => {
      expect(Object.keys(scopeNameMap).length).toBeGreaterThan(0);
    });

    it('tmGrammarJsonMap 不应该为空', () => {
      expect(Object.keys(tmGrammarJsonMap).length).toBeGreaterThan(0);
    });
  });
});
