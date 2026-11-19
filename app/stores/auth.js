// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    setUser(user) {
      this.user = user
    },

    clearUser() {
      this.user = null
    },

    // stores/auth.js
    async fetchUser() {
        const { $api } = useNuxtApp()
        try {
            this.loading = true
            const res = await $api.get('/api/user')
            console.log('fetchUser RAW response:', res.data) // <-- add this
            this.user = res.data?.data || res.data
            return this.user
        } catch (e) {
            console.log('fetchUser FAILED:', e.response?.status, e.response?.data) // <-- add this
            this.user = null
            return null
        } finally {
            this.loading = false
        }
    },

    async logout() {
      const { logout } = useAuth()

      try {

          await logout()

      } catch (e) {
          console.warn('Logout failed, clearing locally', e)
      } finally {
          
          this.clearUser()
          await navigateTo('/login')
      }
    }
  },
})