<template>
  <el-form :model="model" inline class="search-form" @submit.prevent>
    <el-form-item
      v-for="field in fields"
      :key="field.prop"
      :label="field.label"
    >
      <!-- 输入框 -->
      <el-input
        v-if="field.type === 'input'"
        v-model="model[field.prop]"
        :placeholder="field.placeholder || `请输入${field.label}`"
        clearable
        style="width: 180px"
        @keyup.enter="handleSearch"
      />
      <!-- 下拉选择 -->
      <el-select
        v-else-if="field.type === 'select'"
        v-model="model[field.prop]"
        :placeholder="field.placeholder || `请选择${field.label}`"
        clearable
        style="width: 180px"
      >
        <el-option
          v-for="opt in field.options"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
      <!-- 日期范围 -->
      <el-date-picker
        v-else-if="field.type === 'daterange'"
        v-model="model[field.prop]"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 260px"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSearch">
        <el-icon><Search /></el-icon> 查询
      </el-button>
      <el-button @click="handleReset">
        <el-icon><Refresh /></el-icon> 重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  // 字段配置：[{ prop, label, type: 'input'|'select'|'daterange', options: [] }]
  fields: { type: Array, required: true }
})

const emit = defineEmits(['search', 'reset'])

// 内部维护一份 model，避免污染父组件
const model = reactive({})
props.fields.forEach(f => {
  model[f.prop] = f.type === 'daterange' ? [] : ''
})

function handleSearch() {
  emit('search', { ...model })
}

function handleReset() {
  props.fields.forEach(f => {
    model[f.prop] = f.type === 'daterange' ? [] : ''
  })
  emit('reset')
}
</script>

<style scoped>
.search-form {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}
</style>
