import { markRaw } from 'vue'
import {
  Smartphone,
  Laptop,
  Tv,
  Shirt,
  Footprints,
  BookOpen,
  Sofa,
  CookingPot,
  Dumbbell,
  Sparkles,
  Wrench,
  LayoutGrid,
} from 'lucide-vue-next'

export const categoryIconMap = {
  'All': markRaw(LayoutGrid),
  'Phones & Tablets': markRaw(Smartphone),
  'Computers & Laptops': markRaw(Laptop),
  'Electronics': markRaw(Tv),
  'Fashion': markRaw(Shirt),
  'Shoes': markRaw(Footprints),
  'Books & Study Materials': markRaw(BookOpen),
  'Furniture': markRaw(Sofa),
  'Home and Kitchen': markRaw(CookingPot),
  'Sports & Fitness': markRaw(Dumbbell),
  'Beauty & Personal Care': markRaw(Sparkles),
  'Services': markRaw(Wrench),
  'Other': markRaw(LayoutGrid),
}

export function getCategoryIcon(categoryName) {
  return categoryIconMap[categoryName] || categoryIconMap['Other']
}