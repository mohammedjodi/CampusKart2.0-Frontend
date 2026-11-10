export const useAuth = () => {
    const { $api } = useNuxtApp()

    const getCsrfCookie = async () => {
        await $api.get('/sanctum/csrf-cookie')
    }

    return {
        getCsrfCookie,
    }
}