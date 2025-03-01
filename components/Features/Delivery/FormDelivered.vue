<script setup lang="ts">
import type { TArmadaItem } from '@/app/models/ArmadaModel';
import type { TDriverItem } from '@/app/models/DriverModel';
import { useArmadaStore } from '@/app/stores/useArmadaStore';
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';
import { useDriverStore } from '@/app/stores/useDriverStore';
import { useUploadStore } from '@/app/stores/useUploadStore';
import { toast } from 'vue-sonner';
const router = useRouter()
const route = useRoute()
const driverController = useDriverStore()
const armadaController = useArmadaStore()
const deliveryController = useDeliveryStore()
const controller = useDeliveryStore()

const deliveryId = route.params.id
const images = ref()
const uploadController = useUploadStore()
await deliveryController.getById(+deliveryId)
await armadaController.getAll()
await driverController.getAll()

async function setDelivedOrder() {
  if (images.value && images.value.length > 0) {
    const promises = []
    for (let i = 0; i < images.value.length; i++) {
      const item = images.value[i];
      promises.push(uploadController.uploadFile(item.file))
    }
    const response = await Promise.all(promises);
    const imagesData = response.map(i => i.data);

    const dataForSend = {
      id: +deliveryId,
      images: imagesData
    }
    await controller.setDelivered(dataForSend)
    router.push('/admin/delivery')
  } else {
    toast.error('Validation Error', {
      description: 'Please upload image evidence',
      position:'top-center'
    })
  }
}
const armadaSelected = ref<TArmadaItem>(armadaController.lists.find(i => i.id === deliveryController.detail.armadaId)!)
const driverSelected = ref<TDriverItem>(driverController.lists.find(i => i.id == deliveryController.detail.driverId)!)


function handleChangeImage(e:any) {
  const files = e.target.files
  const oks = []
  for (let i = 0; i < files.length; i++) {
    const element = files[i];
    oks.push({
      file: element,
      preview: URL.createObjectURL(element)
    })
  }
  images.value = oks;
}
</script>
<template>
  <div>
    <div>
      <div class="my-4">
        <div class="text-sm mb-2">Upload Photo Evidence</div>
        <input multiple accept="image/*" type="file" @change="handleChangeImage">
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div v-for="item in images" class="border p-2 aspect-video w-full">
          <img class="w-full h-full object-contain" :src="item.preview" alt="">
        </div>
      </div>
      <div class="flex justify-start mt-3 gap-2">
        <UiButton @click="router.push('/admin/delivery')" variant="outline" type="button">
          Cancel
        </UiButton>
        <UiButton @click="setDelivedOrder" :disabled="controller.isSubmitting">
          Submit
        </UiButton>
      </div>
    </div>
    <div class="space-y-3">
      <div class="grid md:grid-cols-2 gap-3">
        <div>
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
              <UiInput type="tel" disabled placeholder="phone..." v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="tujuan" :model-value="deliveryController.detail.tujuan">
          <UiFormItem>
            <UiFormLabel>DESTINATION</UiFormLabel>
            <UiFormControl>
              <UiTextarea disabled readonly rows="5" placeholder="Destination Address..." v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
    </div>
  </div>
</template>