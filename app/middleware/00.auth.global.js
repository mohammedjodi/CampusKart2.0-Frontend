// middleware/00.auth.global.js
export default defineNuxtRouteMiddleware(async () => {
    // Dont send api request on server cause serve doesnt contain cookies or XSRF Token 
    if (import.meta.server) return

  const { fetchUser, initialized } = useAuth()

  // Restore authentication if it hasn't been checked yet. 
  if (!initialized.value) {
    try {
      await fetchUser()
    } catch (e) {   
      // Don't block navigation on network error - page can still load as guest
      // Only 401 is handled inside fetchUser (sets user = null)
      // Other errors (500, network) just log
      console.warn('Auth restore failed', e)
    }
  }
})