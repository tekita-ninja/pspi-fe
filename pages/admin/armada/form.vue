<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
import { useArmadaStore } from '@/app/stores/useArmadaStore';
import { useDriverStore } from '@/app/stores/useDriverStore';
import { useUploadStore } from '@/app/stores/useUploadStore';
import { fromArmadaSchema } from '@/app/validations/armada';
import { useForm } from 'vee-validate';

const router = useRouter()
const terraDoc = ref<{ file?: File }>()
const imageFront = ref<{ file?: File, preview: string }>()
const imageBack = ref<{ file?: File, preview: string }>()
const imageRight = ref<{ file?: File, preview: string }>()
const imageLeft = ref<{ file?: File, preview: string }>()


const controllerDriver = useDriverStore()
const controllerUpload = useUploadStore()
const controller = useArmadaStore()

await controllerDriver.getAll()
function handleChangeImageFront(e: any) {
  imageFront.value = {
    file: e.target.files[0],
    preview: URL.createObjectURL(e.target.files[0])
  }
}
function handleChangeImageBack(e: any) {
  imageBack.value = {
    file: e.target.files[0],
    preview: URL.createObjectURL(e.target.files[0])
  }
}
function handleChangeImageRight(e: any) {
  imageRight.value = {
    file: e.target.files[0],
    preview: URL.createObjectURL(e.target.files[0])
  }
}
function handleChangeImageLeft(e: any) {
  imageLeft.value = {
    file: e.target.files[0],
    preview: URL.createObjectURL(e.target.files[0])
  }
}
function handleChangeDoc(e: any) {
  terraDoc.value = {
    file: e.target.files[0]
  }
}
function handleDeleteImage(type: string) {
  if (type === 'front') {
    imageFront.value = undefined
  }
  if (type === 'back') {
    imageBack.value = undefined
  }
  if (type === 'left') {
    imageLeft.value = undefined
  }
  if (type === 'right') {
    imageRight.value = undefined
  }
}

const form = useForm({
  validationSchema: fromArmadaSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  let responseImageFront, responseImageLeft, responseImageBack, responseImageRight, responseTerraDoc;
  if (imageFront.value?.file) {
    responseImageFront = (await controllerUpload.uploadFile(imageFront.value?.file)).data
  }
  if (imageBack.value?.file) {
    responseImageBack = (await controllerUpload.uploadFile(imageBack.value?.file)).data
  }
  if (imageLeft.value?.file) {
    responseImageLeft = (await controllerUpload.uploadFile(imageLeft.value?.file)).data
  }
  if (imageRight.value?.file) {
    responseImageRight = (await controllerUpload.uploadFile(imageRight.value?.file)).data
  }
  if (terraDoc.value?.file) {
    responseTerraDoc = (await controllerUpload.uploadFile(terraDoc.value?.file)).data
  }

  const newData = {
    ...values,
    image_front: responseImageFront,
    image_right: responseImageRight,
    image_left: responseImageLeft,
    image_back: responseImageBack,
    terra_doc: responseTerraDoc
  }
  await controller.create(newData);
  router.push('/admin/armada')

})
</script>
<template>
  <ContainersPage title="Armada" subtitle="Form Armada">
    <template #actions>
    </template>
    <div>
      <div class="border p-3 rounded">
        <div class="mb-3 text-sm">Image & Document</div>
        <div class="grid grid-cols-2 md:grid-cols-4 my-4 gap-2 md:gap-4">
          <div class="relative">
            <label for="image_front"
              class="flex aspect-square border cursor-pointer relative rounded-md overflow-hidden bg-slate-50">
              <input @change="handleChangeImageFront" class="hidden" type="file" id="image_front" />
              <img class="w-full h-full object-contain" v-if="imageFront?.preview" :src="imageFront?.preview"
                alt="preview">
              <div v-if="!imageFront?.preview"
                class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                <Icon name="tdesign:image-add" />
              </div>
            </label>
            <div v-if="imageFront?.preview"
              class="absolute left-0 right-0 top-0 bottom-0 flex items-start justify-end p-1">
              <button @click="handleDeleteImage('front')"
                class="h-6 w-6 flex items-center justify-center rounded-sm bg-red-400/20 text-red-500">
                <Icon name="mdi:remove" />
              </button>
            </div>
            <p class="text-sm mb-1 text-center">FRONT IMAGE</p>
          </div>
          <div class="relative">
            <label for="image_back"
              class="flex aspect-square border cursor-pointer relative rounded-md overflow-hidden bg-slate-50">
              <input @change="handleChangeImageBack" class="hidden" type="file" id="image_back" />
              <img class="w-full h-full object-contain" v-if="imageBack?.preview" :src="imageBack?.preview"
                alt="preview">
              <div v-if="!imageBack?.preview"
                class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                <Icon name="tdesign:image-add" />
              </div>
            </label>
            <div v-if="imageBack?.preview"
              class="absolute left-0 right-0 top-0 bottom-0 flex items-start justify-end p-1">
              <button @click="handleDeleteImage('back')"
                class="h-6 w-6 flex items-center justify-center rounded-sm bg-red-400/20 text-red-500">
                <Icon name="mdi:remove" />
              </button>
            </div>
            <p class="text-sm mb-1 text-center">BACK IMAGE</p>
          </div>
          <div class="relative">
            <label for="image_right"
              class="flex aspect-square border cursor-pointer relative rounded-md overflow-hidden bg-slate-50">
              <input @change="handleChangeImageRight" class="hidden" type="file" id="image_right" />
              <img class="w-full h-full object-contain" v-if="imageRight?.preview" :src="imageRight?.preview"
                alt="preview">
              <div v-if="!imageRight?.preview"
                class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                <Icon name="tdesign:image-add" />
              </div>
            </label>
            <div v-if="imageRight?.preview"
              class="absolute left-0 right-0 top-0 bottom-0 flex items-start justify-end p-1">
              <button @click="handleDeleteImage('right')"
                class="h-6 w-6 flex items-center justify-center rounded-sm bg-red-400/20 text-red-500">
                <Icon name="mdi:remove" />
              </button>
            </div>
            <p class="text-sm mb-1 text-center">RIGHT IMAGE</p>
          </div>
          <div class="relative">
            <label for="image_left"
              class="flex aspect-square border cursor-pointer relative rounded-md overflow-hidden bg-slate-50">
              <input @change="handleChangeImageLeft" class="hidden" type="file" id="image_left" />
              <img class="w-full h-full object-contain" v-if="imageLeft?.preview" :src="imageLeft?.preview"
                alt="preview">
              <div v-if="!imageLeft?.preview"
                class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                <Icon name="tdesign:image-add" />
              </div>
            </label>
            <div v-if="imageLeft?.preview"
              class="absolute left-0 right-0 top-0 bottom-0 flex items-start justify-end p-1">
              <button @click="handleDeleteImage('left')"
                class="h-6 w-6 flex items-center justify-center rounded-sm bg-red-400/20 text-red-500">
                <Icon name="mdi:remove" />
              </button>
            </div>
            <p class="text-sm mb-1 text-center">LEFT IMAGE</p>
          </div>
        </div>
        <div class="mt-3 flex flex-col">
          <label for="terraDoc">Document</label>
          <input @change="handleChangeDoc" type="file" name="terraDoc" id="terraDoc">
        </div>
      </div>
      <div class="mt-6 border p-3 rounded">
        <form @submit="onSubmit">
          <div class="space-y-3">
            <div class="grid md:grid-cols-2 gap-3">
              <UiFormField v-slot="{ componentField }" name="nopol">
                <UiFormItem>
                  <UiFormLabel>NOPOL</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="text" placeholder="B7788ABC" v-bind="componentField" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
              <UiFormField v-slot="{ componentField }" name="defaultDriverId">
                <UiFormItem>
                  <UiFormLabel>Main Driver</UiFormLabel>
                  <UiFormControl>
                    <UiSelect v-bind="componentField">
                      <UiSelectTrigger>
                        <UiSelectValue placeholder="Select Driver" />
                      </UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectGroup>
                          <UiSelectLabel>main driver</UiSelectLabel>
                          <UiSelectItem v-for="item in controllerDriver.lists" :key="item.id" :value="`${item.id}`">
                            {{ item.name }}
                          </UiSelectItem>
                        </UiSelectGroup>
                      </UiSelectContent>
                    </UiSelect>
                  </UiFormControl>
                  <UiFormMessage />
                  <UiFormDescription>
                    Main Driver Adalah supir utama pada armada, dapat diubah pada saat pembuatan pengiriman jika yg
                    bersangkutan tidak hadir atau terjadi kendala.
                  </UiFormDescription>
                </UiFormItem>
              </UiFormField>
            </div>
            <UiFormField v-slot="{ componentField }" name="merk">
              <UiFormItem>
                <UiFormLabel>MERK</UiFormLabel>
                <UiFormControl>
                  <UiInput type="text" placeholder="Mitsubishi" v-bind="componentField" />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <div class="grid grid-cols-2 gap-3">
              <UiFormField v-slot="{ componentField }" name="quantity">
                <UiFormItem>
                  <UiFormLabel>QUANTITY</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="text" placeholder="16K..." v-bind="componentField" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
              <UiFormField v-slot="{ componentField }" name="kompartment">
                <UiFormItem>
                  <UiFormLabel>KOMPARTEMENT</UiFormLabel>
                  <UiFormControl>
                    <UiInput type="text" placeholder="4 | 4 | 8 ..." v-bind="componentField" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
            </div>
          </div>
          <UiDialogFooter class="mt-4 flex justify-end">
            <UiButton type="submit">
              Save
            </UiButton>
          </UiDialogFooter>
        </form>
      </div>
    </div>
  </ContainersPage>
</template>