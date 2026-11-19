<template>
  <div class="forgot">
    <div class="forgot__card">
      <h1 class="forgot__title">Forgot Password?</h1>
      <p class="forgot__subtitle">Enter your email and we'll send you a reset link.</p>

      <!-- Using BaseAlert for both states -->
      <CommonBaseAlert
        v-if="sent"
        type="success"
        title="Check your email!"
        :message="`We sent a reset link to ${email}`"
      >
        <NuxtLink to="/login" class="forgot__back">Back to Login</NuxtLink>
      </CommonBaseAlert>

      <CommonBaseAlert
        v-if="error"
        type="error"
        title="Something went wrong"
        :message="error"
        :show="!!error"
        dismissible
        @dismiss="error = ''"
      />

      <form v-if="!sent" class="forgot__form" @submit.prevent="onSubmit">
        <CommonBaseInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="you@school.edu"
          required
        >
          <template #leftIcon>
            <Mail :size="18" />
          </template>
        </CommonBaseInput>

        <CommonBaseButton type="submit" variant="primary" size="lg" :loading="loading">
          Send Reset Link
        </CommonBaseButton>
      </form>

      <NuxtLink to="/login" class="forgot__link">← Back to Login</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { Mail } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { forgotPassword } = useAuth()

const email = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

async function onSubmit() {
  loading.value = true
  error.value = ''
  try {
    await forgotPassword(email.value)
    sent.value = true
  } catch (e) {
    error.value = e.response?.data?.message || 'Something went wrong. Try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.forgot { display: flex; justify-content: center; padding: 40px 16px; }
.forgot__card { background: #fff; width: 100%; max-width: 420px; padding: 32px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 16px; }
.forgot__title { font-size: 24px; font-weight: 800; margin: 0; }
.forgot__subtitle { font-size: 14px; color: var(--ck-text-muted); margin: 0; }
.forgot__form { display: flex; flex-direction: column; gap: 16px; }
.forgot__back { display: block; margin-top: 8px; color: var(--ck-green); font-weight: 700; }
.forgot__link { display: block; text-align: center; font-size: 13px; color: var(--ck-text-light); text-decoration: none; }
</style>