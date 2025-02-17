<script setup lang="ts">
defineProps<{
    title: string
  subtitle?: string
  isLoading?:boolean
  }>()
</script>
<template>
  <div class="bg-white p-3 my-2 rounded-xl relative">
    <div v-if="isLoading" class="absolute left-0 right-0 bottom-0 top-0 bg-white/10 backdrop-blur-sm z-30 flex justify-center pt-[25vh]">
      <div class="h-10 w-10 bg-black flex items-center justify-center rounded-lg">
        <Icon name="icon-park-outline:loading" class="h-7 w-7 text-white animate-spin" />
      </div>
    </div>
    <header class="flex justify-between border-b pb-2 mb-1">
      <div class="flex-1">
        <h2 class="text-xl capitalize">{{ title }}</h2>
        <p class="text-sm text-slate-500">{{ subtitle }}</p>
      </div>
      <div class="flex-1 flex items-center justify-end flex-wrap">
        <slot name='actions' />
      </div>
    </header>
    <slot />
  </div>
</template>