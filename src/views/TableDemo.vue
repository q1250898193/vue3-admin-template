<template>
  <el-card style="margin-bottom:16px;">
    <template #header><span>搜索表单 SearchForm</span></template>
    <search-form :fields="searchFields" @search="handleSearch" @reset="handleReset" />
  </el-card>

  <el-card style="margin-bottom:16px;">
    <template #header><span>可配置表格 ProTable + 状态标签 StatusTag</span></template>
    <pro-table :columns="columns" :data="tableData" :loading="loading">
      <template #status="{ row }">
        <status-tag :status="row.status" />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" size="small">编辑</el-button>
        <el-button link type="danger" size="small">删除</el-button>
      </template>
    </pro-table>
  </el-card>

  <el-row :gutter="16">
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
import ProTable from '@/components/ProTable.vue'
import SearchForm from '@/components/SearchForm.vue'
import ChartCard from '@/components/ChartCard.vue'
import UploadFile from '@/components/UploadFile.vue'
import StatusTag from '@/components/StatusTag.vue'

const loading = ref(false)

// 搜索字段配置
const searchFields = [
  { prop: 'name', label: '姓名', type: 'input' },
  {
    prop: 'department', label: '部门', type: 'select',
    options: [
      { label: '技术部', value: 'tech' },
      { label: '产品部', value: 'product' },
      { label: '运营部', value: 'operation' }
    ]
  },
  { prop: 'dateRange', label: '入职日期', type: 'daterange' }
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

// ECharts 演示
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

function handleSearch(params) {
  console.log('搜索参数:', params)
}
function handleReset() {
  console.log('重置')
}
</script>
