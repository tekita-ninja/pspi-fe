<script setup lang="ts">
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item: Item }>()
const controller = useDeliveryStore()
async function handleStartDelivery(){
  controller.changeStatus({ id: props.item.id, statusPengiriman: 1 })
}
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <UiButton size="sm" variant="default">
        <Icon name="material-symbols:delivery-truck-speed" class="mr-1" /> Start
      </UiButton>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Confirmation</UiAlertDialogTitle>
        <UiAlertDialogDescription class="text-orange-500 font-semibold">
          Make sure the driver has left to deliver the order. The process cannot be cancelled
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
        <UiAlertDialogAction @click="handleStartDelivery" class="">Start Now</UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>