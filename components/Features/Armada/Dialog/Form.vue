<script setup lang="ts">
import { useDriverStore } from '@/app/stores/useDriverStore';
import { useUploadStore } from '@/app/stores/useUploadStore';
import { fromDriverSchema } from '@/app/validations/driver';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item?: Item }>()
const file = ref<File>()
const controller = useDriverStore()
const uploadController = useUploadStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: fromDriverSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  const repsonseUpload = await uploadController.uploadFile(file.value)
  if (repsonseUpload.message === "success") {
    const newData = {
      ...values,
      image: repsonseUpload.data
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
        <UiDialogTitle>Form Driver</UiDialogTitle>
      </UiDialogHeader>
      <div>
        <input type="file" @change="handleChangeImage" />
      </div>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <UiFormField v-slot="{ componentField }" name="name" :model-value="item?.name">
            <UiFormItem>
              <UiFormLabel>Name</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="name..." v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="phone" :model-value="item?.phone">
            <UiFormItem>
              <UiFormLabel>Phone</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="phone..." v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="email" :model-value="item?.email">
            <UiFormItem>
              <UiFormLabel>Email</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="email..." v-bind="componentField" />
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