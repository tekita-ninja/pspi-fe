<script setup lang="ts">
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';

definePageMeta({
    layout: "admin",
    middleware: "auth",
});
const router = useRouter();
const controller = useDeliveryStore()

async function handleDownload() {
  const response = await controller.downloadExcel()
  window.open(`${import.meta.env.VITE_BASE_URL}/uploads/${response.path}`)
}
</script>
<template>
    <ContainersPage title="Delivery" subtitle="List Of Delivery">
        <template #actions>
            <div class="flex gap-2">
                <UiButton
                    @click="router.push('/admin/delivery/form')"
                    class="flex gap-1"
                >
                    <Icon class="w-5 h-5" name="material-symbols:add" /> New
                </UiButton>
                <UiButton @click="handleDownload" :disabled="controller.loading">
                  Download Excel
                </UiButton>
            </div>
        </template>
        <FeaturesDeliveryTable />
    </ContainersPage>
</template>
