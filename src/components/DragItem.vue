<template>
  <div
    class="dragItem"
    :class="[dir, { hide: hide }]"
    :style="{
      width: sizeList.length > 0 ? sizeList[index].width + '%' : 0,
      height: sizeList.length > 0 ? sizeList[index].height + '%' : 0
    }"
  >
    <div
      v-if="showTouchBar"
      class="touchBar"
      :style="{
        width: dir === 'h' ? touchBarSize + 'px' : '100%',
        height: dir === 'h' ? '100%' : touchBarSize + 'px'
      }"
      :class="[{ canDrag: !disabled }, dir]"
      @mousedown="onMousedown"
      @touchstart.prevent="onTouchstart"
      @dblclick="onTouchBarDblClick"
      @touchend.prevent="handleTouchDoubleTap"
    >
      <span class="title" v-html="titleStr"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import {
  onBeforeUnmount,
  watch,
  inject,
  getCurrentInstance,
  computed,
  ref
} from 'vue'
import Drag from '@/utils/Drag.js'

// props
const props = defineProps({
  // 是否禁止拖动
  disabled: {
    type: Boolean,
    default: false
  },
  // 拖动条的尺寸
  touchBarSize: {
    type: Number,
    default: 20
  },
  // 该组件在容器内的同级`DragItem`组件列表中的索引，从0开始
  index: {
    type: Number,
    default: 0
  },
  // 是否显示拖动条
  showTouchBar: {
    type: Boolean,
    default: true
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 是否隐藏该组件
  hide: {
    type: Boolean,
    default: false
  }
})

// 触发事件
const emit = defineEmits(['size-change'])

// hooks部分

// 初始化
const useInit = ({ props }) => {
  const dir = inject('dir')
  const titleStr = computed(() => {
    return dir.value === 'h' ? props.title.split('').join('<br>') : props.title
  })

  return {
    dir,
    titleStr
  }
}

// 尺寸列表处理
const useSizeList = ({ emit }) => {
  const sizeList = inject('sizeList')

  watch(
    [
      () => {
        return sizeList.value.length > 0 ? sizeList.value[props.index].width : 0
      },
      () => {
        return sizeList.value.length > 0
          ? sizeList.value[props.index].height
          : 0
      }
    ],
    () => {
      emit('size-change')
    }
  )

  return {
    sizeList
  }
}

// 拖动处理
const useDrag = ({ props }) => {
  const { proxy } = getCurrentInstance()
  const onDragStart = inject('onDragStart')
  const onDrag = inject('onDrag')
  // 拖动方法
  let drag = null
  if (!props.disabled) {
    drag = new Drag(
      (...args) => {
        onDragStart(...args)
      },
      (...args) => {
        onDrag(props.index, ...args)
      },
      (...args) => {
        proxy.$eventEmitter.emit('dragOver', ...args)
      }
    )
  }

  // 拖动条鼠标按下事件
  const onMousedown = e => {
    proxy.$eventEmitter.emit('dragStart')
    drag && drag.onMousedown(e)
  }

  // 拖动条触摸开始事件
  const onTouchstart = e => {
    proxy.$eventEmitter.emit('dragStart')
    drag && drag.onTouchstart(e)
  }

  // 即将解除挂载
  onBeforeUnmount(() => {
    drag && drag.off()
  })

  return {
    onMousedown,
    onTouchstart
  }
}

// 添加收起/展开功能
const useCollapseExpand = ({ props }) => {
  const collapseItem = inject('collapseItem')
  const expandItem = inject('expandItem')
  const isCollapsed = ref(false)
  
  // 用于检测双击的变量
  const lastTapTime = ref(0)
  const doubleTapDelay = 300 // 双击间隔时间（毫秒）
  
  // TouchBar双击事件处理
  const onTouchBarDblClick = () => {
    if (isCollapsed.value) {
      // 如果已收起，则展开
      const result = expandItem(props.index)
      if (result) {
        isCollapsed.value = false
      }
    } else {
      // 如果未收起，则收起
      const result = collapseItem(props.index, props.touchBarSize)
      if (result) {
        isCollapsed.value = true
      }
    }
  }
  
  // 处理移动端的双击
  const handleTouchDoubleTap = (e) => {
    const currentTime = new Date().getTime()
    const tapLength = currentTime - lastTapTime.value
    
    if (tapLength < doubleTapDelay && tapLength > 0) {
      // 检测到双击
      e.preventDefault()
      onTouchBarDblClick()
    }
    
    lastTapTime.value = currentTime
  }
  
  return {
    onTouchBarDblClick,
    handleTouchDoubleTap,
    isCollapsed
  }
}

// created部分
const { dir, titleStr } = useInit({ props })
const { sizeList } = useSizeList({ emit })
const { onMousedown, onTouchstart } = useDrag({ props })
const { onTouchBarDblClick, handleTouchDoubleTap } = useCollapseExpand({ props })
</script>

<style scoped lang="less">
.dragItem {
  display: flex;
  background-color: var(--editor-background);

  &.hide {
    display: none;
  }

  &.v {
    flex-direction: column;
  }

  .touchBar {
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--touch-bar-background);
    touch-action: none; /* 防止浏览器默认的触摸行为 */
    z-index: 9;

    &.canDrag {
      &.v {
        cursor: row-resize;
      }

      &.h {
        cursor: col-resize;
      }
    }

    &.h {
      border-left: 1px solid var(--touch-bar-border-left-color);
      border-right: 1px solid var(--touch-bar-border-right-color);
      height: 100%;

      .title {
        display: block;
        margin-left: 0px;
        margin-top: 5px;
        text-align: center;
      }
    }

    &.v {
      border-top: 1px solid var(--touch-bar-border-left-color);
      border-bottom: 1px solid var(--touch-bar-border-right-color);
      width: 100%;
    }

    .title {
      display: flex;
      align-items: center;
      color: var(--editor-header-title-color);
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
</style>
