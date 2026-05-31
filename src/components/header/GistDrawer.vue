<template>
  <el-drawer
    v-model="visible"
    title="我的Gists"
    direction="rtl"
    :size="isMobile ? '100%' : '900px'"
    @open="onDrawerOpen"
    @closed="onDrawerClosed"
  >
    <template #header>
      <div style="flex: 1; display: flex; align-items: center; justify-content: space-between">
        <span>我的Gists</span>
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
        empty-text="好像没有更多了~"
        v-loading="gistloading"
        height="100%"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="28" />
        <el-table-column label="名称" prop="description" />
        <el-table-column label="是否公开" prop="public" width="80" align="center">
          <template #default="scope">
            {{ scope.row.public ? '是' : '否' }}
          </template>
        </el-table-column>
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
              @click.stop="deleteGist(scope.row.id, scope.$index)"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationBox">
        <el-pagination
          layout="prev, next"
          :current-page="gistPageNo"
          :page-count="gistPageCount"
          prev-text="上一页"
          next-text="下一页"
          @current-change="gistCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElDrawer, ElTable, ElTableColumn, ElButton, ElPagination, ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import { request } from '@/utils/octokit'
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
const gistloading = ref(false)
const gistPageNo = ref(1)
const gistPageCount = ref(1)
const selectedGists = ref([])
const tableRef = ref()

const onDrawerOpen = async () => {
  try {
    gistloading.value = true
    let { data } = await request('GET /gists', {
      page: gistPageNo.value,
      per_page: 20
    })
    if (data.length > 0) {
      gistPageCount.value = gistPageNo.value + 1
    }

    console.log('[gistList]', JSON.parse(JSON.stringify(data)))

    gistList.value = data
    gistloading.value = false
  } catch (e) {
    gistloading.value = false
    ElMessage.error('获取失败')
  }
}

const gistCurrentChange = pageNo => {
  gistPageNo.value = pageNo
  onDrawerOpen()
}

const onDrawerClosed = () => {
  gistList.value = []
  gistPageNo.value = 1
  selectedGists.value = []
}

const deleteGist = async (id, index) => {
  try {
    gistloading.value = true
    await request(`DELETE /gists/${id}`, {
      gist_id: id
    })
    gistloading.value = false
    // 从列表中移除该条数据
    gistList.value.splice(index, 1)

    ElMessage.success(
      '删除成功，注意：删除不是一个同步的过程，建议一分钟内不要重复删除！'
    )
    if (id === route.params.id) {
      router.replace({
        name: 'Editor'
      })
    }
  } catch (error) {
    console.log(error)
    gistloading.value = false
    ElMessage.error('删除失败')
  }
}

const updateGist = id => {
  visible.value = false
  router.replace({
    name: 'Edit',
    params: {
      id
    }
  })
}

// 处理表格选择变化
const handleSelectionChange = (selection) => {
  selectedGists.value = selection
}

// 处理行点击
const handleRowClick = (row) => {
  // 获取表格实例并切换当前行的选中状态
  const table = tableRef.value
  if (table) {
    table.toggleRowSelection(row)
  }
}

// 批量删除方法
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

    gistloading.value = true
    const deletePromises = selectedGists.value.map(gist => 
      request(`DELETE /gists/${gist.id}`, {
        gist_id: gist.id
      })
    )

    await Promise.all(deletePromises)
    
    // 从列表中移除已删除的项目
    const deletedIds = selectedGists.value.map(g => g.id)
    gistList.value = gistList.value.filter(g => !deletedIds.includes(g.id))
    
    // 清空选中项
    selectedGists.value = []
    
    ElMessage.success('批量删除成功，注意：删除不是一个同步的过程！')
    
    // 如果当前正在查看的 gist 被删除，则跳转到编辑器
    if (deletedIds.includes(route.params.id)) {
      router.replace({
        name: 'Editor'
      })
    }
  } catch (error) {
    if (error === 'cancel') return
    console.error(error)
    ElMessage.error('批量删除失败')
  } finally {
    gistloading.value = false
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
