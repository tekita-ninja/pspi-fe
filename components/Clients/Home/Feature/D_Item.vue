<script setup lang="ts">
defineProps<{
  data: {
    title: string
    description: string
    image: string
  }
}>()
</script>
<template>
  <div data-aos="fade-up" data-aos-duration="1000" class="flex flex-col gap-2 md:gap-4 lg:bg-white rounded-xl md:p-4 items-center">
    <div class="w-24 h-24 md:w-44 md:h-44">
      <img :src="data.image" alt="Image" class="h-full w-full object-contain" />
    </div>
    <div class="text-center space-y-2 md:space-y-4">
      <h6 class="krona-one text-lg md:text-xl text-orange-primary">
        {{ data.title }}
      </h6>
      <p class="spartan text-lg md:text-xl font-normal text-navy-primary">
        {{ data.description }}
      </p>
    </div>
  </div>
</template>