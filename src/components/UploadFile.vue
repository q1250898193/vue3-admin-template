<template>
  <el-upload
    :action="action"
    :headers="headers"
    :file-list="fileList"
    :limit="limit"
    :accept="accept"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :on-error="handleError"
  >
    <el-button type="primary" :icon="UploadFilled">{{ btnText }}</el-button>
    <template #tip>
      <div class="upload-tip">{{ tip }}</div>
    </template>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { getToken } from '@/utils/storage'

const props = defineProps({
  // 上传地址
  action: { type: String, default: '/api/upload' },
  // 文件大小限制（MB）
  maxSize: { type: Number, default: 5 },
  // 数量限制
  limit: { type: Number, default: 3 },
  // 接受的文件类型
  accept: { type: String, default: '' },
  btnText: { type: String, default: '点击上传' },
  tip: { type: String, default: '支持常见格式，单个文件不超过 5MB' }
})

const emit = defineEmits(['success', 'remove'])

const fileList = ref([])

const headers = {
  Authorization: `Bearer ${getToken() || ''}`
}

function beforeUpload(file) {
  if (file.size / 1024 / 1024 > props.maxSize) {
    ElMessage.error(`文件不能超过 ${props.maxSize}MB`)
    return false
  }
  return true
}

function handleSuccess(res, file) {
  ElMessage.success('上传成功')
  emit('success', res, file)
}

function handleRemove(file) {
  emit('remove', file)
}

function handleError() {
  ElMessage.error('上传失败，请重试')
}
</script>

<style scoped>
.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
</style>
