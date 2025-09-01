<script setup lang="ts">
import { useBlogStore } from '@/app/stores/useBlogStore';
import { useProductStore } from '@/app/stores/useProductStore';

definePageMeta({
  layout: 'admin',
  middleware:'auth'
})

const product = useProductStore()
const publication = useBlogStore()

await product.get({perPage:1})
await publication.get({perPage:1})
</script>
<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      <button @click="navigateTo('/admin/blogs?page=1&rowsPerPage=10')" class="p-3 rounded-2xl bg-white shadow">
        <div class="flex items-center">
          <div class="flex flex-1 w-full flex-col items-start">
            <h2 class="font-bold text-2xl">{{ publication.results.meta.total || 0 }}</h2>
            <p class="text-sm">Publications</p>
          </div>
          <div class="w-10">
            <div class="h-8 w-8 border rounded-xl bg-black text-white flex items-center justify-center">
              <Icon name="fluent:news-20-regular" />
            </div>
          </div>
        </div>
      </button>
      <button @click="navigateTo('/admin/products?page=1&rowsPerPage=10')" class="p-3 rounded-2xl bg-white shadow">
        <div class="flex items-center">
          <div class="flex flex-1 w-full flex-col items-start">
            <h2 class="font-bold text-2xl">{{ product.results.meta.total || 0 }}</h2>
            <p class="text-sm">Products</p>
          </div>
          <div class="w-10">
            <div class="h-8 w-8 border rounded-xl bg-black text-white flex items-center justify-center">
              <Icon name="solar:tag-price-linear" />
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>