<!-- components/forms/LoginForm.vue -->

<template>
  <form class="login-form" @submit.prevent="onSubmit" novalidate>
    <CommonBaseAlert
      v-if="serverError"
      type="error"
      title="Login failed"
      :message="serverError"
    />

    <CommonBaseInput
      v-model="form.login"
      label="Email or Username"
      placeholder="you@university.edu or username"
      required
      :error="displayErrors.login"
      :disabled="loading"
      autocomplete="username"
      @blur="validateField('login')"
    >
      <template #leftIcon>
        <Mail :size="18" />
      </template>
    </CommonBaseInput>

    <CommonBasePasswordInput
      v-model="form.password"
      label="Password"
      placeholder="Enter your password"
      required
      :error="displayErrors.password"
      :disabled="loading"
      autocomplete="current-password"
      @blur="validateField('password')"
    />

    <div class="login-form__row">
      <CommonBaseCheckbox
        v-model="form.remember"
        label="Remember me"
        :disabled="loading"
      />
      <NuxtLink to="/forgot-password" class="login-form__link">
        Forgot password?
      </NuxtLink>
    </div>

    <CommonBaseButton
      type="submit"
      variant="primary"
      size="lg"
      :loading="loading"
      :disabled="loading"
    >
      Log In
    </CommonBaseButton>

    <p class="login-form__footer">
      Don't have an account?
      <NuxtLink to="/register" class="login-form__link login-form__link--bold">
        Create account
      </NuxtLink>
    </p>
  </form>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { Mail } from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth',
  layout:'auth'

})


const props = defineProps({
  loading: { type: Boolean, default: false },
  serverError: { type: String, default: '' },
  serverErrors: { type: Object, default: () => ({}) }, // <-- NEW: Laravel 422
})

const emit = defineEmits(['submit', 'clear-server-error'])

const form = reactive({
  login: '',
  password: '',
  remember: false,
})

// Vue internal validation
const errors = reactive({
  login: '',
  password: '',
})

// MERGED: Laravel wins, else Vue
// For login field, check BOTH email and username because backend can return either
const displayErrors = computed(() => {
  const loginServerMsg = props.serverErrors?.email?.[0] || props.serverErrors?.username?.[0] || props.serverErrors?.login?.[0]
  return {
    login: loginServerMsg || errors.login,
    password: props.serverErrors?.password?.[0] || errors.password,
  }
})

// Clear Laravel error when user types again
watch(form, (newForm, oldForm) => {
  if (newForm.login !== oldForm.login && (props.serverErrors?.email || props.serverErrors?.username || props.serverErrors?.login)) {
    emit('clear-server-error', 'login')
  }
  if (newForm.password !== oldForm.password && props.serverErrors?.password) {
    emit('clear-server-error', 'password')
  }
}, { deep: true })

function validateField(field) {
  if (field === 'login') {
    errors.login = form.login.trim() ? '' : 'Email or username is required.'
  }
  if (field === 'password') {
    errors.password = form.password ? '' : 'Password is required.'
  }
}

function validateAll() {
  validateField('login')
  validateField('password')
  return !errors.login && !errors.password
}

function onSubmit() {
  if (!validateAll()) return
  emit('submit', {
    login: form.login.trim(),
    password: form.password,
    remember: form.remember,
  })
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.login-form__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.login-form__link {
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 700;
  color: var(--ck-primary-dark);
  text-decoration: none;
  white-space: nowrap;
}
.login-form__link:hover {
  text-decoration: underline;
}
.login-form__footer {
  font-family: var(--font-primary);
  font-size: 13px;
  color: var(--ck-text-muted);
  text-align: center;
}
.login-form__link--bold {
  font-size: 13px;
}
</style>