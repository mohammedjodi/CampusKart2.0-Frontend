// middleware/auth.js
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (!authStore.user) await authStore.fetchUser()
  if (!authStore.isAuthenticated) return navigateTo('/login')
})