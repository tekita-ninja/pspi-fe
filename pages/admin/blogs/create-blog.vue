<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>

<template>
  <ContainersPage title="Blog" subtitle="Form content blog">
    <FeaturesBlogsFormCreate />
  </ContainersPage>
</template>