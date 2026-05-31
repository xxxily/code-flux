import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import Resize from '@/utils/Resize';

describe('Resize 类', () => {
  let resize;

  beforeEach(() => {
    resize = new Resize();
  });

  describe('构造函数', () => {
    it('应该正确初始化', () => {
      expect(resize).toBeDefined();
      expect(resize._dir).toBe('');
      expect(resize._prop).toBe('');
      expect(resize._containerSize).toBe(0);
      expect(resize._dragItemList).toEqual([]);
      expect(resize._last).toBe(0);
    });

    it('应该初始化缓存对象', () => {
      expect(resize._minSizeCache).toEqual({});
      expect(resize._maxSizeCache).toEqual({});
      expect(resize._collapsedSizeCache).toEqual({});
    });

    it('应该绑定方法', () => {
      expect(typeof resize.init).toBe('function');
      expect(typeof resize.onDrag).toBe('function');
      expect(typeof resize.onDragStart).toBe('function');
      expect(typeof resize.collapseItem).toBe('function');
      expect(typeof resize.expandItem).toBe('function');
    });
  });

  describe('init 方法', () => {
    it('应该正确初始化配置', () => {
      const dragItemList = ref([
        { width: 100, height: 200 },
        { width: 150, height: 250 }
      ]);

      resize.init({
        dir: 'h',
        dragItemList,
        containerSize: 500
      });

      expect(resize._dir).toBe('h');
      expect(resize._dragItemList).toBe(dragItemList);
      expect(resize._containerSize).toBe(500);
      expect(resize._prop).toBe('width');
    });

    it('应该根据方向设置正确的属性', () => {
      resize.init({
        dir: 'v',
        dragItemList: ref([]),
        containerSize: 500
      });

      expect(resize._prop).toBe('height');

      resize.init({
        dir: 'h',
        dragItemList: ref([]),
        containerSize: 500
      });

      expect(resize._prop).toBe('width');
    });
  });

  describe('getMinSize 方法', () => {
    beforeEach(() => {
      resize.init({
        dir: 'h',
        dragItemList: ref([
          { width: 100, min: 50 },
          { width: 200, min: 100 }
        ]),
        containerSize: 500
      });
    });

    it('应该返回最小尺寸百分比', () => {
      const minSize = resize.getMinSize(0);
      expect(minSize).toBe(10); // 50/500 * 100 = 10%
    });

    it('应该缓存最小尺寸', () => {
      resize.getMinSize(0);
      expect(resize._minSizeCache[0]).toBe(10);
    });

    it('应该从缓存中读取最小尺寸', () => {
      resize._minSizeCache[0] = 15;
      const minSize = resize.getMinSize(0);
      expect(minSize).toBe(15);
    });

    it('应该处理没有 min 的情况', () => {
      resize._dragItemList = ref([{ width: 100 }]);
      const minSize = resize.getMinSize(0);
      expect(minSize).toBe(0);
    });
  });

  describe('getMaxSize 方法', () => {
    beforeEach(() => {
      resize.init({
        dir: 'h',
        dragItemList: ref([
          { width: 100, min: 50, max: 200 },
          { width: 150, min: 75, max: 300 }
        ]),
        containerSize: 500
      });
    });

    it('应该返回最大尺寸百分比', () => {
      const maxSize = resize.getMaxSize(0);
      expect(maxSize).toBe(40); // 200/500 * 100 = 40%
    });

    it('应该缓存最大尺寸', () => {
      resize.getMaxSize(0);
      expect(resize._maxSizeCache[0]).toBe(40);
    });

    it('应该从缓存中读取最大尺寸', () => {
      resize._maxSizeCache[0] = 50;
      const maxSize = resize.getMaxSize(0);
      expect(maxSize).toBe(50);
    });
  });

  describe('onDragStart 方法', () => {
    beforeEach(() => {
      resize.init({
        dir: 'h',
        dragItemList: ref([
          { width: 100 },
          { width: 200 }
        ]),
        containerSize: 500
      });
    });

    it('应该记录起始位置（水平）', () => {
      const event = { clientX: 150, clientY: 100 };
      resize.onDragStart(event);
      expect(resize._last).toBe(150);
    });

    it('应该记录起始位置（垂直）', () => {
      resize.init({
        dir: 'v',
        dragItemList: ref([{ height: 100 }]),
        containerSize: 500
      });
      const event = { clientX: 100, clientY: 200 };
      resize.onDragStart(event);
      expect(resize._last).toBe(200);
    });
  });

  describe('collapseItem 方法', () => {
    beforeEach(() => {
      resize.init({
        dir: 'h',
        dragItemList: ref([
          { width: 30, collapsed: false },
          { width: 70, collapsed: false }
        ]),
        containerSize: 500
      });
    });

    it('应该缓存收起前的尺寸', () => {
      resize.collapseItem(0, 20, 500);
      expect(resize._collapsedSizeCache[0]).toBe(30);
    });

    it('应该在已收起时返回 false', () => {
      resize._collapsedSizeCache[0] = 30;
      const result = resize.collapseItem(0, 20, 500);
      expect(result).toBe(false);
    });
  });

  describe('expandItem 方法', () => {
    beforeEach(() => {
      resize.init({
        dir: 'h',
        dragItemList: ref([
          { width: 4, collapsed: true },
          { width: 96, collapsed: false }
        ]),
        containerSize: 500
      });
      resize._collapsedSizeCache[0] = 30;
    });

    it('应该在未收起时返回 false', () => {
      delete resize._collapsedSizeCache[0];
      const result = resize.expandItem(0);
      expect(result).toBe(false);
    });

    it('应该能够展开项目', () => {
      resize.expandItem(0);
      // 验证缓存被清除
      expect(resize._collapsedSizeCache[0]).toBeUndefined();
    });
  });

  describe('垂直方向', () => {
    beforeEach(() => {
      resize.init({
        dir: 'v',
        dragItemList: ref([
          { height: 100, min: 50, max: 200 },
          { height: 150, min: 75, max: 300 }
        ]),
        containerSize: 500
      });
    });

    it('应该使用 height 属性', () => {
      expect(resize._prop).toBe('height');
    });

    it('应该获取最小高度', () => {
      const minSize = resize.getMinSize(0);
      expect(minSize).toBe(10); // 50/500 * 100 = 10%
    });

    it('应该获取最大高度', () => {
      const maxSize = resize.getMaxSize(0);
      expect(maxSize).toBe(40); // 200/500 * 100 = 40%
    });

    it('应该处理垂直方向的 onDragStart', () => {
      const event = { clientX: 100, clientY: 250 };
      resize.onDragStart(event);
      expect(resize._last).toBe(250);
    });
  });
});
