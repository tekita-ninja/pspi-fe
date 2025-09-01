<script setup lang="ts">
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';
import { useDriverStore } from '@/app/stores/useDriverStore';
import { fromSearchDeliveredSchema } from '@/app/validations/delivery';
import { useForm } from 'vee-validate';

const common = useCommonStore()
const driverController = useDriverStore()
const controller = useDeliveryStore()
await driverController.getAll()

const dialog = ref(false)
const form = useForm({
  validationSchema: fromSearchDeliveredSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  common.changeParams({
    ...values,
    page:1
  });
  controller.get(common.$state.params)
  dialog.value = false
})
function handleChageStatus(e: string) {
  common.changeParams({
    statusPengiriman: e
  });
}
</script>

<template>
  <UiDialog v-model:open="dialog">
    <UiDialogTrigger as-child>
      <UiButton>
        <Icon name="mdi:filter" class="mr-1" /> FILTER
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>Filter Delivery</UiDialogTitle>
      </UiDialogHeader>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <UiFormField v-slot="{ componentField }" name="code">
            <UiFormItem>
              <UiFormLabel>Code</UiFormLabel>
              <UiFormControl>
                <UiInput type="text" placeholder="code..." v-bind="componentField" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="statusPengiriman">
            <UiFormItem>
              <UiFormLabel>Status</UiFormLabel>
              <UiFormControl>
                <UiSelect v-bind="componentField" @update:model-value="handleChageStatus" :model-value="`${common.params?.statusPengiriman}`">
                  <UiSelectTrigger>
                    <UiSelectValue placeholder="Status" />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectLabel>Status</UiSelectLabel>
                      <UiSelectItem value="0">Pending</UiSelectItem>
                      <UiSelectItem value="1">On Deliver</UiSelectItem>
                      <UiSelectItem value="3">Delivered</UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <div class="grid md:grid-cols-2 gap-3">
            <UiFormField v-slot="{ componentField }" name="start">
              <UiFormItem>
                <UiFormLabel>Start Date</UiFormLabel>
                <UiFormControl>
                  <UiInput type="date" placeholder="code..." v-bind="componentField" />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <UiFormField v-slot="{ componentField }" name="end">
              <UiFormItem>
                <UiFormLabel>End Date</UiFormLabel>
                <UiFormControl>
                  <UiInput type="date" placeholder="code..." v-bind="componentField" />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </div>
          <UiFormField v-slot="{ componentField }" name="driverId">
            <UiFormItem>
              <UiFormLabel>Select Driver</UiFormLabel>
              <UiFormControl>
                <UiSelect v-bind="componentField">
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
        </div>
        <UiDialogFooter class="mt-4 flex justify-end">
          <UiButton type="submit">
            Filter
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>