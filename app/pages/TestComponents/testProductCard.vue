
<template>
  <div class="container" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; width: 800px; max-width: 800px; margin: auto; padding: 16px;">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      @view="handleView"
      @toggle-favourite="toggleFav(p)"
    />
  </div>
</template>

<script setup>
import {  reactive } from 'vue'
import ProductCard from '@/components/common/ProductCard.vue'

const products = reactive([
  {
    id: 1,
    title: 'HP Pavilion 15 Laptop - 8GB RAM, 512GB SSD',
    price: 285000,
    condition: 'used',
    description: '8GB RAM, 512GB SSD, barely used. Battery lasts 6hrs. Comes with charger and laptop bag.',
    category: 'Electronics',
    location: 'UNILAG',
    sellerName: 'Tunde A.',
    timeAgo: '2h ago',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    isSold: false,
    isFavourited: false,

  },
  {
    id: 2,
    title: 'iPhone 12 - 128GB, Battery 89%',
    price: 320000,
    condition: 'New',
    description: '8GB RAM, 512GB SSD, barely used. Battery lasts 6hrs. Comes with charger and laptop bag.',
    category: 'Phones',
    location: 'Yaba',
    sellerName: 'Adaeze O.',
    timeAgo: '5h ago',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    isSold: true,
    isFavourited: false,


  },
  {
    id: 3,
    title: 'HP Pavilion 15 Laptop',
    price: 285000,
    description: '8GB RAM, 512GB SSD, barely used. Battery lasts 6hrs. Comes with charger and laptop bag.',
    condition: 'default ',
    category: 'Electronics',
    location: 'UNILAG',
    sellerName: 'Tunde A.',
    timeAgo: '2h ago',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    isSold: false,
    isFavourited:false,
  }
])



function handleView(product) {
  console.log('View', product.title)
}


const { success, info , error  } = useCkToast()

const toggleFav = (product) => {
  product.isFavourited = !product.isFavourited
  if (product.isFavourited) {
    success('Added to favorites')
  } else {
    info('Removed from favorites')
  }
}
</script>
