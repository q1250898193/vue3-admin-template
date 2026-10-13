import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/storage'

// 静态路由：不需要权限的页面
const staticRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Login.vue'), // 占位，可换成 404 页面
    meta: { title: '404', requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes
})

// 全局前置守卫：登录校验 + 进度条
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title ? `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}` : import.meta.env.VITE_APP_TITLE

  const token = getToken()
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
