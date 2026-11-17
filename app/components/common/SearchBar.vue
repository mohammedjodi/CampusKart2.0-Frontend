<!-- SearchBar Component
    * Reusable search with icon, clear button, and enter to search
    * Parent controls the value with v-model
-->

<template>
  <div class="search-bar">
    <span class="search-bar__icon">  
        <Search :size="18" />
    </span>

    <input
      :value="modelValue"
      :placeholder="placeholder"
      type="text"
      class="search-bar__input"
      @input="emit('update:modelValue', $event.target.value)"
      @keyup.enter="emit('search', modelValue)"
    />

    <!-- Clear button - only shows when there's text -->
    <button
      v-if="modelValue"
      class="search-bar__clear"
      @click="clear"
      aria-label="Clear search"
    >
      <X :size="18" />
    </button>

    <button class="search-bar__btn" @click="emit('search', modelValue)">
      Search
    </button>
  </div>
</template>

<script setup>
import { X , Search} from 'lucide-vue-next'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search laptops, textbooks, hostels...',
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'clear'])

function clear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ck-bg-card);
  border: 1px solid var(--ck-border);
  border-radius: var(--card-border-radius-5);
  padding: 6px 6px 6px 14px;
}

.search-bar:focus-within {
  border-color: var(--ck-primary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.search-bar__icon {
  font-size: 16px;
  color: var(--ck-text-muted);
}

.search-bar__input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: var(--ck-text);
  min-width: 0;
}

.search-bar__input::placeholder {
  color: var(--ck-text-muted);
}

.search-bar__clear {
  background: var(--ck-danger);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  color: var(--ck-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
    justify-content: center;
  flex-shrink: 0;
}

.search-bar__btn {
  background: var(--ck-primary);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
}
</style>