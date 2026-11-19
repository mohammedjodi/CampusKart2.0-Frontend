<!-- BaseCheckbox Component
    * Reusable checkbox with label and error.
    * Works with v-model (Boolean).
-->

<template>
  <div class="base-checkbox">
    <label :for="inputId" :class="['base-checkbox__label', { 'base-checkbox__label--disabled': disabled }]">
      <input
        type="checkbox"
        :id="inputId"
        :checked="modelValue"
        :disabled="disabled"
        class="base-checkbox__input"
        @change="emit('update:modelValue', $event.target.checked)"
      />
      <span class="base-checkbox__box">
        <Check v-if="modelValue" :size="14" stroke-width="3" />
      </span>
      <span class="base-checkbox__text">
        <slot>{{ label }}</slot>
      </span>
    </label>
    <p v-if="error" class="base-checkbox__error">{{ error }}</p>
  </div>
</template>

<script setup>
import { Check } from 'lucide-vue-next'
 
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: '' },
})

const generatedId = useId()
const inputId = computed(() => props.id || generatedId)

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-checkbox {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.base-checkbox__label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 14px;
  color: var(--ck-text);
  user-select: none;
}

.base-checkbox__label--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-checkbox__input {
  position: absolute;
  opacity: 0;
  /* pointer-events: none; */
}

.base-checkbox__input:focus-visible + .base-checkbox__box {
  outline: 2px solid var(--ck-primary-dark);
  outline-offset: 3px;
}

.base-checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 1.5px solid var(--ck-border);
  border-radius: var(--ck-radius-sm);
  background: var(--ck-bg);
  color: var(--ck-text-light);
  transition: var(--transition);
}

.base-checkbox__input:checked + .base-checkbox__box {
  background: var(--color-bg-nav);
  border-color: var(--color-bg-nav);
}

.base-checkbox__input:focus-visible + .base-checkbox__box {
  box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.12);
}

.base-checkbox__text {
  line-height: 1.4;
}

.base-checkbox__error {
  font-size: 12px;
  color: var(--ck-danger);
  font-weight: 600;
}
</style>