export const useAuth = () => {
    const { $api } = useNuxtApp()

    // Get Sanctum CSRF cookie
    const getCsrfCookie = async () => {
        await $api.get('/sanctum/csrf-cookie')
    }

    // Register a new user
    const register = async (formData) => {
        await getCsrfCookie()
        return await $api.post('/register', formData)
    }

    // Login an existing user
    const login = async (credentials) => {
        await getCsrfCookie()
        return await $api.post('/login', credentials)
    }

    // Forgot Password - send reset link
    const forgotPassword = async (email) => {
    await getCsrfCookie()
    return await $api.post('/forgot-password', { email })
    }

    // Reset Password - with token from email
    const resetPassword = async (data) => {
    await getCsrfCookie()
    return await $api.post('/reset-password', data)
    }

    // Logout
    const logout = async () => {
        return await $api.post('/logout')
    }

    return {
        getCsrfCookie,
        register,
        login,
        forgotPassword,
        resetPassword,
        logout
    }
}