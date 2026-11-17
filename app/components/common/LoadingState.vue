<script setup>
import { ShoppingBag } from 'lucide-vue-next'

const props = defineProps({
  message: { type: String, default: 'Loading products...' },
  variant: { type: String, default: 'cards' }, // 'cards' | 'spinner' | 'list'
  count: { type: Number, default: 6 },
})
</script>

<template>
  <!-- SKELETON CARDS - for product grids -->
  <div v-if="variant === 'cards'" class="loading-cards">
    <div v-for="n in count" :key="n" class="skeleton-card">
      <div class="skeleton-card__image shimmer">
        <ShoppingBag :size="28" class="skeleton-card__icon" />
      </div>
      <div class="skeleton-card__body">
        <div class="skeleton-line skeleton-line--title shimmer" />
        <div class="skeleton-line skeleton-line--text shimmer" />
        <div class="skeleton-line skeleton-line--price shimmer" />
      </div>
    </div>

    <div class="loading-bar">
      <div class="loading-bar__fill" />
      <p class="loading-bar__text">
        {{ message }}
        <span class="dots"><span>.</span><span>.</span><span>.</span></span>
      </p>
    </div>
  </div>

  <!-- LIST SKELETON - for categories / cart -->
  <div v-else-if="variant === 'list'" class="loading-list">
    <div v-for="n in count" :key="n" class="skeleton-row">
      <div class="skeleton-row__avatar shimmer" />
      <div class="skeleton-row__lines">
        <div class="skeleton-line skeleton-line--title shimmer" />
        <div class="skeleton-line skeleton-line--text shimmer" />
      </div>
    </div>
  </div>

  <!-- CENTER SPINNER - for full page -->
  <div v-else class="loading-center">
    <div class="loading-center__ring">
      <div class="loading-center__ring-inner" />
      <ShoppingBag :size="26" class="loading-center__icon" />
    </div>
    <p class="loading-center__text">
      {{ message }}
      <span class="dots"><span>.</span><span>.</span><span>.</span></span>
    </p>
    <div class="loading-center__pills">
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<style scoped>
/* ---- Shared ---- */
.shimmer {
  position: relative;
  overflow: hidden;
  background: #f1f1f1;
}
.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  to { transform: translateX(100%); }
}

.dots span {
  display: inline-block;
  animation: bounce-dot 1s infinite;
}
.dots span:nth-child(2) { animation-delay: 0.15s; }
.dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce-dot {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(-3px); opacity: 1; }
}

.skeleton-line {
  height: 12px;
  border-radius: 999px;
}
.skeleton-line--title { width: 75%; }
.skeleton-line--text { width: 55%; }
.skeleton-line--price { width: 40%; height: 14px; background: #ffe4d1; }

/* ---- Cards ---- */
.loading-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}
.skeleton-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 1rem;
  overflow: hidden;
  animation: card-in 0.4s ease both;
}
.skeleton-card:nth-child(2) { animation-delay: 0.05s; }
.skeleton-card:nth-child(3) { animation-delay: 0.1s; }
.skeleton-card:nth-child(4) { animation-delay: 0.15s; }
@keyframes card-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.skeleton-card__image {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff7f0;
}
.skeleton-card__icon {
  color: #ff6b00;
  opacity: 0.35;
  animation: pulse-icon 1.6s ease-in-out infinite;
}
@keyframes pulse-icon {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.15); opacity: 0.6; }
}
.skeleton-card__body {
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.loading-bar {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding-top: 0.5rem;
}
.loading-bar__fill {
  width: 180px;
  height: 4px;
  border-radius: 999px;
  background: #ffe4d1;
  overflow: hidden;
  position: relative;
}
.loading-bar__fill::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 40%;
  background: #ff6b00;
  border-radius: 999px;
  animation: slide-bar 1.1s ease-in-out infinite alternate;
}
@keyframes slide-bar {
  from { transform: translateX(0); }
  to { transform: translateX(150%); }
}
.loading-bar__text {
  font-family: Inter, sans-serif;
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

/* ---- List ---- */
.loading-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.skeleton-row {
  display: flex;
  gap: 0.9rem;
  align-items: center;
}
.skeleton-row__avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
}
.skeleton-row__lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ---- Center ---- */
.loading-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 1rem;
}
.loading-center__ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #fff7f0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.loading-center__ring-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid #ffe4d1;
  border-top-color: #ff6b00;
  animation: spin 0.8s linear infinite;
}
.loading-center__icon {
  color: #ff6b00;
}
.loading-center__text {
  font-family: Inter, sans-serif;
  font-size: 0.9rem;
  color: #374151;
  margin: 0;
  font-weight: 500;
}
.loading-center__pills {
  display: flex;
  gap: 6px;
}
.loading-center__pills span {
  width: 22px;
  height: 6px;
  border-radius: 999px;
  background: #ffe4d1;
  animation: pill-pulse 1s infinite;
}
.loading-center__pills span:nth-child(2) { animation-delay: 0.15s; background: #ffb98a; }
.loading-center__pills span:nth-child(3) { animation-delay: 0.3s; }
@keyframes pill-pulse {
  0%, 100% { transform: scaleX(1); opacity: 0.5; }
  50% { transform: scaleX(1.4); opacity: 1; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>