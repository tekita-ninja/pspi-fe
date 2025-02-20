<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
<template>
  <ContainersPage title="Delivery" subtitle="Form Edit Delivery">
    <div>
      <FeaturesDeliveryFormEdit />
    </div>
  </ContainersPage>
</template>