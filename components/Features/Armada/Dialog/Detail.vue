<script setup lang="ts">
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item?: Item }>()
const dialog = ref(false)
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <button>
        <img class="w-10 h-10 rounded-md cursor-pointer" :src="toAssetLink(item?.image_front)" alt="image">
      </button>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-xl">
      <UiDialogHeader>
        <UiDialogTitle>Image & Document</UiDialogTitle>
      </UiDialogHeader>
      <div>
        <div class="mb-3" v-if="item?.terra_doc">
          <a class="text-blue-600 underline text-sm font-bold" target="_blank" :href="toAssetLink(item?.terra_doc)">View Document</a>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="h-full w-full" v-if="item?.image_front">
            <p>FONT</p>
            <ImageView class-thumb="aspect-square" :src="item?.image_front" />
          </div>
          <div class="h-full w-full" v-if="item?.image_back">
            <p>BACK</p>
            <ImageView class-thumb="aspect-square" :src="item?.image_back" />
          </div>
          <div class="h-full w-full" v-if="item?.image_right">
            <p>RIGHT</p>
            <ImageView class-thumb="aspect-square" :src="item?.image_right" />
          </div>
          <div class="h-full w-full" v-if="item?.image_left">
            <p>LEFT</p>
            <ImageView class-thumb="aspect-square" :src="item?.image_left" />
          </div>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>