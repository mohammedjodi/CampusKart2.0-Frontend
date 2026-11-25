<template>
  <div class="register-page">
    <div class="register-page__card">
      <FormsRegisterForm
        :states="states"
        :universities="universities"
        :loading-universities="loadingUniversities"
        :loading="loading"
        :server-error="serverError"
        :server-errors="serverErrors"
        @state-change="onStateChange"
        @clear-server-error="onClearServerError"
        @submit="onRegister"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCkToast } from '~/composables/useCKToast'

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'register' })

const { getStates, getUniversities } = useLocation()
const { success } = useCkToast()
const { register } = useAuth()

const states = ref([])
const universities = ref([])
const loadingUniversities = ref(false)
const loading = ref(false)
const serverError = ref('') // general message for top alert
const serverErrors = ref({}) // field errors from Fortify: { email: ["..."] }

onMounted(async () => {
  try {
    states.value = (await getStates()) || []
  } catch (e) {
    serverError.value = 'Could not load states. Please refresh the page.'
  }
})

async function onStateChange(stateId) {
  universities.value = []
  serverError.value = ''
  if (!stateId) return
  loadingUniversities.value = true
  try {
    universities.value = (await getUniversities(stateId)) || []
  } catch (e) {
    serverError.value = 'Could not load universities for this state.'
  } finally {
    loadingUniversities.value = false
  }
}

function onClearServerError(field) {
  if (serverErrors.value[field]) {
    delete serverErrors.value[field]
  }
}

async function onRegister(payload) {
  loading.value = true
  serverError.value = ''
  serverErrors.value = {}

  try {
    const formData = new FormData()
    formData.append('first_name', payload.first_name)
    formData.append('last_name', payload.last_name)
    formData.append('phone', payload.phone)
    formData.append('university_id', payload.university_id)
    formData.append('email', payload.email)
    formData.append('username', payload.username)
    formData.append('password', payload.password)
    formData.append('password_confirmation', payload.password_confirmation)
    if (payload.bio) formData.append('bio', payload.bio)
    if (payload.avatar) formData.append('avatar', payload.avatar)

    await register(formData)

    await navigateTo('/')

  } catch (e) {
    if (e.response?.status === 422) {
      // Fortify validation errors -> per-field
      serverErrors.value = e.response?.data?.errors || {}
      // If no field errors, show general message
      if (!Object.keys(serverErrors.value).length) {
        serverError.value = e.response?.data?.message || 'Please check your inputs.'
      } else {
        serverError.value = 'Check your inputs'
      }
    } else {
      serverError.value = e.response?.data?.message || 'Registration failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
  .register-page {
    min-height: 100dvh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 24px 16px;
    background: var(--ck-bg-soft);
  }
  .register-page__card {
    width: 100%;
    max-width: 480px;
  }
</style>