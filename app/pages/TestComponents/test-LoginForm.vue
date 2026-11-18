<template>
  <div style="max-width: 420px; margin: 40px auto; padding: 0 16px;">
    <FormsLoginForm :loading="loading" :server-error="serverError" @submit="onLogin" />
    <pre style="margin-top: 20px; font-size: 12px;">{{ lastPayload }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(false)
const serverError = ref('')
const lastPayload = ref(null)

function onLogin(payload) {
  lastPayload.value = payload
  console.log('LoginForm emitted:', payload)
  loading.value = true
  setTimeout(() => {
    loading.value = false
    serverError.value = 'Invalid credentials. Please try again.'
  }, 1000)
}
</script>