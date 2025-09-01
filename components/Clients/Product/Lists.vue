<script setup lang="ts">
import { useProductStore } from "@/app/stores/useProductStore";
const controller = useProductStore()
await controller.getClientProduct()
</script>
<template>
  <section class="bg-orange-primary py-8 md:py-16">
    <div class="relative mx-container pb-6 space-y-5 md:space-y-10">
      <div class="space-y-5 md:space-y-10">
        <div>
          <h1 class="koulen font-normal text-large-client text-white">
            HARGA PRODUK
          </h1>
        </div>
        <div class="border-[#E7E7E7] border">
            <div class="overflow-auto rounded-2xl">
            <table class="w-full rounded-2xl text-xs md:text-base shadow-xl">
                <!-- Header -->
                <thead>
                <tr>
                    <th colspan="2" class="px-4 py-2 text-white border-b border-r border-[#E7E7E7] bg-orange-light">
                    {{ controller.client_product?.header?.name }}
                    </th>
                    <th v-for="(price, priceIndex) in controller.client_product?.header?.price" :key="priceIndex"
                    class="px-4 py-2 text-white border-b border-[#E7E7E7] bg-orange-light"
                    :class="priceIndex == 3 ? 'border-0' : 'border-r'">
                    {{ price?.title }} <br>
                    {{ price?.sub_title }}
                    </th>
                </tr>
                </thead>

                <!-- Body -->
                <tbody>
                <tr v-for="(row, rowIndex) in controller.client_product?.data" :key="rowIndex" class=""
                    :class="rowIndex == 0 || rowIndex % 2 == 0 ? 'bg-orange-light' : 'bg-orange-primary'">
                    <td class="px-4 py-2 text-white font-medium border-r border-[#E7E7E7]">
                    {{ row?.name }}
                    </td>
                    <td class="px-4 py-2 text-white text-center border-r border-[#E7E7E7]">
                    <span class="font-medium ">IDR/{{ row?.unit }}</span> <br>
                    <span class="font-normal">USD/{{ row?.unit }}</span>
                    </td>
                    <td v-for="(price, priceIndex) in row?.prices" :key="priceIndex"
                    class="px-4 py-2 text-white text-center border-[#E7E7E7]"
                    :class="priceIndex == 3 ? 'border-0' : 'border-r'">
                    
                    {{ console.log(priceIndex) }}
                    <span class="font-medium ">{{ toPriceIDR(price?.idr) }}</span> <br>
                    <span class="font-normal">{{ toPriceUsd(price?.usd) }}</span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
table {
  border: none;
}
</style>