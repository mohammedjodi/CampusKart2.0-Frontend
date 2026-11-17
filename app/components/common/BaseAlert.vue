<!-- BaseAlert Component
    * Form-level message, not field-level error.
    * Use for: Invalid credentials, Check your email, Account created.
-->

<template>
  <div v-if="visible" :class="['base-alert', `base-alert--${type}`]" role="alert">
    <span class="base-alert__icon">
      <CheckCircle2 v-if="type === 'success'" :size="18" />
      <AlertCircle v-else-if="type === 'error'" :size="18" />
      <AlertTriangle v-else-if="type === 'warning'" :size="18" />
      <Info v-else :size="18" />
    </span>
    <div class="base-alert__content">
      <p v-if="title" class="base-alert__title">{{ title }}</p>
      <p v-if="message" class="base-alert__message">{{ message }}</p>
      <slot />
    </div>
    <button
        v-if="dismissible"
        type="button"
        class="base-alert__close"
        aria-label="Dismiss alert"
        @click="dismiss"
    >
        <X :size="16" />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const props = defineProps({
  type: { type: String, default: 'info', validator: (v) => ['success', 'error', 'warning', 'info'].includes(v) },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  dismissible: { type: Boolean, default: false },
  show: { type: Boolean, default: true },
})

const visible = ref(props.show)

// Watch for changes to the show prop and update the visible state accordingly
watch(() => props.show, (val) => { visible.value = val })

const emit = defineEmits(['dismiss'])

const dismiss = () => {
  visible.value = false
  emit('dismiss')
}
</script>

<style scoped>
.base-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: var(--ck-radius-sm);
  font-family: var(--font-primary);
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid transparent;
}

.base-alert--success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
  color: var(--ck-text);
}

.base-alert--error {
  background: rgba(229, 72, 77, 0.08);
  border-color: rgba(229, 72, 77, 0.3);
  color: var(--ck-text);
}

.base-alert--warning {
  background: rgba(255, 140, 0, 0.1);
  border-color: rgba(255, 140, 0, 0.3);
  color: var(--ck-text);
}

.base-alert--info {
  background: var(--ck-bg-soft);
  border-color: var(--ck-border);
  color: var(--ck-text);
}

.base-alert__icon {
  display: flex;
  flex-shrink: 0;
  margin-top: 1px;
}

.base-alert--success .base-alert__icon { color: #22c55e; }
.base-alert--error .base-alert__icon { color: var(--ck-danger); }
.base-alert--warning .base-alert__icon { color: #ff8c00; }
.base-alert--info .base-alert__icon { color: var(--ck-text-muted); }

.base-alert__content {
  flex: 1;
}

.base-alert__title {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 2px;
}

.base-alert__message {
  color: var(--ck-text-muted);
  margin: 0;
}

.base-alert__close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ck-text-muted);
  padding: 0;
  display: flex;
}
</style>