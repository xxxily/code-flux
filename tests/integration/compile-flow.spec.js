import { describe, it, expect, vi, beforeEach } from 'vitest';
import { compile, compileVue } from '@/utils/index';
import { load } from '@/utils/load';
import transform from '@/utils/transform';

// Mock load 函数
vi.mock('@/utils/load', () => ({
  load: vi.fn(() => Promise.resolve())
}));

// Mock transform 函数
vi.mock('@/utils/transform', () => ({
  default: {
    html: vi.fn((lang, content) => Promise.resolve(content)),
    js: vi.fn((lang, content) => Promise.resolve({ js: content })),
    css: vi.fn((lang, content) => Promise.resolve(content)),
    vue: vi.fn(() => Promise.resolve({
      html: '<div>vue compiled</div>',
      css: '',
      js: { js: 'console.log("vue");' }
    }))
  }
}));

describe('编译流程集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('compile 函数', () => {
    it('应该成功编译简单的 HTML/CSS/JS', async () => {
      const html = '<div id="app">Hello</div>';
      const css = 'body { margin: 0; }';
      const js = 'console.log("test");';

      const result = await compile('html', 'javascript', 'css', html, js, {}, css);

      expect(result).toBeDefined();
      expect(result.html).toBe(html);
      expect(result.css).toBe(css);
      expect(result.js.js).toBe(js);
    });

    it('应该调用 load 加载必要的编译器', async () => {
      await compile('html', 'typescript', 'scss', '', '', {}, '');

      expect(load).toHaveBeenCalledWith(['html', 'typescript', 'scss']);
    });

    it('应该调用 transform 进行转换', async () => {
      const html = '<div>test</div>';
      const js = 'const x = 1;';
      const css = 'body { color: red; }';
      const importMap = { imports: {} };

      await compile('html', 'javascript', 'css', html, js, importMap, css);

      expect(transform.html).toHaveBeenCalledWith('html', html);
      expect(transform.js).toHaveBeenCalledWith('javascript', js, importMap);
      expect(transform.css).toHaveBeenCalledWith('css', css);
    });

    it('应该处理编译错误', async () => {
      // Mock transform 抛出错误
      transform.js.mockRejectedValueOnce(new Error('Syntax error'));

      await expect(
        compile('html', 'javascript', 'css', '', 'invalid js', {}, '')
      ).rejects.toThrow('Syntax error');
    });

    it('应该返回正确的数据结构', async () => {
      const result = await compile('html', 'javascript', 'css', '<div>test</div>', 'console.log(1);', {}, 'body{}');

      expect(result).toHaveProperty('html');
      expect(result).toHaveProperty('js');
      expect(result).toHaveProperty('css');
    });

    it('应该处理空内容', async () => {
      const result = await compile('html', 'javascript', 'css', '', '', {}, '');

      expect(result).toBeDefined();
      expect(result.html).toBe('');
      expect(result.css).toBe('');
      expect(result.js.js).toBe('');
    });

    it('应该支持不同的语言', async () => {
      await compile('markdown', 'typescript', 'less', '', '', {}, '');

      expect(load).toHaveBeenCalledWith(['markdown', 'typescript', 'less']);
      expect(transform.html).toHaveBeenCalledWith('markdown', '');
      expect(transform.js).toHaveBeenCalledWith('typescript', '', {});
      expect(transform.css).toHaveBeenCalledWith('less', '');
    });
  });

  describe('compileVue 函数', () => {
    it('应该成功编译 Vue 单文件组件', async () => {
      const vueContent = `
        <template>
          <div>{{ message }}</div>
        </template>
        <script setup>
        import { ref } from 'vue'
        const message = ref('Hello Vue')
        </script>
      `;

      const result = await compileVue('vue', vueContent, {});

      expect(result).toBeDefined();
      expect(result.html).toBeDefined();
      expect(result.js).toBeDefined();
    });

    it('应该调用 load 加载 Vue 编译器', async () => {
      await compileVue('vue', '', {});

      expect(load).toHaveBeenCalledWith(['vue']);
    });

    it('应该调用 transform.vue 进行转换', async () => {
      const vueContent = '<template><div>test</div></template>';
      const importMap = { imports: {} };

      await compileVue('vue', vueContent, importMap);

      expect(transform.vue).toHaveBeenCalledWith('vue', vueContent, importMap);
    });

    it('应该处理编译错误', async () => {
      transform.vue.mockRejectedValueOnce(new Error('Vue compile error'));

      await expect(
        compileVue('vue', 'invalid vue', {})
      ).rejects.toThrow('Vue compile error');
    });

    it('应该处理空的 Vue 内容', async () => {
      const result = await compileVue('vue', '', {});

      expect(result).toBeDefined();
    });

    it('应该返回包含 html、css、js 的对象', async () => {
      const result = await compileVue('vue', '<template><div>test</div></template>', {});

      expect(result).toHaveProperty('html');
      expect(result).toHaveProperty('css');
      expect(result).toHaveProperty('js');
    });

    it('应该处理 null 返回值', async () => {
      transform.vue.mockResolvedValueOnce(null);

      const result = await compileVue('vue', '', );

      expect(result).toBeNull();
    });
  });

  describe('编译流程完整性', () => {
    it('应该按顺序执行 load -> transform', async () => {
      const callOrder = [];

      load.mockImplementation(() => {
        callOrder.push('load');
        return Promise.resolve();
      });

      transform.html.mockImplementation(() => {
        callOrder.push('transform.html');
        return Promise.resolve('');
      });

      transform.js.mockImplementation(() => {
        callOrder.push('transform.js');
        return Promise.resolve({ js: '' });
      });

      transform.css.mockImplementation(() => {
        callOrder.push('transform.css');
        return Promise.resolve('');
      });

      await compile('html', 'javascript', 'css', '', '', {}, '');

      expect(callOrder[0]).toBe('load');
      expect(callOrder).toContain('transform.html');
      expect(callOrder).toContain('transform.js');
      expect(callOrder).toContain('transform.css');
    });

    it('应该并行执行所有 transform', async () => {
      const startTimes = {};
      const endTimes = {};

      transform.html.mockImplementation(async () => {
        startTimes.html = Date.now();
        await new Promise(resolve => setTimeout(resolve, 10));
        endTimes.html = Date.now();
        return '';
      });

      transform.js.mockImplementation(async () => {
        startTimes.js = Date.now();
        await new Promise(resolve => setTimeout(resolve, 10));
        endTimes.js = Date.now();
        return { js: '' };
      });

      transform.css.mockImplementation(async () => {
        startTimes.css = Date.now();
        await new Promise(resolve => setTimeout(resolve, 10));
        endTimes.css = Date.now();
        return '';
      });

      await compile('html', 'javascript', 'css', '', '', {}, '');

      // 验证它们几乎同时开始（并行执行）
      const startTimeDiff = Math.max(
        Math.abs(startTimes.html - startTimes.js),
        Math.abs(startTimes.js - startTimes.css),
        Math.abs(startTimes.html - startTimes.css)
      );

      // 并行执行的话，开始时间差应该很小（小于5ms）
      expect(startTimeDiff).toBeLessThan(5);
    });
  });
});
