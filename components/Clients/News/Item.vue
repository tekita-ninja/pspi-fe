<script setup lang="ts">
import dayjs from "dayjs";
import type { TBlogItem } from '@/app/models/BlogModel';
const formattedDate = (date?: string) => {
  return date ? dayjs(date).format("DD MMM YYYY") : '';
};
defineProps<{
  item: TBlogItem
  }>()
</script>
<template>
  <nuxt-link :to="`/publication/${item?.slug}`" class="shadow-md overflow-hidden bg-slate-100 group block">
    <div class="aspect-square overflow-hidden relative">
      <img :src="toAssetLink(item.image)" :alt="item.slug"
        class="w-full h-full object-cover group-hover:scale-110 duration-200" />
    </div>
    <div class="flex flex-col  justify-center bg-white p-2 md:p-3 lg:p-6 space-y-2 text-orange-primary">
      <p class="spartan font-normal text-md">
          {{ formattedDate(item?.publishedAt!) }}
        </p>
      <h6 class="spartan font-semibold text-xl line-clamp-2">
        {{ item?.title || "Lorem ipsum dolor sit amet." }}
      </h6>
      <p class="spartan leading-7 tracking-[1.5px] font-normal text-base md:text-md  line-clamp-3 w-full break-all">
        {{
        item?.body ||
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus unde quia soluta facere omnis inventore"
        }}
      </p>
    </div>
  </nuxt-link>
</template>

<style scoped>
p{
  white-space: "pre-wrap";
}
</style>