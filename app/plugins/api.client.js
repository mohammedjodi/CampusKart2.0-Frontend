// 
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    headers: {
        Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
  })

  return {
    provide: {
      api,
    },
  }
})