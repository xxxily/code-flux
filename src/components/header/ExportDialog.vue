<template>
  <el-dialog
    title="输入导出文件名称"
    v-model="visible"
    :width="isMobile ? '100%' : '600'"
  >
    <el-input v-model="exportName"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirmExport">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElDialog, ElInput, ElButton, ElMessage } from 'element-plus'
import exportZip from '@/utils/exportZip'
import { isMobileDevice } from '@/utils'

const isMobile = isMobileDevice()

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const store = useStore()
const exportName = ref('')
const editData = computed(() => store.state.editData)

// 确认导出
const confirmExport = () => {
  if (exportName.value.trim() === '') {
    ElMessage.warning({
      message: '请输入文件名',
      type: 'warning'
    })
    return
  }
  visible.value = false
  exportZip(editData, exportName.value.trim())
}

// 打开时设置默认文件名
const open = () => {
  exportName.value = store.state.editData.title || ''
}

defineExpose({
  open
})
</script>
