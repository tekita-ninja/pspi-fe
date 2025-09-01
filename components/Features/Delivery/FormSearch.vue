<script setup lang="ts">
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';
import { fromSearchDeliveredSchema } from '@/app/validations/delivery';
const common = useCommonStore()
const controller = useDeliveryStore()
const form = useForm({
  validationSchema: fromSearchDeliveredSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  common.changeParams({
    ...values,
    page: 1
  });
  controller.get(common.$state.params)
})
function handleReset() {
  common.resetParams();
  controller.get(common.$state.params)
}
</script>
<template>
  <div class="flex gap-2">
    <UiButton @click="handleReset" size="icon" variant="outline">
      <Icon name="tabler:reload" />
    </UiButton>
    <form @submit="onSubmit" class="flex items-end gap-1">
      <UiFormField v-slot="{ componentField }" name="code">
        <UiFormItem>
          <UiFormControl>
            <UiInput type="text" placeholder="code..." v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiButton size="icon">
        <Icon name="tabler:search" />
      </UiButton>
    </form>
  </div>
</template>