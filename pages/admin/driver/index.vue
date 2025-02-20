<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Driver" subtitle="List Of Driver">
    <template #actions>
      <div class="flex gap-2">
        <FeaturesDriversDialogForm />
      </div>
    </template>
    <FeaturesDriversTable />
  </ContainersPage>
</template>