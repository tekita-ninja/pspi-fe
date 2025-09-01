<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Product" subtitle="Form Multiple Product">
    <FeaturesProductsFormCreateMany />
  </ContainersPage>
</template>