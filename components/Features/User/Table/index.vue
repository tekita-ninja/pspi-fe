<script setup lang="ts">
import { useUserStore } from '@/app/stores/useUserStore';
import type { Item, ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { useProfileStore } from '@/app/stores/useProfileStore';

onMounted(() => initialData())

const common = useCommonStore()
const profile = useProfileStore()
const controller = useUserStore()
const role = useAuthStore()

const options = ref<ServerOptions>(common.$state.params);
function initialData() {
  common.changeParams({
    ...common.$state.params,
    status: undefined,
    
  });
  role.getOwnRole()
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
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.meta" :headers="columns"
      :loading="controller.loading" :items="controller.results.data">
      <template #item-actions="item">
        <div class="flex items-center gap-1">
          <div class="flex items-center gap-1" v-if="profile.profile.role === 'SUPER'">
            <FeaturesUserDialogPassword v-if="item.id === profile.profile.sub" :item="item" />
            <FeaturesUserDialogFormEdit v-if="item.id === profile.profile.sub" :item="item" />
          </div>
          <div v-else>
            <UiButton size="icon-sm" variant="destructive" disabled>
              <Icon name="tabler:trash" />
            </UiButton>
          </div>
          <div v-if="item.role !== 'SUPER' && profile.profile.role === 'SUPER'" class="flex items-center gap-1">
            <FeaturesUserDialogPassword :item="item" />
            <FeaturesUserDialogFormEdit :item="item" />
          </div>
          <FeaturesUserDialogDelete v-if="item.role !== 'SUPER'" :item="item" />
        </div>
      </template>
      <template #item-status="item">
        <div class="flex items-center gap-1">
          <div class="flex items-center space-x-2" v-if="item.role === 'ADMIN' || item.id === profile.profile.sub">
            <UiSwitch @update:checked="(e) => handleChangeStatus(e, item)" :id="item.id" :checked="item.status" />
            <UiLabel class="cursor-pointer" :for="item.id">{{ item.status ? 'Active' : 'Inactive' }}</UiLabel>
          </div>
          <div class="flex items-center space-x-2" v-else>
            <UiSwitch disabled :id="item.id" :checked="item.status" />
            <UiLabel class="cursor-pointer" :for="item.id">{{ item.status ? 'Active' : 'Inactive' }}</UiLabel>
          </div>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>