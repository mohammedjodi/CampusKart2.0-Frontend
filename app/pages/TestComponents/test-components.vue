<!-- pages/test-components.vue
    * Temporary playground to test the 4 new common components.
    * Delete this file after testing.
-->

<template>
  <div class="test-page">
    <h1>Component Test Playground</h1>
    <p class="test-page__note">Test each component, check console for ImageUploader output.</p>

    <!-- ============ 1. BasePasswordInput ============ -->
    <section class="test-card">
      <h2>1. BasePasswordInput</h2>

      <CommonBasePasswordInput
        v-model="password"
        name="password"
        label="Password"
        placeholder="Enter password"
        required
        :error="passwordError"
      >
            <template #leftIcon>
                <Lock :size="18" />
            </template>
        </CommonBasePasswordInput>

      <CommonBasePasswordInput
        v-model="password2"
        label="Password (with hint)"
        placeholder="With hint"
        hint="Must be at least 8 characters"
      />

      <CommonBasePasswordInput
        v-model="password3"
        label="Password (disabled)"
        placeholder="Disabled state"
        disabled
      />

      <p><strong>Value:</strong> {{ password }}</p>
      <p>Check: Eye icon toggles text/password, error shows red border.</p>
      <CommonBaseButton @click="passwordError = passwordError ? '' : 'Password is required'">Toggle Password Error</CommonBaseButton>
    </section>

    <!-- ============ 2. BaseCheckbox ============ -->
    <section class="test-card">
      <h2>2. BaseCheckbox</h2>

      <CommonBaseCheckbox v-model="rememberMe" label="Remember me" />
      <CommonBaseCheckbox v-model="agreeTerms" error="You must accept the terms to continue">
        I agree to the <strong>Terms and Conditions</strong>
      </CommonBaseCheckbox>
      <CommonBaseCheckbox v-model="disabledCheck" label="Disabled checkbox" disabled />

      <p><strong>Remember me:</strong> {{ rememberMe }}</p>
      <p><strong>Agree:</strong> {{ agreeTerms }}</p>
      <p>Check: Clicking label toggles, checkmark appears, error shows.</p>
    </section>

    <!-- ============ 3. BaseAlert ============ -->
    <section class="test-card">
      <h2>3. BaseAlert</h2>

      <CommonBaseAlert type="success" title="Success" message="Account created successfully." />
      <CommonBaseAlert type="error" title="Login failed" message="Invalid credentials. Please try again." />
      <CommonBaseAlert type="warning" title="Warning" message="Your session will expire soon." />
      <CommonBaseAlert type="info" title="Info" message="Check your email for a verification link." />

      <CommonBaseAlert type="error" title="Dismissible" message="Click X to dismiss me." dismissible  />

      <div class="test-row">
        <CommonBaseButton @click="showAlert = !showAlert">Toggle Alert</CommonBaseButton>
      </div>
      <CommonBaseAlert v-if="showAlert" type="info" message="This alert is controlled by v-if / show prop." />
      <p>Check: All 4 colors render, icons show, dismiss button hides alert.</p>
    </section>

    <!-- ============ 4. ImageUploader ============ -->
    <section class="test-card">
      <h2>4. ImageUploader</h2>

      <CommonImageUploader
        v-model="avatarFile"
        label="Profile image"
        placeholder="Click to upload profile image"
        hint="JPG, PNG or WEBP, max 2MB"
        :error="avatarError"
        @error="onAvatarError"
      />

      <p><strong>File selected:</strong> {{ avatarFile ? avatarFile.name : 'None' }}</p>
      <p><strong>File size:</strong> {{ avatarFile ? (avatarFile.size / 1024).toFixed(1) + ' KB' : '-' }}</p>
      <p><strong>File type:</strong> {{ avatarFile ? avatarFile.type : '-' }}</p>

      <div class="test-row">
        <CommonBaseButton @click="logFile">Log File to Console</CommonBaseButton>
        <CommonBaseButton variant="secondary" @click="clearAvatar">Clear File</CommonBaseButton>
      </div>

      <p>Check: 1. Click empty box opens file picker. 2. Image preview shows as circle. 3. Change / Remove work. 4. Try a .pdf or a file over 2MB, error should show.</p>
    </section>

    <!-- ============ 5. Combined - Mini Login Check ============ -->
    <section class="test-card">
      <h2>5. Combined Check (like LoginForm will use)</h2>
      <CommonBaseAlert v-if="loginError" type="error" :message="loginError"   dismissible/>
      <CommonBaseInput v-model="testEmail" label="Email" placeholder="you@university.edu" />
      <CommonBasePasswordInput v-model="testPassword" label="Password" placeholder="Password" />
      <CommonBaseCheckbox v-model="testRemember" label="Remember me" />
      <CommonBaseButton variant="primary" size="lg" :loading="testLoading" @click="fakeLogin">Fake Login</CommonBaseButton>
      <p>Check: Button shows spinner when loading, alert shows on fake login.</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Lock } from 'lucide-vue-next'

const password = ref('')
const password2 = ref('')
const password3 = ref('')
const passwordError = ref('')

const rememberMe = ref(false)
const agreeTerms = ref(false)
const disabledCheck = ref(true)

const showAlert = ref(true)

const avatarFile = ref(null)
const avatarError = ref('')

function onAvatarError(msg) {
  avatarError.value = msg
  console.log('[ImageUploader error]', msg)
}

function logFile() {
  console.log('Avatar File object:', avatarFile.value)
  if (avatarFile.value) {
    console.log('Is File?', avatarFile.value instanceof File)
    console.log('Name:', avatarFile.value.name)
  } else {
    console.log('No file selected yet')
  }
}

function clearAvatar() {
  avatarFile.value = null
  avatarError.value = ''
}

const testEmail = ref('')
const testPassword = ref('')
const testRemember = ref(false)
const testLoading = ref(false)
const loginError = ref('')

function fakeLogin() {
  testLoading.value = true
  loginError.value = ''
  setTimeout(() => {
    testLoading.value = false
    loginError.value = 'Invalid credentials. Please try again.'
  }, 1000)
}
</script>

<style scoped>
.test-page {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 16px 60px;
  font-family: var(--font-primary);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.test-page h1 {
  font-size: 24px;
  color: var(--ck-text);
}

.test-page__note {
  font-size: 13px;
  color: var(--ck-text-muted);
}

.test-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--ck-border);
  border-radius: var(--ck-radius-sm);
  background: var(--ck-bg);
}

.test-card h2 {
  font-size: 16px;
  color: var(--ck-text);
  margin: 0;
}

.test-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>