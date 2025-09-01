<script setup lang="ts">
import type { ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
import { useBlogCategoryStore } from '@/app/stores/useBlogCategoryStore';

onMounted(() => initialData())

const common = useCommonStore()
const controller = useBlogCategoryStore()
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
      <template #item-actions="item">
        <div class="flex gap-1 justify-end">
          <FeaturesBlogCategoryDialogForm :item="item" />
          <FeaturesBlogCategoryDialogDelete :item="item" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>