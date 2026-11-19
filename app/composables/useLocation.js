// Get list of states and Universities from API
export const useLocation = () => {
    const { $api } = useNuxtApp()

    // Fetch all states
    const getStates = async () => {
        const response = await $api.get('api/states')

        return response.data?.data
    }

    // Fetch universities belonging to a state
    const getUniversities = async (stateId) => {
        const response = await $api.get(`api/states/${stateId}/universities`)

        return response.data?.data
    }

    return {
        getStates,
        getUniversities
    }
}