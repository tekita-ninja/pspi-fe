<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
const router = useRouter()
</script>
<template>
  <ContainersPage title="Armada" subtitle="List Of Armada">
    <template #actions>
      <div class="flex gap-2">
        <UiButton @click="router.push('/admin/armada/form')" class="flex gap-1">
          <Icon class="w-5 h-5" name="material-symbols:add" /> New
        </UiButton>
      </div>
    </template>
    <FeaturesArmadaTable />
  </ContainersPage>
</template>