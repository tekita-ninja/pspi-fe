<script setup lang="ts">
const dialog = ref(false)
dialog.value = true
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogContent class="max-w-2xl p-0 bg-transparent m-0 overflow-hidden">
      <img class="h-full w-full object-contain" src="/images/announcement.png" alt="announcement" />
    </UiDialogContent>
  </UiDialog>
</template>