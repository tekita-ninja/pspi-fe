<script setup lang="ts">
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';
import { cn } from '@/lib/utils';
import type { ServerOptions } from 'vue3-easy-data-table';
import { columns } from './colums';
onMounted(() => initialData())
const router = useRouter()
const common = useCommonStore()
const controller = useDeliveryStore()
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
    <div class="py-2 flex justify-end gap-2">
      <FeaturesDeliveryFormSearch />
      <FeaturesDeliveryDialogFilter />
    </div>
    <EasyDataTable v-bind="{ ...TableProps }" v-model:server-options="options"
      v-model:server-items-length="controller.results.meta.total" v-if="controller.results.data" :headers="columns"
      :loading="controller.loading" :items="controller.results.data">
      <template #item-code="item">
        <div>
          <div>{{ item?.code }}</div>
          <div v-if="$dayjs().diff($dayjs(item.createdAt), 'day') > 14" class="text-[10px] font-bold text-destructive">
            Expired Code
          </div>
          <div v-else class="text-xs font-semibold">Age: {{ $dayjs().diff($dayjs(item.createdAt), 'day') }} days</div>
        </div>
      </template>
      <template #item-armada="item">
        <div>
          <div class="flex">
            <div class="w-20 shrink-0">Driver</div>
            <div class="flex-1">: {{ item.driver?.name }}</div>
          </div>
          <div class="flex">
            <div class="w-20 shrink-0">Arrive</div>
            <div class="flex-1">: {{ item?.armada?.merk }} - {{ item?.armada?.nopol }}</div>
          </div>
        </div>
      </template>
      <template #item-date="item">
        <div>
          <div class="flex">
            <div class="w-20 shrink-0">START</div>
            <div class="flex-1">: {{ $dayjs(item.startDate).format('DD MMM YYYY HH:mm:ss') }}</div>
          </div>
          <div class="flex">
            <div class="w-20 shrink-0">END</div>
            <div class="flex-1">: {{ item.endDate ? $dayjs(item.endDate).format('DD MMMM YYYY') : "-" }}</div>
          </div>
        </div>
      </template>
      <template #item-statusPengiriman="{ statusPengiriman }">
        <div :class="cn(
          'max-w-max text-[10px] font-bold uppercase',
          statusPengiriman === 0 && 'text-orange-300',
          statusPengiriman === 1 && 'text-blue-300',
          statusPengiriman === 3 && 'text-green-300',
        )">
          {{ statusPengiriman === 0 ? 'Pending' : '' }}
          {{ statusPengiriman === 1 ? 'On Deliver' : '' }}
          {{ statusPengiriman === 3 ? 'Delivered' : '' }}
        </div>
      </template>
      <template #item-actions="item">
        <div class="flex gap-1">
          <UiButton variant="outline" :item="item" size="icon-sm"
            @click="router.push(`/admin/delivery/detail/${item.id}`)" class="flex gap-1">
            <Icon class="w-4 h-4" name="fontisto:info" />
          </UiButton>
          <FeaturesDeliveryDialogStart v-if="item.statusPengiriman === 0" :item="item" />
          <UiButton v-if="item.statusPengiriman === 0" :item="item" size="sm"
            @click="router.push(`/admin/delivery/edit/${item.id}`)" class="flex gap-1">
            <Icon class="w-4 h-4" name="material-symbols:edit" /> Edit
          </UiButton>
          <FeaturesDeliveryDialogDelete v-if="item.statusPengiriman === 0" :item="item" />
          <UiButton v-if="item.statusPengiriman === 1" variant="outline" size="sm"
            @click="router.push(`/admin/delivery/set-delivered/${item.id}`)" class="flex gap-1">
            <Icon class="w-4 h-4" name="icon-park-outline:delivery" /> Set Delivered
          </UiButton>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>