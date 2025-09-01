<script setup lang="ts">
import { useBlogCategoryStore } from '@/app/stores/useBlogCategoryStore';
import { crateBlogCategorySchema } from '@/app/validations/blog';
import { useForm } from 'vee-validate';
import type { Item } from 'vue3-easy-data-table';
const props = defineProps<{ item?: Item }>()
const controller = useBlogCategoryStore()
const dialog = ref(false)
const form = useForm({
  validationSchema: crateBlogCategorySchema
})

const onSubmit = form.handleSubmit(async (values) => {
  if (props.item) {
    controller.update(values, props.item.id)
  } else {
    controller.create(values)
  }
  dialog.value = controller.dialog
})
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
        <UiDialogTitle>Form Blog Category</UiDialogTitle>
      </UiDialogHeader>
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