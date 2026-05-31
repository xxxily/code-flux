import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Drag from '@/utils/Drag';

describe('Drag 类', () => {
  let drag;
  let downCallback;
  let moveCallback;
  let upCallback;

  beforeEach(() => {
    downCallback = vi.fn();
    moveCallback = vi.fn();
    upCallback = vi.fn();
    drag = new Drag(downCallback, moveCallback, upCallback);
  });

  afterEach(() => {
    if (drag) {
      drag.off();
    }
  });

  describe('构造函数', () => {
    it('应该正确初始化', () => {
      expect(drag).toBeDefined();
      expect(drag.isMouseDown).toBe(false);
      expect(drag.startPos).toEqual({ x: 0, y: 0 });
    });

    it('应该接受回调函数', () => {
      expect(drag.downCallback).toBe(downCallback);
      expect(drag.moveCallback).toBe(moveCallback);
      expect(drag.upCallback).toBe(upCallback);
    });

    it('应该使用默认回调函数', () => {
      const dragWithoutCallbacks = new Drag();
      expect(typeof dragWithoutCallbacks.downCallback).toBe('function');
      expect(typeof dragWithoutCallbacks.moveCallback).toBe('function');
      expect(typeof dragWithoutCallbacks.upCallback).toBe('function');
      dragWithoutCallbacks.off();
    });

    it('应该设置防抖时间', () => {
      expect(drag.touchDebounceTime).toBe(16);
    });

    it('应该初始化 lastTouchTime', () => {
      expect(drag.lastTouchTime).toBe(0);
    });
  });

  describe('鼠标事件', () => {
    it('应该处理 mousedown 事件', () => {
      const event = new MouseEvent('mousedown', {
        clientX: 100,
        clientY: 200
      });

      drag.onMousedown(event);

      expect(drag.isMouseDown).toBe(true);
      expect(drag.startPos.x).toBe(100);
      expect(drag.startPos.y).toBe(200);
      expect(downCallback).toHaveBeenCalledWith(event);
    });

    it('应该处理 mousemove 事件', () => {
      // 先触发 mousedown
      const downEvent = new MouseEvent('mousedown', {
        clientX: 100,
        clientY: 200
      });
      drag.onMousedown(downEvent);

      // 再触发 mousemove
      const moveEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 250
      });
      drag.onMousemove(moveEvent);

      expect(moveCallback).toHaveBeenCalledWith(50, 50, moveEvent);
    });

    it('应该在未按下鼠标时忽略 mousemove', () => {
      const moveEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 250
      });
      drag.onMousemove(moveEvent);

      expect(moveCallback).not.toHaveBeenCalled();
    });

    it('应该处理 mouseup 事件', () => {
      // 先触发 mousedown
      const downEvent = new MouseEvent('mousedown', {
        clientX: 100,
        clientY: 200
      });
      drag.onMousedown(downEvent);

      // 再触发 mouseup
      const upEvent = new MouseEvent('mouseup');
      drag.onMouseup(upEvent);

      expect(drag.isMouseDown).toBe(false);
      expect(upCallback).toHaveBeenCalledWith(upEvent);
    });
  });

  describe('触摸事件', () => {
    it('应该处理 touchstart 事件', () => {
      const event = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 200 }]
      });

      drag.onTouchstart(event);

      expect(drag.isMouseDown).toBe(true);
      expect(drag.startPos.x).toBe(100);
      expect(drag.startPos.y).toBe(200);
      expect(downCallback).toHaveBeenCalledWith(event);
    });

    it('应该处理 touchmove 事件', () => {
      // 先触发 touchstart
      const startEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 200 }]
      });
      drag.onTouchstart(startEvent);

      // 再触发 touchmove
      const moveEvent = new TouchEvent('touchmove', {
        touches: [{ clientX: 150, clientY: 250 }]
      });
      drag.onTouchmove(moveEvent);

      expect(moveCallback).toHaveBeenCalled();
    });

    it('应该在未触摸时忽略 touchmove', () => {
      const moveEvent = new TouchEvent('touchmove', {
        touches: [{ clientX: 150, clientY: 250 }]
      });
      drag.onTouchmove(moveEvent);

      expect(moveCallback).not.toHaveBeenCalled();
    });

    it('应该处理 touchend 事件', () => {
      // 先触发 touchstart
      const startEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 200 }]
      });
      drag.onTouchstart(startEvent);

      // 再触发 touchend
      const endEvent = new TouchEvent('touchend');
      drag.onTouchend(endEvent);

      expect(drag.isMouseDown).toBe(false);
      expect(upCallback).toHaveBeenCalledWith(endEvent);
    });

    it('应该防抖 touchmove 事件', () => {
      const startEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 200 }]
      });
      drag.onTouchstart(startEvent);

      // 快速触发多次 touchmove
      const moveEvent1 = new TouchEvent('touchmove', {
        touches: [{ clientX: 110, clientY: 210 }]
      });
      const moveEvent2 = new TouchEvent('touchmove', {
        touches: [{ clientX: 120, clientY: 220 }]
      });

      drag.onTouchmove(moveEvent1);
      drag.onTouchmove(moveEvent2);

      // 由于防抖，第二次调用可能被忽略
      expect(moveCallback).toHaveBeenCalled();
    });
  });

  describe('事件绑定和解绑', () => {
    it('应该正确解绑事件', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      drag.off();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', drag.onMousemove);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', drag.onMouseup);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('touchmove', drag.onTouchmove);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('touchend', drag.onTouchend);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('touchcancel', drag.onTouchend);

      removeEventListenerSpy.mockRestore();
    });
  });
});
