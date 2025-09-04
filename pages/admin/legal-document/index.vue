<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Legal Document" subtitle="List Of Legal Document">
    <template #actions>
      <FeaturesLegalDocumentDialogForm />
    </template>
    <FeaturesLegalDocumentTable />
  </ContainersPage>
</template>