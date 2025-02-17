<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="User" subtitle="List User">
    <template #actions>
      <FeaturesUserDialogForm />
    </template>
    <FeaturesUserTable />
  </ContainersPage>
</template>