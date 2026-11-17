<!-- BaseBadge Component
    * Small tag for ProductCard: New, Used, Sold, Negotiable, etc.
-->

<template>
  <span :class="['base-badge', `base-badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'new', 'used', 'sold', 'success', 'warning', 'danger'].includes(value),
  },
})
</script>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  white-space: nowrap;
  width: fit-content;
}

/* Variants */
.base-badge--default {
  background: var(--ck-bg-soft);
  color: var(--ck-text-muted);
}

.base-badge--new {
  background: #e6f4ea;
  color: #1a7f37;
}

.base-badge--used {
  background: #fff3e0;
  color: var(--ck-primary-dark);
}

.base-badge--sold {
  background: #fce8e6;
  color: var(--ck-danger);
}

.base-badge--success {
  background: #e6f4ea;
  color: #1a7f37;
}

.base-badge--warning {
  background: #fef7e0;
  color: #b06000;
}

.base-badge--danger {
  background: #fce8e6;
  color: var(--ck-danger);
}
</style>