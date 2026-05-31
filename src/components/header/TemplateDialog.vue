<template>
  <el-dialog
    title="选择模板"
    v-model="visible"
    :width="isMobile ? '100%' : '760'"
  >
    <div class="templateList">
      <div
        class="templateItem"
        v-for="item in templateData"
        :key="item.name"
        @click="selectTemplate(item)"
      >
        <div
          class="icon"
          :style="{ backgroundImage: `url(${item.icon})` }"
        ></div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, getCurrentInstance, nextTick } from 'vue'
import { useStore } from 'vuex'
import templateList from '@/config/templates'
import { ElDialog } from 'element-plus'
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

const { proxy } = getCurrentInstance()
const store = useStore()
const templateData = ref(templateList)
const layout = computed(() => {
  return store.state.editData.config.layout
})

// 检查布局是否和模板对应
const checkLayout = data => {
  if (data.isVueSFC) {
    if (layout.value !== 'vue') {
      store.commit('setLayout', 'vue')
    }
  } else {
    if (layout.value === 'vue') {
      store.commit('setLayout', 'default')
    }
  }
}

// 选择某个模板
const selectTemplate = data => {
  checkLayout(data)
  nextTick(() => {
    store.commit('setCode', JSON.parse(JSON.stringify(data.code)))
    proxy.$eventEmitter.emit('reset_code')
    visible.value = false
  })
}
</script>

<style scoped lang="less">
.templateList {
  width: 100%;
  height: 400px;
  overflow: auto;
  background-color: var(--editor-background);
  color: var(--dropdown-color);

  .templateItem {
    width: 228px;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--dropdown-box-border-color);
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: var(--dropdown-hover-background);
    }

    .icon {
      width: 60px;
      height: 60px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-left: 10px;
    }

    .name {
      font-weight: bold;
      margin-left: 20px;
      font-size: 18px;
    }
  }
}

@media screen and (max-width: 980px) {
  .templateList {
    height: 100%;

    .templateItem {
      width: 160px;
      height: 48px;
      margin-right: 5px;
      margin-bottom: 10px;

      .icon {
        width: 25px;
        height: 25px;
        margin-left: 8px;
      }

      .name {
        margin-left: 12px;
        font-size: 12px;
      }
    }
  }
}
</style>
