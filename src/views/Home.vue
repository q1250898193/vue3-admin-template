<template>
  <el-row :grep="16">
    <el-col :span="8">
      <el-card>
        <h3>Vue3 + Vite</h3>
        <p>组合式 API、&lt;script setup&gt;</p>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <h3>Pinia + Vue Router</h3>
        <p>状态管理 + 路由懒加载 + 守卫</p>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <h3>Axios 封装</h3>
        <p>请求/响应拦截、token 注入、401 处理</p>
      </el-card>
    </el-col>
  </el-row>

  <el-card style="margin-top:16px;">
    <h3>已内置的工具</h3>
    <ul>
      <li>@/utils/storage.js — 本地存储封装（自动 JSON + 前缀）</li>
      <li>@/utils/validate.js — 手机号/邮箱/身份证校验</li>
      <li>@/utils/format.js — 日期/金额格式化</li>
      <li>@/api/request.js — axios 实例</li>
      <li>@/router/index.js — 路由守卫 + NProgress</li>
      <li>@/store/user.js — user store</li>
    </ul>
  </el-card>
</template>

<script setup>
// 首页占位
</script>
