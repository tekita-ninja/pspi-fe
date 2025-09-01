<script setup lang="ts">
defineProps<{
  icon: string
  title: string
}>()
</script>
<template>
  <div
    class="flex flex-col w-28 md:min-w-96 items-center sm:justify-center bg-white  text-[#599AC8] rounded-xl gap-5 sm:gap-2">
    <Icon class=" h-24 w-24 sm:w-32 sm:h-32 md:w-64 md:h-64 shrink-0 mx-auto" :name="icon" />
    <div class="text-center">
      <p class="text-sm sm:text-lg md:text-xl spartan max-w-56 font-semibold left-3">{{ title }}</p>
    </div>
  </div>
</template>