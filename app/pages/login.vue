<!-- pages/login.vue -->

<template>
  <div class="login-page">
    <div class="login-page__card">
      <h1 class="login-page__title">Welcome Back</h1>
      <p class="login-page__subtitle">Log in to continue</p>

      <FormsLoginForm
        :loading="loading"
        :server-error="serverError"
        :server-errors="serverErrors"
        @clear-server-error="onClearServerError"
        @submit="onLogin"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCkToast } from '~/composables/useCKToast'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'login' })

const { success } = useCkToast()
const { login, user } = useAuth()

const loading = ref(false)
const serverError = ref('')
const serverErrors = ref({})

function onClearServerError(field) {
  // 'login' in form = email OR username in Laravel
  // So clear all three so error disappears
  if (field === 'login') {
    delete serverErrors.value.email
    delete serverErrors.value.username
    delete serverErrors.value.login
  }
  if (field === 'password') {
    delete serverErrors.value.password
  }
}

async function onLogin(payload) {
  loading.value = true
  serverError.value = ''
  serverErrors.value = {}

  try {
    // Map single 'login' input to what Laravel expects
    const data = {
      login: payload.login,
      password: payload.password,
      remember: payload.remember,
    }
    // 
    await login(data)
    console.log(user.value)
    success('Welcome back!')
    await navigateTo('/')
  } catch (e) {

    if (e.response?.status === 422) {
      serverErrors.value = e.response.data.errors || {}
      // If Laravel sent no field errors, show general message on top
      if (!Object.keys(serverErrors.value).length) {
        serverError.value = e.response.data.message || 'Invalid credentials. Please try again.'
      }
      
    } else if (e.response?.status === 401) {
      serverError.value = e.response.data.message || 'Invalid credentials. Please try again.'
    } else {
      serverError.value = e.response?.data?.message || 'Login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100dvh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 16px;
  background: var(--ck-bg-soft);
}
.login-page__card {
  width: 100%;
  max-width: 480px;
  background: var(--ck-bg);
  padding: 24px 20px;
  border-radius: var(--ck-radius-sm);
}
.login-page__title {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin: 0;
}
.login-page__subtitle {
  font-family: var(--font-primary);
  font-size: 13px;
  color: var(--ck-text-muted);
  text-align: center;
  margin: 8px 0 16px;
}
</style>