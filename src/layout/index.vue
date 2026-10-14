<template>
  <el-container class="layout">
    <el-aside width="200px" class="aside">
      <div class="logo">Admin</div>
        <el-menu :default-active="$route.path" router>
          <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/components">
            <el-icon><Grid /></el-icon>
            <span>组件演示</span>
          </el-menu-item>
        </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div>{{ $route.meta.title }}</div>
        <el-dropdown @command="handleCommand">
          <span class="user">管理员</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

function handleCommand(cmd) {
  if (cmd === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
.layout { height: 100vh; }
.aside { background: #304156; .logo { color: #fff; text-align: center; line-height: 60px; font-size: 18px; font-weight: bold; } :deep(.el-menu) { border-right: none; background: #304156; } }
.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; }
.main { background: #f5f7fa; }
</style>
