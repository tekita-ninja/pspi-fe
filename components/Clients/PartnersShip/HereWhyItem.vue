<script setup lang="ts">
defineProps<{
  data: {
    src:string
    title:string
  }}>()
</script>
<template>
  <div class="w-1/2 md:w-1/3 flex flex-col items-center">
    <div class="h-[90px] md:h-[200px] aspect-square p-0 md:p-2">
      <img :src="data.src" alt="Icon" class="h-full w-full">
    </div>
    <p class="spartan md:max-w-[260px] font-normal text-sm md:text-xl text-center">
      {{ data.title }}
    </p>
  </div>
</template>