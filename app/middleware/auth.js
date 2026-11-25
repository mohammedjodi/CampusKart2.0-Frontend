// middleware/auth.js
export default defineNuxtRouteMiddleware(async () => {

   // Dont send api request on server cause serve doesnt contain cookies or XSRF Token 
    if (import.meta.server) return
    
  const { fetchUser, isAuthenticated, initialized } = useAuth()

  if (!initialized.value) {
    await fetchUser()
  }

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})