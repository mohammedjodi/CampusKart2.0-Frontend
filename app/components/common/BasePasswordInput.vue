<!-- BasePasswordInput Component
    * Same API as BaseInput, plus password visibility toggle.
    * Works with v-model.
-->

<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>

    <div :class="['base-input__wrapper', { 'base-input__wrapper--error': error, 'base-input__wrapper--disabled': disabled }]">
      <span v-if="$slots.leftIcon" class="base-input__icon base-input__icon--left">
        <slot name="leftIcon" />
      </span>

     <input
        :id="inputId"
        :name="name"
        :type="isVisible ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
        class="base-input__field"
        :SeePass="SeePass"
        @input="emit('update:modelValue', $event.target.value)"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
        />

      <button
        v-if="SeePass"
        type="button"
        class="base-input__icon base-input__toggle"
        :aria-label="isVisible ? 'Hide password' : 'Show password'"
        :aria-pressed="isVisible"
        :disabled="disabled"
        @click="isVisible = !isVisible"
      >
        <EyeOff v-if="isVisible" :size="18" />
        <Eye v-else :size="18" />
      </button>
    </div>

    <p v-if="error" :id="`${inputId}-error`" class="base-input__error">{{ error }}</p>
    <p v-else-if="hint" :id="`${inputId}-hint`" class="base-input__hint">
        {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  autocomplete: { type: String, default: 'current-password' },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  SeePass:{ type: Boolean, default:true}
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isVisible = ref(false)

// Generate a unique ID for the input if no ID is provided
const generatedId = useId()
const inputId = computed(() => props.id || generatedId)
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.base-input__label {
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 700;
  color: var(--ck-text);
}

.base-input__required {
  color: var(--ck-danger);
}

.base-input__wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ck-bg);
  border: 1px solid var(--ck-border);
  border-radius: var(--ck-radius-sm);
  padding: 0 14px;
  height: 44px;
  transition: var(--transition);
}

.base-input__wrapper:focus-within {
  border-color: var(--ck-primary-dark);
  box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.12);
}

.base-input__wrapper--error {
  border-color: var(--ck-danger);
}

.base-input__wrapper--error:focus-within {
  box-shadow: 0 0 0 3px rgba(229, 72, 77, 0.12);
}

.base-input__wrapper--disabled {
  background: var(--ck-bg-soft);
  opacity: 0.7;
}

.base-input__field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-primary);
  font-size: 14px;
  color: var(--ck-text);
  width: 100%;
  height: 100%;
}

.base-input__field::placeholder {
  color: var(--ck-text-light-muted);
}

.base-input__icon {
  display: flex;
  align-items: center;
  color: var(--ck-text-muted);
  flex-shrink: 0;
}

.base-input__toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--ck-text-muted);
}

.base-input__toggle:hover {
  color: var(--ck-text);
}

.base-input__error {
  font-size: 12px;
  color: var(--ck-danger);
  font-weight: 600;
}

.base-input__hint {
  font-size: 12px;
  color: var(--ck-text-muted);
}
</style>