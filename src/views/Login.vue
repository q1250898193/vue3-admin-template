<template>
  <div class="login-wrap">
    <el-card class="login-card">
      <h2 style="text-align:center;margin-bottom:20px;">登录</h2>
      <el-form :model="form" @submit.prevent>
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-button type="primary" style="width:100%;" @click="handleLogin">登 录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
const form = reactive({ username: 'admin', password: '123456' })

function handleLogin() {
  // 实际项目这里调登录接口，模板里直接给个假 token
  userStore.login('fake-token-123', { name: form.username })
  ElMessage.success('登录成功')
  router.push('/home')
}
</script>

<style scoped>
.login-wrap { height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f2f5; }
.login-card { width: 360px; }
</style>
