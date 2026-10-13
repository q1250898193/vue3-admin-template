import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from '@/utils/storage'
import router from '@/router'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000
})

// 请求拦截器：自动带上 token
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器：统一处理后端返回格式和错误
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 约定后端返回 { code, data, message } 结构
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      // 401: token 失效，跳登录
      if (res.code === 401) {
        removeToken()
        router.push('/login')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res.data
  },
  (error) => {
    ElMessage.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)

// 封装常用方法
export const get = (url, params) => service.get(url, { params })
export const post = (url, data) => service.post(url, data)
export const put = (url, data) => service.put(url, data)
export const del = (url, params) => service.delete(url, { params })

export default service
