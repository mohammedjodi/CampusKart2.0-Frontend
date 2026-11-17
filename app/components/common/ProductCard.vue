<!-- ProductCard Component
    * Used on Home / Search / Category pages
    * Shows image, title, price, description, condition, location
-->

<template>
  <article class="product-card" @click="emit('click', product)">
    <!-- Image -->
    <div class="product-card__image-wrapper">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="product-card__image"
        loading="lazy"
      />

      <div class="product-card__badges">
        <BaseBadge :variant="product.condition.toLowerCase()">
          {{ product.condition }}
        </BaseBadge>

        <BaseBadge v-if="product.isSold" variant="sold">
          Sold
        </BaseBadge>
      </div>

      <!-- CHANGED: was isFavourited, now product.isFavourited -->
      <button
        class="product-card__fav"
        :class="{ 'product-card__fav--active': product.isFavourited }"
        @click.stop="emit('toggle-favourite', product)"
        aria-label="Add to favourites"
      >
      <Heart
            :size="22"
            :fill="product.isFavourited ? 'currentColor' : 'none'"
            />

      </button>
    </div>

    <!-- Body -->
    <div class="product-card__body">
      <div class="product-card__top">
        <h3 class="product-card__title">{{ product.title }}</h3>
        <p class="product-card__price">₦{{ formatPrice(product.price) }}</p>
      </div>

      <p class="product-card__description">
        {{ product.description }}
      </p>

      <p class="product-card__meta">
        {{ product.category }} • {{ product.location }}
      </p>

      <p class="product-card__seller">
        {{ product.sellerName }} • {{ product.timeAgo }}
      </p>

      <BaseButton
        variant="outline"
        size="sm"
        :disabled="product.isSold"
        @click.stop="emit('view', product)"
        class="product-card__btn"
      >
        {{ product.isSold ? 'Sold Out' : 'View Details' }}
      </BaseButton>
    </div>
  </article>
</template>

<script setup>

import { Heart } from 'lucide-vue-next';
import BaseBadge from './BaseBadge.vue'
import BaseButton from './BaseButton.vue'

// CHANGED: only 1 prop now, no more isFavourited prop
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click', 'view', 'toggle-favourite'])

function formatPrice(price) {
  return Number(price).toLocaleString('en-NG')
}
</script>

<style scoped>
.product-card {
  background: var(--ck-bg-card);
  border: 1px solid var(--ck-border);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.product-card__image-wrapper {
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--ck-bg-soft);
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
}

.product-card__fav {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: var(--ck-bg-soft);
  font-size: 18px;
  color: var(--ck-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.product-card__fav--active {
  color: var(--ck-primary-dark);
}

.product-card__body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.product-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.product-card__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--ck-text);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__price {
  font-size: 15px;
  font-weight: 800;
  color: var(--ck-primary-dark);
  white-space: nowrap;
}

.product-card__description {
  font-size: 13px;
  line-height: 1.4;
  color: var(--ck-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__meta {
  font-size: 12px;
  color: var(--ck-text-muted);
}

.product-card__seller {
  font-size: 12px;
  color: var(--ck-text-muted);
}

.product-card__btn {
  margin-top: auto;
  width: 100%;
}
</style>