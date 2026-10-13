# Vue3 Admin Template

> 一个开箱即用的 Vue3 中后台项目模板，适合快速启动业务系统。

## 技术栈

- **Vue 3** + `<script setup>` 组合式 API
- **Vite 5** 构建
- **Vue Router 4**（含路由懒加载、全局守卫、NProgress 进度条）
- **Pinia** 状态管理
- **Element Plus** 按需自动引入
- **Axios** 二次封装（请求/响应拦截、token 注入、401 处理）
- **Sass** CSS 预处理器

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发
npm run dev

# 打包
npm run build
```

默认端口 5173，账号 admin / 123456（模板里写死的假登录，实际接后端）。

## 目录结构

```
src/
├── api/
│   └── request.js        # axios 实例 + 拦截器封装
├── router/
│   └── index.js          # 路由配置 + 全局守卫
├── store/
│   └── user.js           # user 状态（pinia）
├── utils/
│   ├── storage.js        # 本地存储（自动 JSON + 前缀）
│   ├── validate.js       # 手机号/邮箱/身份证校验
│   └── format.js         # 日期/金额格式化
├── layout/
│   └── index.vue         # 基础布局（侧边栏 + 头部）
├── views/
│   ├── Login.vue
│   └── Home.vue
├── App.vue
└── main.js
```

## 已封装的能力

### 1. 请求封装（`@/api/request.js`）

- 请求拦截器自动注入 `Authorization: Bearer <token>`
- 响应拦截器统一处理 `{ code, data, message }` 结构
- 401 自动清 token 跳登录
- 导出 `get / post / put / del` 四个快捷方法

### 2. 路由守卫（`@/router/index.js`）

- `requiresAuth: true` 的路由没登录会自动跳 `/login`
- 切换页面自动显示顶部进度条（NProgress）
- 自动设置 `document.title`

### 3. 本地存储（`@/utils/storage.js`）

- 所有 key 自动加 `V3_ADMIN_` 前缀，避免污染
- 自动 JSON 序列化/反序列化
- 提供 `getToken / setToken / removeToken` 快捷方法

### 4. 打包优化（`vite.config.js`）

- Element Plus 按需自动引入
- vue 全家桶和 element 单独分包，避免单个 chunk 过大

## 面试可以怎么讲

> "我自己维护了一个 Vue3 中后台模板，封装了路由守卫、axios 拦截器、本地存储、常用校验和格式化工具，新业务项目直接复制这个模板开始写业务代码，不用每次重复搭脚手架。模板用 Vite 构建，Element Plus 按需引入，vue 和 element 分包加载。"
