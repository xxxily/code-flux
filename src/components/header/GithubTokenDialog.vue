<template>
  <el-dialog
    title="请输入您的github token"
    v-model="visible"
    :width="isMobile ? '100%' : '600'"
  >
    <el-input
      v-model="githubTokenValue"
      type="password"
      show-password
      placeholder="请输入您的Token"
    ></el-input>

    <p class="tip">
      如果你没有创建过github token，或者忘记了之前创建的，可以去创建一个新的<a
        href="https://github.com/settings/tokens/new?scopes=repo"
        target="_blank"
        >token</a
      >，注意一定要勾选上【scopes】里的【gist】选项。
    </p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElDialog, ElInput, ElButton, ElMessage } from 'element-plus'
import { isMobileDevice } from '@/utils'

const isMobile = isMobileDevice()

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const store = useStore()
const router = useRouter()
const route = useRoute()
const githubTokenValue = ref('')

// 确认输入
const confirm = () => {
  let trimValue = githubTokenValue.value
  if (!trimValue) {
    ElMessage.warning('请输入token')
    return
  }
  store.dispatch('saveGithubToken', trimValue)
  visible.value = false
  githubTokenValue.value = ''
  if (route.name === 'Editor' && !!route.query.data) {
    router.replace({
      name: 'Editor'
    })
  }
}

// 取消输入
const cancel = () => {
  visible.value = false
  githubTokenValue.value = ''
}
</script>

<style scoped lang="less">
.tip {
  margin-top: 10px;
  color: var(--dropdown-color);
}
</style>
