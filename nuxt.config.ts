// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  modules: ['@pinia/nuxt', '@nuxt/eslint' , 'vue-sonner/nuxt'],

  css: ['~/assets/css/main.css'],

  // Connect to the backend API using runtime config
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8001',
    },
  }, 

  vite: {
    plugins: [tailwindcss()],
  },

})
