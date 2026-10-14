<template>
  <el-select
    :model-value="modelValue"
    :placeholder="placeholder"
    clearable
    :disabled="disabled"
    style="width: 100%"
    @update:model-value="handleChange"
  >
    <el-option
      v-for="opt in options"
      :key="opt.value"
      :label="opt.label"
      :value="opt.value"
    />
  </el-select>
</template>

<script setup>
import { ref, watch } from 'vue'

// 字典缓存：避免重复请求
const dictCache = {}

const props = defineProps({
  // 字典类型（对应后端字典 code）
  dictCode: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String, default: '请选择' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const options = ref([])

async function loadDict() {
  if (dictCache[props.dictCode]) {
    options.value = dictCache[props.dictCode]
    return
  }
  // 实际项目这里调后端字典接口，模板里用假数据演示
  options.value = await mockDictApi(props.dictCode)
  dictCache[props.dictCode] = options.value
}

// 模拟字典接口
function mockDictApi(code) {
  const mockData = {
    user_status: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    order_type: [
      { label: '转账', value: 'transfer' },
      { label: '汇款', value: 'remit' },
      { label: '缴费', value: 'pay' }
    ]
  }
  return Promise.resolve(mockData[code] || [])
}

function handleChange(val) {
  emit('update:modelValue', val)
  emit('change', val)
}

watch(() => props.dictCode, loadDict, { immediate: true })
</script>
