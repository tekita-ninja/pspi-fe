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
  <div data-aos="fade-up" data-aos-duration="1000" class="flex flex-col gap-2 md:gap-4 rounded-xl md:p-4 items-center">
    <div class="text-center space-y-2 md:space-y-4">
      <h6 class="krona-one text-lg md:text-xl text-orange-primary">
        {{ data.title }}
      </h6>
      <p class="spartan text-lg md:text-xl font-light md:leading-[2.2] text-orange-primary">
        {{ data.description }}
      </p>
    </div>
  </div>
</template>