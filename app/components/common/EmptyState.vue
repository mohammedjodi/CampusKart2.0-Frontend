<script setup>
import { PackageOpen, RotateCcw } from 'lucide-vue-next'

const props = defineProps({
  title: { type: String, default: 'No items found' },
  message: { type: String, default: 'Try changing your filters or search.' },
  actionLabel: { type: String, default: '' },
})

const emit = defineEmits(['action'])
</script>

<template>
  <div class="empty-state">
    <div class="empty-state__visual">
      <div class="empty-state__ring" />
      <div class="empty-state__circle">
        <PackageOpen :size="42" :stroke-width="1.5" class="empty-state__icon" />
      </div>
      <span class="empty-state__dot empty-state__dot--1" />
      <span class="empty-state__dot empty-state__dot--2" />
      <span class="empty-state__dot empty-state__dot--3" />
    </div>

    <h3 class="empty-state__title">{{ title }}</h3>
    <p class="empty-state__message">{{ message }}</p>

    <button
      v-if="actionLabel"
      class="empty-state__button"
      @click="emit('action')"
    >
      <!-- <RotateCcw :size="16" /> -->
      {{ actionLabel }}
    </button>

    <div class="empty-state__pills">
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1.5rem 2.5rem;
  border: 1px dashed #ffd9be;
  border-radius: 1.25rem;
  background: #fff;
  animation: card-in 0.4s ease both;
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Icon visual - matches LoadingState */
.empty-state__visual {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.empty-state__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px dashed #ff6b00;
  opacity: 0.35;
  animation: spin-slow 12s linear infinite;
}
@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
.empty-state__circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #fff7f0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 2s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.empty-state__icon {
  color: #ff6b00;
}
.empty-state__dot {
  position: absolute;
  border-radius: 50%;
  background: #ff6b00;
}
.empty-state__dot--1 {
  width: 8px;
  height: 8px;
  top: 6px;
  right: 14px;
  animation: bounce-dot 1.8s infinite;
}
.empty-state__dot--2 {
  width: 6px;
  height: 6px;
  bottom: 10px;
  left: 6px;
  background: #ffb98a;
  animation: bounce-dot 1.8s infinite 0.3s;
}
.empty-state__dot--3 {
  width: 5px;
  height: 5px;
  bottom: 18px;
  right: 4px;
  background: #ffd9be;
  animation: bounce-dot 1.8s infinite 0.6s;
}
@keyframes bounce-dot {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.4); opacity: 1; }
}

.empty-state__title {
  font-family: Poppins, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.4rem;
}
.empty-state__message {
  font-family: Inter, sans-serif;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 1.25rem;
  max-width: 320px;
}
.empty-state__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--ck-primary);
  color: #fff;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 6px 16px rgba(255, 107, 0, 0.3);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.empty-state__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.35);
}
.empty-state__button:active {
  transform: translateY(0) scale(0.98);
}

.empty-state__pills {
  display: flex;
  gap: 6px;
  margin-top: 1.5rem;
}
.empty-state__pills span {
  width: 22px;
  height: 6px;
  border-radius: 999px;
  background: #ffe4d1;
}
.empty-state__pills span:nth-child(2) { background: #ffb98a; }
</style>