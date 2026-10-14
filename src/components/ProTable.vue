<template>
  <div class="pro-table">
    <!-- 搜索栏（可选，通过 #search 插槽传入） -->
    <div v-if="$slots.search" class="pro-table__search">
      <slot name="search"></slot>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="pageData"
      :border="border"
      style="width: 100%"
      :row-key="rowKey"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :fixed="col.fixed"
        :sortable="col.sortable || false"
        :align="col.align || 'left'"
        :show-overflow-tooltip="col.showOverflowTooltip !== false"
      >
        <!-- 支持自定义列插槽 -->
        <template v-if="$slots[col.prop]" #default="scope">
          <slot :name="col.prop" v-bind="scope"></slot>
        </template>
      </el-table-column>

      <!-- 操作列（可选） -->
      <el-table-column
        v-if="$slots.action"
        label="操作"
        :width="actionWidth || 150"
        fixed="right"
      >
        <template #default="scope">
          <slot name="action" v-bind="scope"></slot>
        </template>
      </el-table-column>

      <!-- 空状态 -->
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>

    <!-- 分页（可选） -->
    <div v-if="pagination" class="pro-table__pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  // 列配置：[{ prop, label, width, fixed, sortable }]
  columns: { type: Array, required: true },
  // 表格数据（全量，组件内部做分页）
  data: { type: Array, default: () => [] },
  // 是否显示分页
  pagination: { type: Boolean, default: true },
  // loading 状态
  loading: { type: Boolean, default: false },
  // 是否显示边框
  border: { type: Boolean, default: true },
  rowKey: { type: String, default: 'id' },
  // 操作列宽度
  actionWidth: { type: Number, default: 150 }
})

const emit = defineEmits(['page-change', 'size-change'])

const currentPage = ref(1)
const pageSize = ref(10)

// 前端分页：从全量数据里截取当前页
const pageData = computed(() => {
  if (!props.pagination) return props.data
  const start = (currentPage.value - 1) * pageSize.value
  return props.data.slice(start, start + pageSize.value)
})

const total = computed(() => props.data.length)

// 外部 data 变化时回到第一页
watch(() => props.data, () => {
  currentPage.value = 1
})

function handleSizeChange(size) {
  pageSize.value = size
  currentPage.value = 1
  emit('size-change', size)
}

function handleCurrentChange(page) {
  currentPage.value = page
  emit('page-change', page)
}
</script>

<style scoped lang="scss">
.pro-table__search {
  background: #fff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 4px;
}
.pro-table__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
