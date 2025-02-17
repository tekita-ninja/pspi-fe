<script setup lang="ts">
import { useProductStore } from '@/app/stores/useProductStore';
import { crateProductItemSchema } from '@/app/validations/product';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item?: Item }>()
const controller = useProductStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: crateProductItemSchema,
  initialValues: {
    unit: 'kl'
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.item) {
    await controller.update(values, props.item.id)
  } else {
    await controller.create(values)
  }
  dialog.value = controller.dialog
})
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <ButtonsEdit v-if="item" />
      <ButtonsCreate v-else />
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Form Product</UiDialogTitle>
      </UiDialogHeader>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <UiFormField v-slot="{ componentField }" name="name" :value="item?.name">
            <UiFormItem>
              <UiFormLabel>Name</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="name" v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="unit" :value="item?.unit">
            <UiFormItem>
              <UiFormLabel>Unit</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="unit" v-bind="componentField" />
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