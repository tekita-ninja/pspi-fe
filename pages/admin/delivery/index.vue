<script setup lang="ts">

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
const router = useRouter()
</script>
<template>
  <ContainersPage title="Delivery" subtitle="List Of Delivery">
    <template #actions>
      <div class="flex gap-2">
        <UiButton @click="router.push('/admin/delivery/form')" class="flex gap-1">
          <Icon class="w-5 h-5" name="material-symbols:add" /> New
        </UiButton>
      </div>
    </template>
    <FeaturesDeliveryTable />
  </ContainersPage>
</template>