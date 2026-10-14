<template>
  <!-- 用 TablePage 一行组件搞定整个列表页 -->
  <table-page
    title="员工管理"
    :search-fields="searchFields"
    :columns="columns"
    :data="tableData"
    :loading="loading"
    show-add
    add-text="新增员工"
    @search="handleSearch"
    @add="handleAdd"
  >
    <!-- 自定义状态列 -->
    <template #status="{ row }">
      <status-tag :status="row.status" />
    </template>
    <!-- 操作列 -->
    <template #action="{ row }">
      <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
      <el-button link type="danger" size="small">删除</el-button>
    </template>
  </table-page>

  <!-- 其他组件演示 -->
  <el-row :gutter="16" style="margin-top:16px;">
    <el-col :span="12">
      <chart-card :option="chartOption" height="280px" />
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header><span>文件上传 UploadFile</span></template>
        <upload-file tip="支持 PDF / Word / 图片，单个不超过 10MB" :max-size="10" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import TablePage from '@/components/TablePage.vue'
import StatusTag from '@/components/StatusTag.vue'
import ChartCard from '@/components/ChartCard.vue'
import UploadFile from '@/components/UploadFile.vue'

const loading = ref(false)

const searchFields = [
  { prop: 'name', label: '姓名', type: 'input' },
  {
    prop: 'department', label: '部门', type: 'select',
    options: [
      { label: '技术部', value: 'tech' },
      { label: '产品部', value: 'product' },
      { label: '运营部', value: 'operation' }
    ]
  }
]

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', minWidth: 120 },
  { prop: 'phone', label: '手机号', width: 140 },
  { prop: 'department', label: '部门', minWidth: 120 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'createdAt', label: '创建时间', width: 180, sortable: true }
]

const tableData = ref(
  Array.from({ length: 57 }, (_, i) => ({
    id: i + 1,
    name: `员工${i + 1}`,
    phone: `1380000${String(1000 + i)}`,
    department: ['技术部', '产品部', '运营部'][i % 3],
    status: [1, 1, 2, 0][i % 4],
    createdAt: '2026-10-14 10:30:00'
  }))
)

const chartOption = {
  title: { text: '监测点趋势', left: 'center', textStyle: { fontSize: 14 } },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五'] },
  yAxis: { type: 'value' },
  series: [
    { name: '监测点A', type: 'line', smooth: true, data: [120, 132, 101, 134, 190] },
    { name: '监测点B', type: 'line', smooth: true, data: [220, 182, 191, 234, 290] }
  ]
}

function handleSearch(params) { console.log('搜索:', params) }
function handleAdd() { console.log('新增') }
function handleEdit(row) { console.log('编辑:', row) }
</script>
