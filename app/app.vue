<template>
  <!-- Loading State for full page..... -->
  <Transition name="loader-fade">
    <div v-if="showInitialLoader" id="app-loader">
      <div class="loader-content">

        <img
          src="/images/Logo.png"
          alt="CampusKart"
          class="loader-logo"
        />

        <p class="loader-text">Getting things ready</p>

        <div class="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </div>
  </Transition>

  <NuxtLayout>
    <Toaster
      :position="toastPosition"
      :rich-colors="true"
      :close-button="true"
      :gap="8"
      :expand="false"
    />
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { Toaster } from 'vue-sonner'
  import 'vue-sonner/style.css'

  // Initial page loader
  const showInitialLoader = ref(true)
  let loaderTimer

  const windowWidth = ref(1024)

  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    loaderTimer = setTimeout(() => {
      showInitialLoader.value = false
    }, 700)

    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    clearTimeout(loaderTimer)
    window.removeEventListener('resize', updateWidth)
  })

  // Toast position
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

<style scoped>
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  #app-loader {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-bg-nav);

    z-index: 999999;
  }

/* Loader fade-out transition */
.loader-fade-leave-active {
  transition: opacity 600ms ease;
}

.loader-fade-leave-to {
  opacity: 0;
}

  .loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    animation: fadeIn 0.7s ease-in-out;
  }

  .loader-logo {
    width: 300px;
    max-width: 70vw;
    height: auto;
    object-fit: contain;
    margin-bottom: 28px;
    animation: logoPulse 2s ease-in-out infinite;
  }

  .loader-text {
    color: #ffffff;
    font-family: Manrope, sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin: 0 0 20px;
  }

  .loader-dots {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .loader-dots span {
    width: 7px;
    height: 7px;
    background: #ffffff;
    border-radius: 50%;
    animation: dotBounce 1.2s infinite ease-in-out;
  }

  .loader-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loader-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes dotBounce {
    0%, 60%, 100% {
      opacity: 0.4;
      transform: translateY(0);
    }

    30% {
      opacity: 1;
      transform: translateY(-7px);
    }
  }

  @keyframes logoPulse {
    0%, 100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.035);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

</style>