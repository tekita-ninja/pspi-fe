<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Utility" subtitle="Form Setting Utility Website">
    <FeaturesUtilityForm />
  </ContainersPage>
</template>