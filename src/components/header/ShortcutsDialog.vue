<template>
  <el-dialog
    title="常用快捷键"
    v-model="visible"
    :width="isMobile ? '100%' : '400px'"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
  >
    <div class="shortcuts-list">
      <div class="shortcut-item" v-for="shortcut in shortcuts" :key="shortcut.id">
        <span class="shortcut-name">{{ shortcut.name }}</span>
        <span class="shortcut-key">{{ shortcut.description.split('(')[1].replace(')', '') }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { shortcuts } from '@/config/shortcuts'
import { computed } from 'vue'
import { ElDialog } from 'element-plus'
import { isMobileDevice } from '@/utils'

const isMobile = isMobileDevice()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style lang="less" scoped>
.shortcuts-list {
  .shortcut-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
    
    &:last-child {
      border-bottom: none;
    }
    
    .shortcut-name {
      color: var(--text-color);
      font-size: 14px;
    }
    
    .shortcut-key {
      color: var(--text-color-secondary);
      font-size: 13px;
      font-family: monospace;
      background: var(--background-color-light);
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
}
</style>
