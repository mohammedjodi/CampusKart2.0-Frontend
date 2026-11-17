<!-- BaseButton Component 
  * gives you a button with different variants and sizes, and also supports loading and disabled states.
-->

<template>
  <button
    :type="type"
    :class="['base-btn', `base-btn--${variant}`, `base-btn--${size}`]"
    :disabled="disabled || loading"
    :aria-busy="loading"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="base-btn__spinner" role="status">
      <span class="sr-only">Loading...</span>
    </span>
    <template v-else>
      <slot name="icon" />

      <slot />
    </template>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },

  size: {
    type: String,
    default: 'md',
  },

  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },

  loading: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-primary);
  font-weight: 700;
  border: none;
  border-radius: var(--ck-radius-sm);
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.base-btn--primary {
  background: var(--color-bg-nav);
  color: var(--ck-text-light);
}

.base-btn--primary:hover:not(:disabled) {
  filter: brightness(1.05);
  box-shadow: var(--ck-shadow-hover);
}

.base-btn--secondary {
  background: var(--ck-bg-soft);
  color: var(--ck-text);
  border: 1px solid var(--ck-border);
}

.base-btn--outline {
  background: transparent;
  color: var(--ck-primary-dark);
  border: 1.5px solid var(--ck-primary-dark);
}

.base-btn--ghost {
  background: transparent;
  color: var(--ck-text-muted);
}

.base-btn--danger {
  background: var(--ck-danger);
  color: var(--ck-text-light);
}

/* Sizes */
.base-btn--sm {
  padding: 8px 14px;
  font-size: 13px;
  height: 36px;
}

.base-btn--md {
  padding: 10px 50px;
  font-size: 14px;
  height: 44px;
}

.base-btn--lg {
  padding: 14px 28px;
  font-size: 15px;
  height: 52px;
  width: 100%;
}

/* Loading spinner */
.base-btn__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

/* Accessible text for screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
