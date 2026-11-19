// Prevent access to auth pages when user is already logged in.. 
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  if (!authStore.user) await authStore.fetchUser()
  if (authStore.isAuthenticated) return navigateTo('/')
})