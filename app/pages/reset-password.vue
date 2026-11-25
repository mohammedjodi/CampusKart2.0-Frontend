<!-- reset-password.vue -->
<template>
  <div class="reset">
    <div class="reset__card">
      <h1 class="reset__title">Reset Password</h1>
      <p class="reset__subtitle">Enter your new password below.</p>

      <CommonBaseAlert
        v-if="done"
        type="success"
        title="Password reset successful!"
        message="You can now login with your new password."
      >
        <NuxtLink to="/login" class="reset__back">Login Now</NuxtLink>
      </CommonBaseAlert>

      <CommonBaseAlert
        v-if="error"
        type="error"
        title="Reset failed"
        :message="error"
        :show="!!error"
        dismissible
        @dismiss="error = ''"
      />

      <form v-if="!done && hasToken" class="reset__form" @submit.prevent="onSubmit">
        <CommonBaseInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="you@school.edu"
          required
        >
          <template #leftIcon>
            <Mail :size="18" />
          </template>
        </CommonBaseInput>

        <CommonBaseInput
          v-model="form.password"
          label="New Password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          required
        >
          <template #leftIcon>
            <Lock :size="18" />
          </template>
          <template #rightIcon>
            <button type="button" class="reset__eye" @click="showPassword = !showPassword">
              <Eye v-if="!showPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </template>
        </CommonBaseInput>

        <CommonBaseInput
          v-model="form.password_confirmation"
          label="Confirm Password"
          :type="showConfirm ? 'text' : 'password'"
          placeholder="••••••••"
          required
        >
          <template #leftIcon>
            <Lock :size="18" />
          </template>
          <template #rightIcon>
            <button type="button" class="reset__eye" @click="showConfirm = !showConfirm">
              <Eye v-if="!showConfirm" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </template>
        </CommonBaseInput>

        <CommonBaseButton type="submit" variant="primary" size="lg" :loading="loading">
          Reset Password
        </CommonBaseButton>
      </form>

      <NuxtLink v-if="!done" to="/forgot-password" class="reset__back" style="text-align:center;">Request a new link</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})
useHead({ title:"Reset Password"})

const route = useRoute()
const { resetPassword } = useAuth()

const form = ref({
  token: route.query.token || '',
  email: route.query.email || '',
  password: '',
  password_confirmation: '',
})

const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const done = ref(false)
const error = ref('')

const hasToken = computed(() => !!form.value.token)

if (!hasToken.value) {
  error.value = 'Invalid or expired reset link. Please request a new one.'
}

async function onSubmit() {
  if (form.value.password !== form.value.password_confirmation) {
    error.value = 'Passwords do not match'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await resetPassword(form.value)
    done.value = true
  } catch (e) {
    error.value = e.response?.data?.errors?.email?.[0]
      || e.response?.data?.errors?.password?.[0]
      || e.response?.data?.message
      || 'Invalid or expired token.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reset { display: flex; justify-content: center; padding: 40px 16px; }
.reset__card { background: #fff; width: 100%; max-width: 420px; padding: 32px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 16px; }
.reset__title { font-size: 24px; font-weight: 800; margin: 0; }
.reset__subtitle { font-size: 14px; color: var(--ck-text-muted); margin: 0; }
.reset__form { display: flex; flex-direction: column; gap: 16px; }
.reset__eye { background: none; border: none; cursor: pointer; color: var(--ck-text-muted); display: flex; padding: 0; }
.reset__back { display: block; margin-top: 8px; color: var(--ck-green); font-weight: 700; }
</style>