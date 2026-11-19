<!-- pages/index.vue - your home page after register -->
<template>
  <div>
    <h1>Welcome, {{ user?.first_name }}</h1>
    <p>{{ user?.email }}</p>
    <p>{{ user?.phone }}</p>
    <p>{{ user?.bio }}</p>
    <!-- <img v-if="user?.avatar" :src="user.avatar" /> -->
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'default' , })
useHead({
  //  title: "CampusKart"
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)


console.log('Logged in user after register:', user.value)
</script>