// composables/useAuth.js
let pendingUserFetch = null

export const useAuth = () => {
  // Global state 
  const authStore = useAuthStore()
  // Axios instance
  const { $api } = useNuxtApp()

  const user = computed(() => authStore.user)
  const loading = computed(() => authStore.loading)
  const initialized = computed(() => authStore.initialized)
  const isAuthenticated = computed(() => authStore.isAuthenticated)

  // Laravel Coookie 
  const getCsrfCookie = async () => {
    await $api.get('/sanctum/csrf-cookie')
  }

  // Fetch user 
  const fetchUser = async ({ force = false } = {}) => {
    //Prevent unnecessary requests after initialization... 
    if (authStore.initialized && !force) return authStore.user
    // Prevent  duplicate  API requests while a request is in progress and instead return the same response to all request sent at the exact same time 
    if (pendingUserFetch) return pendingUserFetch

    // Execute the async function and immediatly assign its promise using () to  pendingUserFetch
    pendingUserFetch = (async () => {
      // Forward  the browser cookies for ssr requests and {} for csr the browser handles that
      const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : {}

      try {

        authStore.setLoading(true)
        const response = await $api.get('/api/user', { headers })
        const userData = response?.data?.data ?? response?.data ?? null
        authStore.setUser(userData)
        // setUser  also sets  initialized=true 
        authStore.setInitialized(true)

        return userData

      } catch (e) {
        // if user is not logged in clear user AND set initialization
        if (e?.response?.status === 401 || e?.response?.status === 419) {
          authStore.clearUser()
          authStore.setInitialized(true)
          return null
        }
        // For other errors, still mark initialized so we don't loop forever
        authStore.setInitialized(true)

        throw e
      } finally {
        
        authStore.setLoading(false)
        pendingUserFetch = null
      }

    })()

    return pendingUserFetch
  }

  const register = async (formData) => {
    try {

      authStore.setLoading(true)
      await getCsrfCookie()

      const response = await $api.post('/register', formData)

      // Clear pending so we don't get stale null
      pendingUserFetch = null
      authStore.setInitialized(false)
      await fetchUser({ force: true })
      return response

    } finally {
      authStore.setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {

      authStore.setLoading(true)
      await getCsrfCookie()
      const response = await $api.post('/login', credentials)

      //  Clear pending so we don't get stale null
      pendingUserFetch = null
      authStore.setInitialized(false)
      await fetchUser({ force: true })
      return response

    } finally {
      authStore.setLoading(false)
    }
  }

  const forgotPassword = async (email) => {
    await getCsrfCookie()
    return await $api.post('/forgot-password', { email })
  }

  const resetPassword = async (data) => {
    await getCsrfCookie()
    return await $api.post('/reset-password', data)
  }

  const logout = async () => {
    try {

      await getCsrfCookie()
      await $api.post('/logout')

    } catch (e) {
      console.warn('Logout failed, clearing locally', e)
    } finally {

      pendingUserFetch = null
      authStore.clearUser()
      authStore.setInitialized(true) // Don't refetch immediately after logout
      await navigateTo('/login')
    }
  }

  return {

    user, 
    loading, 
    initialized,
    isAuthenticated,
    setUser: (u) => authStore.setUser(u),
    clearUser: () => authStore.clearUser(),
    getCsrfCookie,
    fetchUser, 
    register,
    login,
    forgotPassword, 
    resetPassword, 
    logout,

  }
}