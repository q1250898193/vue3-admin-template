// 本地存储封装：统一加前缀、自动 JSON 序列化
const PREFIX = 'V3_ADMIN_'

export function setItem(key, value) {
  const data = JSON.stringify(value)
  localStorage.setItem(PREFIX + key, data)
}

export function getItem(key) {
  const value = localStorage.getItem(PREFIX + key)
  try {
    return value ? JSON.parse(value) : null
  } catch {
    return value
  }
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key)
}

// token 快捷方法
export const getToken = () => getItem('token')
export const setToken = (t) => setItem('token', t)
export const removeToken = () => removeItem('token')
