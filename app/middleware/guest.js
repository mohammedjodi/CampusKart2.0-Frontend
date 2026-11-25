// middleware/guest.js
export default defineNuxtRouteMiddleware(async (to) => {

     // Dont send api request on server cause serve doesnt contain cookies or XSRF Token 
    if (import.meta.server) return
    
  const { fetchUser, isAuthenticated, initialized } = useAuth()

  if (!initialized.value) {
    await fetchUser()
  }

  // If we are here and still authenticated, we should NOT see /login
  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})