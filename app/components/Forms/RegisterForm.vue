<template>
  <form class="register-form" @submit.prevent="onFinalSubmit" novalidate>
    <h1 class="register-form__title">Registration</h1>

    <div class="register-form__steps">
      <div
        v-for="(step, i) in steps"
        :key="step.short"
        :class="['register-form__step', { 'register-form__step--active': i + 1 === currentStep, 'register-form__step--done': i + 1 < currentStep }]"
      >
        <span class="register-form__dot">{{ i + 1 < currentStep ? '✓' : i + 1 }}</span>
        <span class="register-form__step-label">{{ step.short }}</span>
        <span v-if="i < steps.length - 1" class="register-form__line" />
      </div>
    </div>

    <h2 class="register-form__section">{{ steps[currentStep - 1].title }}</h2>

    <CommonBaseAlert v-if="serverError" type="error" title="Registration failed" :message="serverError" />

    <!-- STEP 1: Personal -->
    <div v-if="currentStep === 1" class="register-form__fields">
      <CommonBaseInput v-model="form.first_name" label="First Name" placeholder="John" required :error="displayErrors.first_name" :disabled="loading" autocomplete="given-name" @blur="validateStep1" />
      <CommonBaseInput v-model="form.last_name" label="Last Name" placeholder="Doe" required :error="displayErrors.last_name" :disabled="loading" autocomplete="family-name" @blur="validateStep1" />
      <CommonBaseInput v-model="form.phone" label="Phone Number" placeholder="0803 123 4567" type="tel" required :error="displayErrors.phone" :disabled="loading" autocomplete="tel" @blur="validateStep1" />
      <CommonImageUploader v-model="form.avatar" label="Avatar (optional)" placeholder="Click to upload profile image" hint="JPG, JPEG or PNG, max 2MB" :error="displayErrors.avatar" />
    </div>

    <!-- STEP 2: Campus -->
    <div v-if="currentStep === 2" class="register-form__fields">
      <CommonBaseSelect v-model="form.state_id" label="State" placeholder="Select your state" required :options="stateOptions" :error="displayErrors.state_id" :disabled="loading" @update:modelValue="onStateChange" />
      <CommonBaseSelect v-model="form.university_id" label="University" :placeholder="universityPlaceholder" required :options="universityOptions" :error="displayErrors.university_id" :disabled="loading || !form.state_id || loadingUniversities" :hint="loadingUniversities ? 'Loading universities...' : ''" />
      <CommonBaseTextarea v-model="form.bio" label="Bio" placeholder="Tell others a little about yourself..." :error="displayErrors.bio" :disabled="loading" :rows="3" :maxlength="500" hint="Optional" />
    </div>

    <!-- STEP 3: Account -->
    <div v-if="currentStep === 3" class="register-form__fields">
      <CommonBaseInput v-model="form.email" label="Email Address" placeholder="you@university.edu" type="email" required :error="displayErrors.email" :disabled="loading" autocomplete="email" @blur="validateStep3" />
      <CommonBaseInput v-model="form.username" label="Username" placeholder="user@12" required :error="displayErrors.username" :disabled="loading" autocomplete="username" @blur="validateStep3" />
      <CommonBasePasswordInput v-model="form.password" label="Password" placeholder="Create a strong password" required :error="displayErrors.password" :disabled="loading" autocomplete="new-password" hint="8+ chars, uppercase, lowercase, number, special char" @blur="validateStep3" />
      <CommonBasePasswordInput v-model="form.password_confirmation" label="Confirm Password" placeholder="Repeat password" required :error="displayErrors.password_confirmation" :disabled="loading" autocomplete="new-password" @blur="validateStep3" :SeePass="false" />
    </div>

    <div class="register-form__nav">
      <button v-if="currentStep > 1" type="button" class="register-form__back" :disabled="loading" @click="goBack">← Back</button>
      <CommonBaseButton v-if="currentStep < 3" type="button" variant="primary" size="md" class="register-form__next" :disabled="loading" @click="goNext">Next →</CommonBaseButton>
      <CommonBaseButton v-else type="submit" variant="primary" size="md" class="register-form__next" :loading="loading" :disabled="loading">Create Account</CommonBaseButton>
    </div>

    <p class="register-form__footer">
      Already have an account?
      <NuxtLink to="/login" class="register-form__link">Login</NuxtLink>
    </p>
  </form>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  serverError: { type: String, default: '' },
  serverErrors: { type: Object, default: () => ({}) }, // <-- NEW: Laravel 422 errors
  states: { type: Array, default: () => [] },
  universities: { type: Array, default: () => [] },
  loadingUniversities: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'state-change', 'clear-server-error'])

const currentStep = ref(1)
const steps = [
  { short: 'Personal Info', title: 'Personal Information' },
  { short: 'Campus Info', title: 'Campus Information' },
  { short: 'Account Info', title: 'Account Information' },
]

const form = reactive({
  first_name: '', last_name: '', phone: '', avatar: null,
  state_id: '', university_id: '', email: '', username: '', bio: '',
  password: '', password_confirmation: '',
})

// Internal Vue validation errors (your existing logic)
const errors = reactive({
  first_name: '', last_name: '', phone: '', avatar: '',
  state_id: '', university_id: '', bio: '',
  email: '', username: '', password: '', password_confirmation: '',
})

// Which step does each field belong to?
const fieldToStep = {
  first_name: 1, last_name: 1, phone: 1, avatar: 1,
  state_id: 2, university_id: 2, bio: 2,
  email: 3, username: 3, password: 3, password_confirmation: 3,
}

// Laravel error wins, else Vue internal error
const displayErrors = computed(() => {
  const out = {}
  for (const key in errors) {
    const serverMsg = props.serverErrors?.[key]?.[0]
    out[key] = serverMsg || errors[key]
  }
  return out
})

// Auto-jump to first step with Laravel error 
watch(() => props.serverErrors, (newErrors) => {
  if (!newErrors || !Object.keys(newErrors).length) return
  const firstField = Object.keys(newErrors)[0]
  const step = fieldToStep[firstField]
  if (step) currentStep.value = step
}, { deep: true })

// Clear Laravel error when user types again in that field
watch(form, (newForm, oldForm) => {
  for (const key in newForm) {
    if (newForm[key] !== oldForm[key] && props.serverErrors?.[key]) {
      emit('clear-server-error', key)
    }
  }
}, { deep: true })

const stateOptions = computed(() => props.states.map(s => ({ value: s.id, label: s.name })))
const universityOptions = computed(() => props.universities.map(u => ({ value: u.id, label: u.name })))
const universityPlaceholder = computed(() => {
  if (!form.state_id) return 'Select a state first'
  if (props.loadingUniversities) return 'Loading universities...'
  if (!props.universities.length) return 'No universities found'
  return 'Select your university'
})

function onStateChange(value) {
  form.state_id = value
  form.university_id = ''
  errors.university_id = ''
  if (value) emit('state-change', value)
}

function validateStep1() {
  errors.first_name = form.first_name.trim().length >= 3 ? '' : 'First name must be at least 3 characters.'
  errors.last_name = form.last_name.trim().length >= 3 ? '' : 'Last name must be at least 3 characters.'
  const cleaned = form.phone.replace(/[\s+-]/g, '')
  errors.phone = /^(\+?234|0)?[789]\d{9}$/.test(cleaned) ? '' : 'Enter a valid phone number.'
  return !errors.first_name && !errors.last_name && !errors.phone
}

function validateStep2() {
  errors.state_id = form.state_id ? '' : 'Please select your state.'
  errors.university_id = form.university_id ? '' : 'Please select your university.'
  errors.bio = form.bio.length <= 500 ? '' : 'Bio must be 500 characters or less.'
  return !errors.state_id && !errors.university_id && !errors.bio
}

function validateStep3() {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.email = emailRe.test(form.email.trim()) ? '' : 'Enter a valid email address.'
  errors.username = form.username ? '' : 'Username is Required'
  const pw = form.password
  const hasUpper = /[A-Z]/.test(pw)
  const hasLower = /[a-z]/.test(pw)
  const hasNumber = /\d/.test(pw)
  const hasSpecial = /[^A-Za-z0-9]/.test(pw)
  errors.password = pw.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial
    ? '' : 'Password must be 8+ chars with uppercase, lowercase, number and special character.'
  errors.password_confirmation = form.password_confirmation === pw && pw ? '' : 'Passwords do not match.'
  return !errors.email && !errors.password && !errors.password_confirmation
}

function goNext() {
  const valid = currentStep.value === 1 ? validateStep1() : validateStep2()
  if (valid) currentStep.value++
}

function goBack() {
  if (currentStep.value > 1) currentStep.value--
}

function onFinalSubmit() {
  if (!validateStep3()) return
  emit('submit', {
    first_name: form.first_name.trim(),
    last_name: form.last_name.trim(),
    phone: form.phone.trim(),
    avatar: form.avatar,
    university_id: form.university_id,
    email: form.email.trim(),
    username: form.username.trim(),
    bio: form.bio.trim(),
    password: form.password,
    password_confirmation: form.password_confirmation,
  })
}
</script>
<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  background: var(--ck-bg);
  padding: 24px 20px;
  border-radius: var(--ck-radius-sm);
}

/* Title - centered like screenshot */
.register-form__title {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 700;
  color: var(--ck-text);
  text-align: center;
  margin: 0;
}

/* Steps - dots on a line */
.register-form__steps {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  padding: 4px 8px 0;
}

.register-form__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  position: relative;
  font-family: var(--font-primary);
}

.register-form__dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #d9d9d9;
  color: #fff;
  /* font-size: 10px; */
  font-weight: 700;
  z-index: 2;
  position: relative;
}

.register-form__dot {
  width:30px;
  height: 30px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
}

.register-form__step--active .register-form__dot,
.register-form__step--done .register-form__dot {
  background: var(--ck-primary-dark);
  box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.15);
}

.register-form__step-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--ck-text-muted);
  text-align: center;
  line-height: 1.2;
}

.register-form__step--active .register-form__step-label {
  color: var(--ck-text);
}

.register-form__line {
  position: absolute;
  top: 12px;
  left: calc(50% + 10px);
  width: calc(100% - 20px);
  height: 2px;
  background: #e5e5e5;
  z-index: 1;
}

.register-form__step--done .register-form__line {
  background: var(--ck-primary-dark);
}

/* Section title - left aligned like screenshot */
.register-form__section {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 700;
  color: var(--ck-text);
  margin: 8px auto 0;
}

.register-form__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Navigation - one full-width pill button like screenshot */
.register-form__nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.register-form__back {
  background: var(--ck-bg-soft);
  border: 1px solid var(--ck-border);
  border-radius: 999px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 700;
  color: var(--ck-text);
  padding: 0 20px;
  height: 44px;
  flex-shrink: 0;
}

.register-form__back:hover {
  background: var(--ck-bg-soft);
  opacity: 0.85;
}


/* Override BaseButton to pill + orange gradient for this form only */
.register-form__next {
  width: 100%;
  border-radius: 999px !important;
  /* background:  !important; */
  font-size: 14px;
  letter-spacing: 0.2px;
}

.register-form__footer {
  font-family: var(--font-primary);
  font-size: 12px;
  color: var(--ck-text-muted);
  text-align: center;
  margin: 0;
}

.register-form__link {
  font-weight: 700;
  color: var(--ck-primary-dark);
  text-decoration: none;
}

.register-form__link:hover {
  text-decoration: underline;
}
</style>