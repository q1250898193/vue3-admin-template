<template>
  <el-tag :type="tagType" size="small">{{ label }}</el-tag>
</template>

<script setup>
import { computed } from 'vue'

// 通用状态映射表，业务里可扩展
const STATUS_MAP = {
  0: { label: '禁用', type: 'info' },
  1: { label: '启用', type: 'success' },
  2: { label: '待审核', type: 'warning' },
  3: { label: '已驳回', type: 'danger' },
  // 监测系统常用
  normal: { label: '正常', type: 'success' },
  alarm: { label: '报警', type: 'danger' },
  warning: { label: '预警', type: 'warning' }
}

const props = defineProps({
  status: { type: [String, Number], required: true },
  // 允许外部传入自定义映射
  customMap: { type: Object, default: () => ({}) }
})

const mergedMap = computed(() => ({ ...STATUS_MAP, ...props.customMap }))

const label = computed(() => {
  return mergedMap.value[props.status]?.label ?? String(props.status)
})

const tagType = computed(() => {
  return mergedMap.value[props.status]?.type ?? 'info'
})
</script>
