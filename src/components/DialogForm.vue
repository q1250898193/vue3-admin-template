<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="model" :rules="rules" label-width="100px">
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
      >
        <el-input
          v-if="field.type === 'input'"
          v-model="model[field.prop]"
          :placeholder="`请输入${field.label}`"
        />
        <el-input
          v-else-if="field.type === 'textarea'"
          v-model="model[field.prop]"
          type="textarea"
          :rows="3"
        />
        <el-select
          v-else-if="field.type === 'select'"
          v-model="model[field.prop]"
          :placeholder="`请选择${field.label}`"
          style="width: 100%"
        >
          <el-option
            v-for="opt in field.options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model="model[field.prop]"
          style="width: 100%"
        />
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="model[field.prop]"
          type="date"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">
        {{ submitText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '编辑' },
  fields: { type: Array, required: true },
  // 初始数据（编辑时传入）
  initData: { type: Object, default: () => ({}) },
  rules: { type: Object, default: () => ({}) },
  width: { type: String, default: '500px' },
  submitText: { type: String, default: '确定' },
  submitting: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'submit', 'close'])

const visible = ref(props.modelValue)
const formRef = ref(null)
const model = reactive({})

// 初始化表单数据
function initModel() {
  props.fields.forEach(f => {
    model[f.prop] = props.initData[f.prop] ?? (f.type === 'number' ? undefined : '')
  })
}
initModel()

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) initModel()
})

watch(visible, (val) => emit('update:modelValue', val))

function handleClose() {
  visible.value = false
  emit('close')
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    emit('submit', { ...model })
  } catch {
    // 校验失败，不做处理
  }
}
</script>
