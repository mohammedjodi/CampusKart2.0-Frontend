<template>
    <br>
    <br>
    <div class="category-list container">
        <CommonCategoryPill
            v-for="cat in categories"
            :key="cat.id"
            :category="cat"
            :is-active="selectedCategory === cat.id"
            @click="selectedCategory = cat.id"
        />
    </div>
</template>

<script setup>
  // This will later come from your API: GET /api/categories
const dbCategories =ref([
  { id: 1, label: 'Phones & Tablets', count: 45 },
  { id: 2, label: 'Computers & Laptops', count: 32 },
  { id: 3, label: 'Electronics', count: 28 },
  { id: 4, label: 'Fashion', count: 51 },
  { id: 5, label: 'Shoes', count: 19 },
  { id: 6, label: 'Books & Study Materials', count: 67 },
  { id: 7, label: 'Furniture', count: 12 },
  { id: 8, label: 'Home and Kitchen', count: 23 },
  { id: 9, label: 'Sports & Fitness', count: 14 },
  { id: 10, label: 'Beauty & Personal Care', count: 18 },
  { id: 11, label: 'Services', count: 9 },
  { id: 12, label: 'Other', count: 7 },
])

const categories = computed(() => {
  const total = dbCategories.value.reduce((sum, cat) => sum + cat.count, 0)

  return [
    { id: 'all', label: 'All', count: total }, // <-- UI only, always first
    ...dbCategories.value, // <-- spread DB categories after it
  ]
})

const selectedCategory = ref('all') // default to "All"
</script>

<style scoped>

.category-list {
  display: flex;
  gap: 10px;
  overflow-x: auto; /* scroll sideways */
  padding: 12px 0;
  scrollbar-width: none; /* hide scrollbar on Firefox */
}

.category-list::-webkit-scrollbar {
  display: none; /* hide scrollbar on Chrome */
}

</style>