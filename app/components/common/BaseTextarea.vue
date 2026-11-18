<!-- BaseTextarea Component - same style as BaseInput, but textarea -->

<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>

    <div :class="['base-input__wrapper base-textarea__wrapper', { 'base-input__wrapper--error': error, 'base-input__wrapper--disabled': disabled }]">
      <textarea
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        class="base-input__field base-textarea__field"
        @input="emit('update:modelValue', $event.target.value)"
        @blur="emit('blur', $event)"
      />
    </div>

    <p v-if="error" class="base-input__error">{{ error }}</p>
    <p v-else-if="hint" class="base-input__hint">{{ hint }}</p>
    <p v-if="showCount" class="base-input__hint base-textarea__count">{{ modelValue.length }} / {{ maxlength }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  id: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
  maxlength: { type: Number, default: 500 },
  showCount: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'blur'])
const inputId = computed(() => props.id || `textarea-${Math.random().toString(36).slice(2, 8)}`)
</script>

<style scoped>
.base-input { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.base-input__label { font-family: var(--font-primary); font-size: 13px; font-weight: 700; color: var(--ck-text); }
.base-input__required { color: var(--ck-danger); }
.base-input__wrapper { display: flex; background: var(--ck-bg); border: 1px solid var(--ck-border); border-radius: var(--ck-radius-sm); padding: 0 14px; transition: var(--transition); }
.base-input__wrapper:focus-within { border-color: var(--ck-primary-dark); box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.12); }
.base-input__wrapper--error { border-color: var(--ck-danger); }
.base-input__wrapper--disabled { background: var(--ck-bg-soft); opacity: 0.7; }
.base-input__field { flex: 1; border: none; outline: none; background: transparent; font-family: var(--font-primary); font-size: 14px; color: var(--ck-text); width: 100%; }
.base-textarea__wrapper { padding: 10px 14px; height: auto; }
.base-textarea__field { resize: vertical; min-height: 72px; line-height: 1.5; }
.base-input__error { font-size: 12px; color: var(--ck-danger); font-weight: 600; }
.base-input__hint { font-size: 12px; color: var(--ck-text-muted); }
.base-textarea__count { text-align: right; margin-top: -2px; }
</style>