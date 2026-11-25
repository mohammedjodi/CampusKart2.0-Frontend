<!-- pages/index.vue - your home page after register -->
<template>
  <div v-if="isAuthenticated">
    <h1>Welcome, {{ user.first_name}}</h1>
    <p>{{ user?.email }}</p>
    <p>{{ user?.phone }}</p>
    <p>{{ user?.bio }}</p>
    <!-- <img v-if="user?.avatar" :src="user.avatar" /> -->
  </div>
  <div v-else>
    <p>Please Login</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
useHead({
  // title: "CampusKart"
})

// ONE source: useAuth gives you user from store, no need for storeToRefs
const { user , isAuthenticated } = useAuth()

console.log('Logged in user after register:', user.value)
</script>