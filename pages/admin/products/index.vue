<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Product" subtitle="List Of Product">
    <template #actions>
      <div class="flex gap-2">
        <FeaturesProductsDialogForm />
      </div>
    </template>
    <FeaturesProductsTable />
  </ContainersPage>
</template>