<template>
  <NuxtLayout>
    <Toaster :position="toastPosition" :rich-colors="true" :close-button="true"  :gap="8" :expand="false"/>
      <!-- Whole page loading while we restore user -->
    <CommonLoadingState v-if="authStore.loading" variant="fullPage"/>
    <NuxtPage v-else/>
  </NuxtLayout>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '~/stores/auth'

import 'vue-sonner/style.css'

const windowWidth = ref(1024)
const authStore =  useAuthStore()
const { loading } = storeToRefs(authStore)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

async function updateUser (){

    if (!authStore.user) {
      await authStore.fetchUser()
    }
}
  
onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
  updateUser()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

// Mobile < 768 = top-center, iPad + Desktop >= 768 = top-right
const toastPosition = computed(() => {
  return windowWidth.value < 768 ? 'top-center' : 'top-right'
})
</script>

<style>
/* ===== ONLY MOBILE - Desktop / iPad stay 100% default ===== */
@media (max-width: 767px) {
  [data-sonner-toaster] {
    left: 0 !important;
    right: 0 !important;
    top: 0 !important;
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
    padding-top: env(safe-area-inset-top) !important;
  }

  [data-sonner-toast] {
    width: 100% !important;
    max-width: none !important;
    border-radius: 0 0 0 0  !important;
    padding: 14px 12px 14px 16px !important;
    font-size: 14px !important;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  }

  [data-sonner-toast] [data-content] {
    flex: 1 !important;
    min-width: 0 !important;
  }

  /* Mobile only: X always visible + at end */
  [data-sonner-toast] [data-close-button] {
    opacity: 1 !important;
    visibility: visible !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    pointer-events: auto !important;
    background: rgba(0, 0, 0, 0.08) !important;
    border-radius: 50% !important;
    position: static !important;
    transform: none !important;
    margin-left: auto !important;
    flex-shrink: 0 !important;
    width: 28px !important;
    height: 28px !important;
  }
}
</style>