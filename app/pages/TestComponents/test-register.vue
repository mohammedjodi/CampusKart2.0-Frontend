<template>
  <div style="max-width: 480px; margin: 40px auto; padding: 0 16px;">
    <FormsRegisterForm :loading="loading" :universities="unis" :loading-universities="loadingUnis" :server-error="serverError" @state-change="fetchUnis" @submit="onSubmit" />
    <pre style="font-size: 12px; margin-top: 16px;">{{ lastPayload }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(false)
const loadingUnis = ref(false)
const serverError = ref('')
const unis = ref([])
const lastPayload = ref(null)

// Mock API for universities
function fetchUnis(stateId) {
  loadingUnis.value = true
  setTimeout(() => {
    const map = {
      1: [{ id: 10, name: 'University of Lagos' }, { id: 11, name: 'Lagos State University' }],
      2: [{ id: 20, name: 'University of Abuja' }],
      3: [{ id: 30, name: 'University of Ibadan' }],
      4: [{ id: 40, name: 'Bayero University Kano' }],
    }
    unis.value = map[stateId] || []
    loadingUnis.value = false
  }, 600)
}

function onSubmit(payload) {
  lastPayload.value = { ...payload, avatar: payload.avatar?.name || null }
  console.log('Register payload:', payload)
  // Parent will later build FormData here
  const fd = new FormData()
  Object.entries(payload).forEach(([k, v]) => { if (v !== null && v !== '') fd.append(k, v) })
  console.log('FormData keys:', [...fd.keys()])
}
</script>