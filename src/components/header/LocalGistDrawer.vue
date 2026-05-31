<template>
  <el-drawer
    v-model="visible"
    title="本地项目"
    direction="rtl"
    :size="isMobile ? '100%' : '900px'"
    @open="onDrawerOpen"
    @closed="onDrawerClosed"
  >
    <template #header>
      <div style="flex: 1; display: flex; align-items: center; justify-content: space-between">
        <span>本地项目</span>
        <el-button 
          v-if="selectedGists.length"
          type="danger" 
          size="small" 
          @click="batchDeleteGists"
          style="margin-right: 10px;"
        >
          批量删除({{ selectedGists.length }})
        </el-button>
      </div>
    </template>

    <div class="gistBox">
      <el-table
        ref="tableRef"
        :data="gistList"
        style="width: 100%"
        empty-text="还没有保存过代码~"
        v-loading="loading"
        height="100%"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="28" />
        <el-table-column label="名称" prop="description" />
        <el-table-column label="创建时间" prop="created_at" width="110" align="center">
          <template #default="scope">
            {{ dayjs(scope.row.created_at).format('YYYY/MM/DD') }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updated_at" width="150" align="center">
          <template #default="scope">
            {{ dayjs(scope.row.updated_at).format('YYYY/MM/DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :width="isMobile ? '86' : '120'" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              circle
              size="small"
              @click.stop="updateGist(scope.row.id)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              size="small"
              @click.stop="deleteGist(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
      
      <div class="paginationBox" v-if="total > 0">
        <el-pagination
          layout="prev, next"
          :current-page="pageNo"
          :page-count="Math.ceil(total / pageSize)"
          prev-text="上一页"
          next-text="下一页"
          @current-change="pageChange"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElDrawer, ElTable, ElTableColumn, ElButton, ElPagination, ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import { localDb } from '@/utils/localDb'
import { isMobileDevice } from '@/utils'
import dayjs from 'dayjs'

const isMobile = isMobileDevice()

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const router = useRouter()
const route = useRoute()
const gistList = ref([])
const loading = ref(false)
const pageNo = ref(1)
const pageSize = ref(20)
const total = ref(0)
const selectedGists = ref([])
const tableRef = ref()

const onDrawerOpen = async () => {
  try {
    loading.value = true
    // 获取总数
    const allGists = await localDb.getAllGists()
    total.value = allGists.length
    
    // 获取分页数据
    const data = await localDb.getGists(pageNo.value, pageSize.value)
    gistList.value = data
    loading.value = false
  } catch (e) {
    console.error(e)
    loading.value = false
    ElMessage.error('获取失败')
  }
}

const pageChange = (page) => {
  pageNo.value = page
  onDrawerOpen()
}

const onDrawerClosed = () => {
  gistList.value = []
  pageNo.value = 1
  total.value = 0
  selectedGists.value = []
}

const deleteGist = async (id) => {
  try {
    loading.value = true
    await localDb.deleteGist(id)
    loading.value = false
    ElMessage.success('删除成功')
    onDrawerOpen()
  } catch (error) {
    console.log(error)
    loading.value = false
    ElMessage.error('删除失败')
  }
}

const updateGist = async (id) => {
  try {
    // 先获取本地数据
    const localData = await localDb.getGist(id)
    if (!localData) {
      ElMessage.error('数据不存在')
      return
    }
    
    // 确保数据加载完成后再关闭抽屉并跳转
    visible.value = false
    
    // 使用 push 而不是 replace 来避免重定向问题
    router.push({
      name: 'LocalEdit',
      params: {
        id: String(id)
      }
    })
  } catch (error) {
    console.error(error)
    ElMessage.error('加载数据失败')
  }
}

const handleSelectionChange = (selection) => {
  selectedGists.value = selection
}

const handleRowClick = (row) => {
  // 获取表格实例并切换当前行的选中状态
  const table = tableRef.value
  if (table) {
    table.toggleRowSelection(row)
  }
}

const batchDeleteGists = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedGists.value.length} 个项目吗？`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    loading.value = true
    const deletePromises = selectedGists.value.map(gist => 
      localDb.deleteGist(gist.id)
    )

    await Promise.all(deletePromises)
    
    ElMessage.success('批量删除成功')
    
    // 如果当前正在查看的本地项目被删除，则跳转到编辑器
    const deletedIds = selectedGists.value.map(g => g.id)
    if (route.name === 'LocalEdit' && deletedIds.includes(Number(route.params.id))) {
      router.replace({
        name: 'Editor'
      })
    }
    
    // 清空选中项并重新加载列表
    selectedGists.value = []
    await onDrawerOpen()
  } catch (error) {
    if (error === 'cancel') return
    console.error(error)
    ElMessage.error('批量删除失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="less">
:deep(.el-drawer__body) {
  overflow: hidden;

  .gistBox {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .paginationBox {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

/* 添加表格行的鼠标样式 */
:deep(.el-table__row) {
  cursor: pointer;
}
</style>
