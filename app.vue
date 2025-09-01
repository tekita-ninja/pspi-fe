
<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
</script>
<template>
  <div>
    <Toaster richColors />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
