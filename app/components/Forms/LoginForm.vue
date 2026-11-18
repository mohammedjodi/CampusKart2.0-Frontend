<!-- components/forms/LoginForm.vue
    * UI-only login form.
    * Validates locally, emits { login, password, remember } on submit.
    * No API calls, no store calls, no $api.
    * Parent controls loading and serverError.
-->

<template>
  <form class="login-form" @submit.prevent="onSubmit" novalidate>
    <!-- Server error, e.g. Invalid credentials from Laravel -->
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
      :error="errors.login"
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
      :error="errors.password"
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
import { reactive } from 'vue'
import { Mail } from 'lucide-vue-next'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  serverError: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit'])

const form = reactive({
  login: '',
  password: '',
  remember: false,
})

const errors = reactive({
  login: '',
  password: '',
})

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