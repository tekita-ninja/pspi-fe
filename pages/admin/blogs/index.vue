<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Blog" subtitle="List Of Blogs">
    <template #actions>
      <UiButton as-child>
        <NuxtLink :href="`/admin/blogs/create-blog`">
          <Icon name="mdi:plus" />
          CREATE
        </NuxtLink>
      </UiButton>
    </template>
    <FeaturesBlogsTable />
  </ContainersPage>
</template>