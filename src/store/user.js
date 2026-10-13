import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getToken, setToken, removeToken } from '@/utils/storage'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const userInfo = ref(null)

  function login(tk, info) {
    token.value = tk
    userInfo.value = info
    setToken(tk)
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    removeToken()
  }

  return { token, userInfo, login, logout }
})
