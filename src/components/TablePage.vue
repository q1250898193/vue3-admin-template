<template>
  <div class="table-page">
    <!-- 搜索区 -->
    <search-form
      v-if="searchFields.length"
      :fields="searchFields"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 表格卡片 -->
    <el-card>
      <div class="table-page__header">
        <span class="table-page__title">{{ title }}</span>
        <div class="table-page__actions">
          <slot name="actions" />
          <el-button
            v-if="showAdd"
            type="primary"
            :icon="Plus"
            @click="$emit('add')"
          >
            {{ addText }}
          </el-button>
        </div>
      </div>

      <pro-table
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
      >
        <!-- 透传所有插槽 -->
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </pro-table>
    </el-card>
  </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import SearchForm from './SearchForm.vue'
import ProTable from './ProTable.vue'

defineProps({
  // 页面标题
  title: { type: String, default: '' },
  // 搜索字段配置（传空数组则不显示搜索区）
  searchFields: { type: Array, default: () => [] },
  // 表格列配置
  columns: { type: Array, required: true },
  // 表格数据
  data: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  pagination: { type: Boolean, default: true },
  // 是否显示新增按钮
  showAdd: { type: Boolean, default: false },
  addText: { type: String, default: '新增' }
})

const emit = defineEmits(['search', 'reset', 'add'])

function handleSearch(params) {
  emit('search', params)
}
function handleReset() {
  emit('reset')
}
</script>

<style scoped>
.table-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.table-page__title {
  font-size: 16px;
  font-weight: 600;
}
.table-page__actions {
  display: flex;
  gap: 8px;
}
</style>
