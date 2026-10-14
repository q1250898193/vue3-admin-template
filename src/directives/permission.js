// v-permission 指令：根据按钮权限控制元素显隐
// 用法：<el-button v-permission="'user:add'">新增</el-button>
// 实际项目里从 userStore 拿当前用户权限列表

import { useUserStore } from '@/store/user'

// 模拟当前用户权限（实际从后端获取）
const mockPermissions = ['user:list', 'user:add', 'user:edit', 'order:list']

export const permission = {
  mounted(el, binding) {
    const userStore = useUserStore()
    const required = binding.value
    const permissions = userStore.permissions?.length
      ? userStore.permissions
      : mockPermissions

    if (!permissions.includes(required)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

export default {
  install(app) {
    app.directive('permission', permission)
  }
}
