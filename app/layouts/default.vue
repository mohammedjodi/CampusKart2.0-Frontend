<template>
  <div>
    <AppHeader />

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
    import AppHeader from '~/components/layouts/AppHeader.vue'
</script>