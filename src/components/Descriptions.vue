<template>
  <el-descriptions :column="column" :border="border" :title="title">
    <el-descriptions-item
      v-for="item in items"
      :key="item.prop"
      :label="item.label"
      :span="item.span || 1"
    >
      <!-- 支持插槽自定义渲染 -->
      <slot :name="item.prop" :value="data[item.prop]" :data="data">
        {{ formatValue(item, data[item.prop]) }}
      </slot>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
const props = defineProps({
  // 字段配置：[{ prop, label, type?: 'date'|'money'|'status', options?: [] }]
  items: { type: Array, required: true },
  // 数据对象
  data: { type: Object, default: () => ({}) },
  title: { type: String, default: '' },
  column: { type: Number, default: 2 },
  border: { type: Boolean, default: true }
})

function formatValue(item, val) {
  if (val == null || val === '') return '-'
  if (item.type === 'date') {
    return String(val).slice(0, 19).replace('T', ' ')
  }
  if (item.type === 'money') {
    return '¥' + Number(val).toLocaleString('zh-CN', { minimumFractionDigits: 2 })
  }
  if (item.type === 'status' && item.options) {
    const opt = item.options.find(o => o.value === val)
    return opt ? opt.label : val
  }
  return val
}
</script>
