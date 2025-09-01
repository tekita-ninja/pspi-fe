<script setup lang="ts">
import { useProductStore } from '@/app/stores/useProductStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';

onMounted(() => initialData())
const common = useCommonStore()
const controller = useProductStore()
const options = ref<ServerOptions>(common.$state.params);
function initialData() {
  common.changeParams({
    ...common.$state.params,
    status: undefined,
    
  });
  controller.get(toQueryParams({
    ...common.$state.params,
    status: undefined,
    
  }))
}
watch(options, async (value) => {
  common.changeParams(value);
  initialData();
});

function handleChangeStatus(state: boolean, item: Item) {
  controller.update({ status: state }, item.id)
}
</script>
<template>
  <div>
    <EasyDataTable v-bind="{ ...TableProps }" v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
      :loading="controller.loading" :items="controller.results.data">
      <template #item-status="item">
        <div class="flex items-center space-x-2">
          <UiSwitch @update:checked="(e) => handleChangeStatus(e, item)" :id="item.id" :checked="item.status" />
          <UiLabel class="cursor-pointer" :for="item.id">{{ item.status ? 'Active' : 'Inactive' }}</UiLabel>
        </div>
      </template>
      <template #item-prices="item">
        <div class="flex items-center gap-2 flex-1">
          <p class="font-bold"> {{ item.prices.length }} </p>
          <p class="text-xs">{{ item.prices.length > 0 ? "Area Prices" : 'Area Price' }}</p>
        </div>
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <UiButton size="sm" as-child>
            <NuxtLink :href="`/admin/products/${item.id}/create`">
              <Icon name="mdi:plus" class="mr-1" /> Price
            </NuxtLink>
          </UiButton>
          <FeaturesProductsDialogDelete :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>