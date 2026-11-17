<!-- pages/test-input.vue -->

<template>
  <div class="container" style="max-width: 400px; padding: 40px 0; display: flex; flex-direction: column; gap: 20px;">
    <h2>Test BaseInput - Full Functionality</h2>

    <!-- 1. SIMPLE v-model (this is emit in disguise) -->
    <CommonBaseInput
      v-model="email"
      label="Email"
      type="email"
      placeholder="you@school.edu"
      :error="emailError"
      hint="We will never share your email"
      required
    />

    <!-- 2. WITH LEFT + RIGHT ICONS -->
    <CommonBaseInput
      v-model="password"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Enter password"
      :error="passwordError"
    >
      <template #leftIcon>🔒</template>
      <template #rightIcon>
        <button type="button" @click="showPassword = !showPassword" style="background: none; border: none; cursor: pointer;">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </template>
    </CommonBaseInput>

    <!-- 3. MANUAL EMIT - without v-model, to see what's happening -->
    <CommonBaseInput
      :modelValue="search"
      label="Search (manual emit)"
      placeholder="Type to search..."
      @update:modelValue="onSearchChange"
      @focus="onFocus"
      @blur="onBlur"
    />

    <CommonBaseButton variant="primary" :loading="isSaving" @click="handleSave">
      Save
    </CommonBaseButton>

    <div style="background: var(--ck-bg-soft); padding: 16px; border-radius: 12px; font-size: 13px;">
      <p><b>Email:</b> {{ email }}</p>
      <p><b>Password:</b> {{ password }}</p>
      <p><b>Search:</b> {{ search }}</p>
      <p><b>Focused?</b> {{ isFocused ? 'Yes - inside input' : 'No' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import BaseInput from '~/components/common/BaseInput.vue'
// import BaseButton from '~/components/common/BaseButton.vue'

const email = ref('')
const password = ref('')
const search = ref('')
const showPassword = ref(false)
const isSaving = ref(false)
const isFocused = ref(false)

const emailError = ref('')
const passwordError = ref('')

// --- MANUAL EMIT HANDLERS ---
// This is EXACTLY what v-model does automatically
function onSearchChange(newValue) {
  console.log('emit received:', newValue)
  search.value = newValue // we update it ourselves
}

function onFocus() {
  console.log('emit: focus')
  isFocused.value = true
}

function onBlur() {
  console.log('emit: blur')
  isFocused.value = false
  // Validate on blur - like real forms do
  validate()
}

function validate() {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value.includes('@')) {
    emailError.value = 'Please enter a valid email'
  }
  if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
  }
}

function handleSave() {
  validate()
  if (emailError.value || passwordError.value) return

  isSaving.value = true
  setTimeout(() => {
    alert(`Saved! Email: ${email.value}`)
    isSaving.value = false
  }, 1000)
}
</script>