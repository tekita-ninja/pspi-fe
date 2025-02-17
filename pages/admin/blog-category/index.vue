<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Blog Category" subtitle="List Of Blog Categories">
    <template #actions>
      <FeaturesBlogCategoryDialogForm />
    </template>
    <FeaturesBlogCategoryTable />
  </ContainersPage>
</template>