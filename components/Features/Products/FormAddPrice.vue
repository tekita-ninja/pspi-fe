<script setup lang="ts">
import { useProductStore } from '@/app/stores/useProductStore';
import { toast } from 'vue-sonner';
type PriceItem = {
  title: string
  sub_title: string
  usd: string | number
  idr: string | number
}
const router = useRouter()
const contoller = useProductStore()
const productPrices = ref<PriceItem[]>([])
productPrices.value = contoller.detail.prices.length > 0 ? contoller.detail.prices.map(item => {
  return {
    title: item.title,
    sub_title: item.sub_title,
    usd: item.usd,
    idr: item.idr.toString(),
  }
}) : [1, 2, 3, 4].map(item => {
  return {
    title: 'WIL',
    sub_title: `HARGA ${item}`,
    usd: '',
    idr: '',
  }
})
function removeItem(index: number) {
  productPrices.value = [...productPrices.value].filter((_, i) => i !== index)
}

function handleAddRow() {
  productPrices.value = [...productPrices.value, {
    title: "WIL",
    sub_title: `HARGA ${productPrices.value.length + 1 || '1'}`,
    usd: '',
    idr: '',
  }]
}

function handleSendData() {
  let isAnyError = false;
  [...productPrices.value].map(item => {
    if (!item.idr || !item.usd || !item.title || !item.sub_title) {
      isAnyError = true
      return
    }
  })
  if (isAnyError) {
    toast.error("Error Validation", {
      description: 'Please complete all forms!'
    })
    return
  }
  isAnyError = false;
  const dataForSend = productPrices.value.map(item => {
    return {
      product_id: contoller.detail.id,
      title: item.title,
      sub_title: item.sub_title,
      usd: parseFloat(item.usd.toString().split(',').join('')),
      idr: parseInt(item.idr.toString().split('.').join('')),
    }
  })
  contoller.createManyPrice(dataForSend)
}

function onFocus(event: any) {
  event.target.select();
}
</script>
<template>
  <div>
    <table class="w-full">
      <thead>
        <tr class="text-white">
          <th class="bg-black text-start p-2 border w-[20%]">Title</th>
          <th class="bg-black text-start p-2 border">Tubtitle</th>
          <th class="bg-black text-start p-2 border">Price IDR</th>
          <th class="bg-black text-start p-2 border">Price USD</th>
          <th class="bg-black text-start p-2 border w-[5%]">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(price, index) in productPrices" :key="index">
          <td class="text-center bg-slate-50 border">
            <input @focus="onFocus" v-model="price.title" type="text" class="w-full outline-none py-1 px-2">
          </td>
          <td class="text-center bg-slate-50 border">
            <input @focus="onFocus" v-model="price.sub_title" type="text" class="w-full outline-none py-1 px-2">
          </td>
          <td class="text-center bg-slate-50 border">
            <div class="flex items-center px-2 gap-1">
              <p class="text-slate-700">Rp</p>
              <input @focus="onFocus" placeholder="1.000.000" data-maska-tokens="9:[0-9]:repeated" data-maska-reversed
                v-maska data-maska="9.99#.###" v-model="price.idr" type="text" class="w-full outline-none py-1">
            </div>
          </td>
          <td class="text-center bg-slate-50 border">
            <div class="flex items-center px-2 gap-1">
              <p class="text-slate-700">$</p>
              <input @focus="onFocus" data-maska-tokens="9:[0-9]:repeated" data-maska-reversed v-maska
                data-maska="9,99#.##" placeholder="1,000.00" v-model="price.usd" type="text"
                class="w-full outline-none py-1">
            </div>
          </td>

          <td class="text-center bg-slate-50 border text-red-500">
            <button class="w-full" @click="removeItem(index)">
              <Icon name="mdi:times" />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="border  bg-blue-300/20 text-blue-500 hover:bg-blue-300/50 duration-300">
          <td colspan="5" class="px-2 py-1">
            <button class="w-full" @click="handleAddRow">
              <Icon name="mdi:plus" />
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="flex justify-end mt-2 gap-2">
      <UiButton variant="outline" @click="router.back()">Back</UiButton>
      <UiButton @click="handleSendData">Save Change</UiButton>
    </div>
  </div>
</template>