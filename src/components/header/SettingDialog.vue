<template>
  <el-dialog
    custom-class="settingDialog"
    title="设置"
    :width="isMobile ? '100%' : '600'"
    v-model="visible"
  >
    <div class="settingBox">
      <el-tabs :tab-position="isMobile ? 'top' : 'left'" v-model="settingType">
        <el-tab-pane label="布局设置" name="layout"></el-tab-pane>
        <el-tab-pane label="主题设置" name="theme"></el-tab-pane>
        <el-tab-pane label="初始代码" name="initial-code"></el-tab-pane>
        <el-tab-pane label="保存回调" name="callback"></el-tab-pane>
        <el-tab-pane label="其他设置" name="setting"></el-tab-pane>
        <el-tab-pane label="关于" name="about"></el-tab-pane>
      </el-tabs>
      <div class="settingContent">
        <component :is="componentsMap[settingType]"></component>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue'
import { ElDialog, ElTabs, ElTabPane } from 'element-plus'
import Setting from '../Setting.vue'
import SettingLayout from '../SettingLayout.vue'
import SettingTheme from '../SettingTheme.vue'
import SettingAbout from '../SettingAbout.vue'
import SettingInitialCode from '../SettingInitialCode.vue'
import SettingCallback from '../SettingCallback.vue'
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

const settingType = ref('layout')
const componentsMap = shallowRef({
  theme: SettingTheme,
  layout: SettingLayout,
  'initial-code': SettingInitialCode,
  callback: SettingCallback,
  setting: Setting,
  about: SettingAbout
})
</script>

<style lang="less">
.settingDialog {
  .el-dialog__body {
    padding: 0px;
  }

  @media screen and (max-width: 980px) {
    margin: 0 !important;
    
    .el-dialog__header {
      padding: 12px;
      margin-right: 0;
    }
    
    .el-dialog__title {
      font-size: 14px;
    }

    // 移动端下dialog占满全屏
    .el-dialog {
      width: 100% !important;
      height: 100% !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      border-radius: 0;
      
      .el-dialog__body {
        height: calc(100% - 45px); // 减去header高度
        font-size: 12px;
      }
    }
  }
}
</style>

<style scoped lang="less">
.settingBox {
  display: flex;
  padding: 28px 10px;

  @media screen and (max-width: 980px) {
    padding: 12px 5px;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  :deep(.el-tabs) {
    flex-grow: 0;
    flex-shrink: 0;
    
    @media screen and (max-width: 980px) {
      .el-tabs__header {
        margin-bottom: 12px;
      }
      
      .el-tabs__nav-wrap {
        padding: 0 8px;
        
        &.is-scrollable {
          padding: 0 20px;
          
          .el-tabs__nav-prev,
          .el-tabs__nav-next {
            line-height: 32px;
            color: var(--dropdown-color); // 添加箭头颜色
          }
        }
      }
      
      .el-tabs__nav {
        white-space: nowrap;
        position: relative;
        transition: transform .3s;
        
        .el-tabs__item {
          padding: 0 12px;
          font-size: 12px;
          height: 32px;
          line-height: 32px;
          display: inline-block;
        }
      }
    }
    
    .el-tabs__item {
      color: var(--dropdown-color);
      
      &.is-active {
        color: var(--header-btn-color);
      }
      
      &:hover {
        color: var(--dropdown-hover-color);
      }
    }
    
    .el-tabs__nav-wrap::after {
      background-color: var(--editor-header-border-bottom-color);
    }
  }

  .settingContent {
    flex: 1;
    height: 300px;
    overflow: auto;
    padding: 0 15px;
    color: var(--dropdown-color);

    @media screen and (max-width: 980px) {
      height: calc(100% - 44px); // 减去tabs的高度
      padding: 0 10px;
    }
  }
}
</style>
