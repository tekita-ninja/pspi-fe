<script setup lang="ts">
import { useProductStore } from '@/app/stores/useProductStore';

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
const contoller = useProductStore()
const route = useRoute()
await contoller.getDetail(+route.params.id);
</script>
<template>
  <div class="bg-blue-500/10 text-blue-500 p-3 rounded-lg mx-1">
    <p class="text-xs font-semibold">
      For dollar prices you must have 2 numbers after the dot, if there are none then give .00 (example 1,000.99 or
      1,000.00)
    </p>
  </div>
  <ContainersPage title="Product" :subtitle="`Add Price : ${contoller.detail.name}` || 'Form Multiple Product'">
    <FeaturesProductsFormAddPrice />
  </ContainersPage>
</template>