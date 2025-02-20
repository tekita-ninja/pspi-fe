<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Delivery" subtitle="Create New Delivery">
    <div>
      <FeaturesDeliveryFormCreate />
    </div>
  </ContainersPage>
</template>