<script setup lang="ts">
import { useArmadaStore } from '@/app/stores/useArmadaStore';
import type { ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';

onMounted(() => initialData())
const router = useRouter()
const common = useCommonStore()
const controller = useArmadaStore()
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
        <FeaturesArmadaDialogDetail :item="item" />
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <FeaturesArmadaDialogDelete :item="item" />
          <UiButton size="sm" @click="router.push(`/admin/armada/edit/${item.id}`)" class="flex gap-1">
            <Icon class="w-4 h-4" name="material-symbols:edit" /> Edit
          </UiButton>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>