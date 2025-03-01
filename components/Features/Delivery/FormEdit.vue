<script setup lang="ts">
import type { TArmadaItem } from '@/app/models/ArmadaModel';
import type { TDriverItem } from '@/app/models/DriverModel';
import { useArmadaStore } from '@/app/stores/useArmadaStore';
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';
import { useDriverStore } from '@/app/stores/useDriverStore';
import { fromDeliverySchema } from '@/app/validations/delivery';
const router = useRouter()
const route = useRoute()
const driverController = useDriverStore()
const armadaController = useArmadaStore()
const deliveryController = useDeliveryStore()
const controller = useDeliveryStore()

const deliveryId = route.params.id

await deliveryController.getById(+deliveryId)
await armadaController.getAll()
await driverController.getAll()

const form = useForm({
  validationSchema: fromDeliverySchema
})

const onSubmit = form.handleSubmit(async (values) => {
  const newData = {
    ...values,
    startDate: new Date(),
    statusPengiriman: 0
  }
  await controller.update(newData, +deliveryId)
  router.push('/admin/delivery')
})
const armadaSelected = ref<TArmadaItem>(armadaController.lists.find(i=> i.id === deliveryController.detail.armadaId)!)
const driverSelected = ref<TDriverItem>(driverController.lists.find(i => i.id == deliveryController.detail.driverId)!)
function handleChangeArmada(e: string) {
  armadaSelected.value = armadaController.lists.find(i => i.id === +e)!
  driverSelected.value = driverController.lists.find(i => i.id == armadaSelected.value?.defaultDriverId)!
}
function handleChangeDriver(e: string) {
  driverSelected.value = driverController.lists.find(i => i.id === +e)!
}
</script>
<template>
  <form @submit="onSubmit">
    <div class="space-y-3">
      <div class="grid md:grid-cols-2 gap-3">
        <div>
          <UiFormField v-slot="{ componentField }" name="armadaId"
            :model-value="`${deliveryController.detail.armadaId}`">
            <UiFormItem>
              <UiFormLabel>Select Armada</UiFormLabel>
              <UiFormControl>
                <UiSelect v-bind="componentField" @update:model-value="handleChangeArmada">
                  <UiSelectTrigger>
                    <UiSelectValue placeholder="Select Armada" />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectLabel>armada</UiSelectLabel>
                      <UiSelectItem v-for="item in armadaController.lists" :key="item.id" :value="`${item.id}`">
                        {{ item.merk + "-" + item.nopol }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <div v-if="armadaSelected" class="my-3 p-3 border rounded-lg">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <img class="rounded-md border" :src="toAssetLink(armadaSelected?.image_front)" alt="">
              <img class="rounded-md border" :src="toAssetLink(armadaSelected?.image_back)" alt="">
              <img class="rounded-md border" :src="toAssetLink(armadaSelected?.image_left)" alt="">
              <img class="rounded-md border" :src="toAssetLink(armadaSelected?.image_right)" alt="">
            </div>
            <div class="flex">
              <div class="w-32 shrink-0 text-sm">MERK</div>
              <div class="flex-1 text-sm font-bold"> : {{ armadaSelected.merk }}</div>
            </div>
            <div class="flex">
              <div class="w-32 shrink-0 text-sm">NOPOL</div>
              <div class="flex-1 text-sm font-bold"> : {{ armadaSelected.nopol }}</div>
            </div>
            <div class="flex">
              <div class="w-32 shrink-0 text-sm">QUANTITY</div>
              <div class="flex-1 text-sm font-bold"> : {{ armadaSelected.quantity }}</div>
            </div>
            <div class="flex">
              <div class="w-32 shrink-0 text-sm">KOMPARTEMENT</div>
              <div class="flex-1 text-sm font-bold"> : {{ armadaSelected.kompartment }}</div>
            </div>
            <a class="text-sm font-bold text-blue-500" :href="toAssetLink(armadaSelected.terra_doc)" target="_blank"
              rel="noopener noreferrer">View Document</a>
          </div>
        </div>
        <div>
          <UiFormField v-slot="{ componentField }" name="driverId" :model-value="`${driverSelected?.id}`">
            <UiFormItem>
              <UiFormLabel>Select Driver</UiFormLabel>
              <UiFormControl>
                <UiSelect v-bind="componentField" :model-value="`${deliveryController.detail.driverId}`"
                  @update:model-value="handleChangeDriver" :default-value="`${driverSelected?.id}`">
                  <UiSelectTrigger>
                    <UiSelectValue placeholder="Select Driver" />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectLabel>select driver</UiSelectLabel>
                      <UiSelectItem v-for="item in driverController.lists" :key="item.id" :value="`${item.id}`">
                        {{ item.name }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <div v-if="driverSelected" class=" my-3 border rounded-md p-3">
            <div class="gap-3 items-center">
              <div class="aspect-[3/4] w-32 mx-auto mb-4">
                <img class="rounded-md w-full h-full border object-contain" :src="toAssetLink(driverSelected?.image)"
                  alt="">
              </div>
              <div class="flex-1">
                <div class="flex">
                  <div class="w-32 shrink-0 text-sm">NAME</div>
                  <div class="flex-1 text-sm font-bold"> : {{ driverSelected.name }}</div>
                </div>
                <div class="flex">
                  <div class="w-32 shrink-0 text-sm">PHONE</div>
                  <div class="flex-1 text-sm font-bold"> : {{ driverSelected.phone }}</div>
                </div>
                <div class="flex">
                  <div class="w-32 shrink-0 text-sm">EMAIL</div>
                  <div class="flex-1 text-sm font-bold"> : {{ driverSelected.email || "-" }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <UiFormField v-slot="{ componentField }" name="phone" :model-value="deliveryController.detail.phone">
          <UiFormItem>
            <UiFormLabel>Phone</UiFormLabel>
            <UiFormControl>
              <UiInput type="tel" placeholder="phone..." v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="tujuan" :model-value="deliveryController.detail.tujuan">
          <UiFormItem>
            <UiFormLabel>DESTINATION</UiFormLabel>
            <UiFormControl>
              <UiTextarea rows="5" placeholder="Destination Address..." v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
    </div>
    <div class="flex justify-end mt-3 gap-2">
      <UiButton @click="router.push('/admin/delivery')" variant="outline" type="button">
        Cancel
      </UiButton>
      <UiButton :disabled="controller.isSubmitting" type="submit">
        Submit
      </UiButton>
    </div>
  </form>
</template>