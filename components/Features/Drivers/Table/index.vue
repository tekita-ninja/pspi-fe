<script setup lang="ts">
import { useDriverStore } from '@/app/stores/useDriverStore';
import type { ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';

onMounted(() => initialData())
const common = useCommonStore()
const controller = useDriverStore()
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

</script>
<template>
  <div>
    <EasyDataTable v-bind="{ ...TableProps }" v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
      :loading="controller.loading" :items="controller.results.data">
      <template #item-image="item">
        <ImageView :src="item.image" />
      </template>
      <template #item-type="{type}">
        <div v-if="type===1">Driver</div>
        <div v-if="type===2">Co Driver</div>
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <FeaturesDriversDialogDelete :item="item" />
          <FeaturesDriversDialogForm :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>