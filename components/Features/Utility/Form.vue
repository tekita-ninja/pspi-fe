<script setup lang="ts">
import { useUploadStore } from '@/app/stores/useUploadStore';
import { useUtilityStore } from '@/app/stores/useUtilityStore';
import { formUtilitySchema } from '@/app/validations/utility';
import { useForm } from 'vee-validate';

const logoSm = ref<{ file?: File, preview: string }>()
const logoLg = ref<{ file?: File, preview: string }>()
const fileCompro = ref<File>()
const comproUrl = ref('')
const controller = useUtilityStore()
const uploadController = useUploadStore()
const form = useForm({
  validationSchema: formUtilitySchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  let logoSmResponse = undefined
  let logoLgResponse = undefined
  let comproResponseResponse = undefined
  if (logoSm.value?.file) {
    logoSmResponse =await uploadFile(logoSm.value?.file)
  }
  if (logoLg.value?.file) {
    logoLgResponse = await uploadFile(logoLg.value?.file)
  }
  if (fileCompro.value) {
    comproResponseResponse = await uploadFile(fileCompro.value)
  }
  await controller.setup({
    id: controller.data.id,
    ...values,
    logoLg: logoLgResponse?.data,
    fileCompro: comproResponseResponse?.data,
    logoSm: logoSmResponse?.data
  })
})

await controller.get()
comproUrl.value = controller.data.fileCompro || ''
logoSm.value = {
  file:undefined,
  preview: toAssetLink(controller.data?.logoSm || '') || ''
}
logoLg.value = {
  file:undefined,
  preview: toAssetLink(controller.data?.logoLg || '') || ''
}

function handleChageLogoSm(file: File) {
  logoSm.value = {
    file,
    preview: URL.createObjectURL(file)
  }
}
function handleChageLogoLg(file: File) {
  logoLg.value = {
    file,
    preview: URL.createObjectURL(file)
  }
}

async function uploadFile(file:File) {
  return await uploadController.uploadFile(file)
}

function handleChangeCompro(e:any) {
  fileCompro.value = e.target.files[0]
}
</script>
<template>
  <div>

    <pre>{{ controller.data.fileCompro }}</pre>
    <!-- <div class="grid md:grid-cols-2 gap-2">
      <div>
        <p class="text-sm text-center text-slate-600 mb-2">Logo Small</p>
        <label for="logoSmFile"
          class="flex items-center justify-center overflow-hidden p-2 cursor-pointer group hover:bg-gray-200 bg-gray-100">
          <img class="h-20 w-20 object-contain mx-auto" v-if="logoSm?.preview" :src="logoSm?.preview" alt="image">
          <div v-else>
            <Icon name="mdi:image-plus" />
          </div>
        </label>
      </div>
      <div>
        <p class="text-sm text-center text-slate-600 mb-2">Logo Full</p>
        <label for="logoLgFile"
          class="flex items-center justify-center overflow-hidden p-2 cursor-pointer group hover:bg-gray-200 bg-gray-100">
          <img class="w-56 h-20 object-contain mx-auto" v-if="logoLg?.preview" :src="logoLg?.preview" alt="image">
          <div v-else>
            <Icon name="mdi:image-plus" />
          </div>
        </label>
      </div>
    </div> -->
    <form @submit="onSubmit">
      <div class="space-y-3">
        <!-- FILE LOGO -->
        <UiFormField v-slot="{ componentField }" name="logoSmFile" @update:model-value="handleChageLogoSm">
          <UiFormItem>
            <UiFormControl>
              <input class="hidden" type="file" placeholder="image" id="logoSmFile" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="logoLgFile" @update:model-value="handleChageLogoLg">
          <UiFormItem>
            <UiFormControl>
              <input class="hidden" type="file" placeholder="image" id="logoLgFile" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <!-- FILE LOGO -->
        <UiFormField v-slot="{ componentField }" name="appName" :value="controller.data.appName">
          <UiFormItem>
            <UiFormLabel>App Name</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="mainWhatsapp" :value="controller.data?.mainWhatsapp">
          <UiFormItem>
            <UiFormLabel>Whatsapp</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="mainEmail" :value="controller.data.mainEmail">
          <UiFormItem>
            <UiFormLabel>Email</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="mainAddress" :value="controller.data.mainAddress">
          <UiFormItem>
            <UiFormLabel>Address</UiFormLabel>
            <UiFormControl>
              <UiTextarea type="text" placeholder="address" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="fileComprox">
          <UiFormItem>
            <UiFormLabel>Compro File</UiFormLabel>
            <UiFormControl>
              <input type="file" @change="handleChangeCompro" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
          <a download target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-blue-600 underline"
            :href="toAssetLink(controller.data.fileCompro!)">Preview</a>
        </UiFormField>
      </div>
      <div class="flex justify-end gap-2 mt-2">
        <UiButton :disabled="controller.loading || uploadController.isUploading">Update</UiButton>
      </div>
    </form>
  </div>
</template>