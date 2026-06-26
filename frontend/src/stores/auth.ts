import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, logout as apiLogout, fetchUser } from '@/data/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ id: number; name: string; email: string; role: 'admin' | 'client' } | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => user.value !== null)
  const role = computed(() => user.value?.role ?? null)
  const email = computed(() => user.value?.email ?? null)
  const name = computed(() => user.value?.name ?? null)

  async function login(email: string, password: string, role: 'admin' | 'client') {
    loading.value = true
    try {
      const res = await apiLogin(email, password, role)
      localStorage.setItem('auth_token', res.token)
      user.value = res.user
      return true
    } catch {
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await apiLogout()
    } catch {
      // ignore
    }
    localStorage.removeItem('auth_token')
    user.value = null
  }

  async function check() {
    const token = localStorage.getItem('auth_token')
    if (!token) return
    loading.value = true
    try {
      const u = await fetchUser()
      user.value = u
    } catch {
      localStorage.removeItem('auth_token')
      user.value = null
    } finally {
      loading.value = false
    }
  }

  return { user, isAuthenticated, role, email, name, loading, login, logout, check }
})
