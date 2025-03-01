<script setup lang="ts">
import { useBlogStore } from '@/app/stores/useBlogStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';

onMounted(() => initialData())

const dayjs = useDayjs()
const common = useCommonStore()
const controller = useBlogStore()
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
  const date = state ? dayjs().format('YYYY-MM-DD') : null
  controller.update({
    publishedAt: date
  },
    item.id)
}
</script>
<template>
  <div>
    <EasyDataTable v-bind="{ ...TableProps }" v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
      :loading="controller.loading" :items="controller.results.data">
      <template #item-image="item">
        <ImageView :src="item.image" />
      </template>
      <template #item-title="item">
        <div>
          <p class="text-sm line-clamp-2 text-slate-600">{{ item?.title }}</p>
        </div>
      </template>
      <template #item-created_by="item">
        <div>
          <p>{{ item?.created_by?.name }}</p>
          <p class="text-xs text-slate-600">{{ item?.created_by?.username }}</p>
        </div>
      </template>
      <template #item-publishedAt="item">
        <div class="text-xs">
          {{ item.publishedAt ? $dayjs(item.publishedAt).format('DD MMMM YYYY') : '-' }}
        </div>
      </template>
      <template #item-status="item">
        <div class="flex items-center space-x-2">
          <UiSwitch @update:checked="(e: any) => handleChangeStatus(e, item)" :id="item.id"
            :checked="!!item.publishedAt" />
          <UiLabel class="cursor-pointer" :for="item.id">{{ item.publishedAt ? 'Active' : 'Inactive' }}</UiLabel>
        </div>
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <FeaturesBlogsDialogDelete :item="item" />
          <UiButton variant="default" size="icon-sm" as-child>
            <NuxtLink :href="`/admin/blogs/${item.id}`">
              <Icon name="fontisto:info" />
            </NuxtLink>
          </UiButton>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>