<template>
<div class="container   items-center justify-center gap-4 py-8">
        <!-- Product grid loading - skeleton cards -->
<CommonLoadingState v-if="isLoading" variant="cards" :count="6" message="Finding best deals for you" />

<!-- Category / Cart list loading -->
<CommonLoadingState v-if="isLoading" variant="list" :count="4" />

<!-- Full page loading -->
<CommonLoadingState v-if="isLoading" variant="spinner" message="Loading CampusKART" />

</div>

</template>

<script setup>
import { ref, computed } from 'vue'


const isLoading = ref(true);
const filteredProducts = ref([]);

</script>