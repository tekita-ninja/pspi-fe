<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Delivery" subtitle="Form Set Delivery">
    <div>
      <FeaturesDeliveryFormDelivered />
    </div>
  </ContainersPage>
</template>