<script setup lang="ts">
    const search = ref('');
    
    const doSearch = (query: string) => {
        console.log('Searching for:', query);
        // Implement your search logic here
    };
</script>

<template>
    <br>
<CommonSearchBar v-model="search" @search="doSearch"  @update:modelValue="(e) => console.log('SearchBar.vue: search =', e)" class="container"/>

<!-- search = "laptop" -->
<!-- doSearch runs when you press Enter or click Search button -->
</template>