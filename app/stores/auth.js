// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // Global state for authUser 
  state: () => ({
    user: null,
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    
    setUser(user) {
      this.user = user
      this.initialized = true
    },

    clearUser() {
      this.user = null
      this.initialized = true
    },

    setLoading(value) {
      this.loading = value
    },

    setInitialized(value) {
      this.initialized = value
    },
  },
})