<!-- CategoryPill.vue - FINAL VERSION -->

<template>
  <button
    class="category-pill"
    :class="{ 'category-pill--active': isActive }"
    @click="emit('click', category)"
  >
    <!-- It looks up the icon from the name by itself -->
    <component :is="iconComponent" :size="16" class="category-pill__icon" />

    {{ category.label }}

    <span v-if="category.count !== undefined" class="category-pill__count">
      {{ category.count }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { getCategoryIcon } from '@/utils/categoryIcons.js'

const props = defineProps({
  category: {
    type: Object,
    required: true, // { id, label, count } - label MUST match DB name exactly
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

// label -> icon
const iconComponent = computed(() => {
  return getCategoryIcon(props.category.label)
})
</script>

<style scoped>
.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--ck-border);
  background: var(--ck-bg-card);
  color: var(--ck-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}
.category-pill--active {
  background: var(--ck-primary);
  border-color: var(--ck-primary);
  color: white;
}
.category-pill__icon { flex-shrink: 0; }
.category-pill__count {
  background: rgba(0,0,0,0.12);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
}
</style>