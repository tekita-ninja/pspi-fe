<script setup lang="ts">
import { useLegalDocumentStore } from '@/app/stores/useLegalDocumentStore';
import { useUploadStore } from '@/app/stores/useUploadStore';
import { createLegalDocumentSchema } from '@/app/validations/legaldoc';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';

const file = ref<File>()
const props = defineProps<{ item?: Item }>()
const controller = useLegalDocumentStore()
const uploadController = useUploadStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: createLegalDocumentSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  const repsonseUpload = await uploadController.uploadFile(file.value)
  if (repsonseUpload.message === "success") {
    const newData = {
      ...values,
      file: repsonseUpload.data
    }
    if (props.item) {
      controller.update(newData, props.item.id)
    } else {
      controller.create(newData)
    }
    dialog.value = controller.dialog
  }
})
async function handleChangeImage(e: any) {
  file.value = e.target.files[0]
}
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <UiButton size="sm" v-if="item">
        <Icon name="mdi:edit" class="mr-1" /> EDIT
      </UiButton>
      <UiButton size="sm" v-else>
        <Icon name="mdi:plus" class="mr-1" /> CREATE
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Form Legal Document</UiDialogTitle>
      </UiDialogHeader>
            <div>
        <input type="file" @change="handleChangeImage" />
      </div>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <UiFormField v-slot="{ componentField }" name="title" :model-value="item?.title">
            <UiFormItem>
              <UiFormLabel>Title</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="title..." v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <!-- <UiFormField v-slot="{ componentField }" name="file" :model-value="item?.file">
            <UiFormItem>
              <UiFormLabel>File</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="file..." v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField> -->
          <UiFormField v-slot="{ componentField }" name="description" :model-value="item?.description">
            <UiFormItem>
              <UiFormLabel>Description</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="description..." v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </div>
        <UiDialogFooter class="mt-4 flex justify-end">
          <UiButton type="submit">
            Save
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>