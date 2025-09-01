<template>
    <div class="flex items-center justify-center mt-4">
      <button
        class="flex items-center justify-center px-4 py-2 border rounded-l-md text-white bg-orange-primary hover:bg-orange-400 disabled:opacity-20"
        :disabled="currentPage === 1"
        @click="$emit('page-change', currentPage - 1)"
      >
      <Icon name="tabler:chevron-left" class="text-xl" />
      </button>
      <span class="px-4 py-2 border-t border-b">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        class="flex items-center justify-center px-4 py-2 border rounded-r-md text-white bg-orange-primary hover:bg-orange-400 disabled:opacity-20"
        :disabled="currentPage === totalPages"
        @click="$emit('page-change', currentPage + 1)"
      >
        <Icon name="tabler:chevron-right"  class="text-xl"/>
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
    },
  });
  </script>
  