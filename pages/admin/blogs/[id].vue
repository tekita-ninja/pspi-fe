<script setup lang="ts">
import { ref } from 'vue';
import { useBlogCategoryStore } from '@/app/stores/useBlogCategoryStore';
import { useBlogStore } from '@/app/stores/useBlogStore';
import { useUploadStore } from '@/app/stores/useUploadStore';
import { crateBlogSchema } from '@/app/validations/blog';
import { useForm } from 'vee-validate';

const route = useRoute()
const imageFile = ref<File>()
const imagePreview = ref('')
const body = ref<string>('')
const categoryController = useBlogCategoryStore()
const uploadController = useUploadStore()
const controller = useBlogStore()
const isMounted = ref(false)
onMounted(() => initialData())

async function initialData() {
  await categoryController.getAll()
  await controller.show(+route?.params?.id)
  body.value = controller.detail?.body
  form.setFieldValue('body', controller?.detail?.body)
  imagePreview.value = toAssetLink(controller.detail?.image)
  isMounted.value = true
}


const options = ref({
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ]
  },
  placeholder: 'type content here...',
  theme: 'snow'
})

const form = useForm({
  validationSchema: crateBlogSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  const responseImage = imageFile.value && await uploadFile()
  const newValue = {
    ...values,
    image: responseImage && responseImage.data
  }
  controller.update(newValue, +route.params.id);
  navigateTo(`/admin/blogs?page=1&rowsPerPage=10`)
})

function handleUpdateContent(e: string) {
  form.setFieldValue('body', e)
}
function handleChageFile(file: File) {
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

async function uploadFile() {
  return await uploadController.uploadFile(imageFile.value)
}

</script>
<template>
  <ContainersPage title="Edit Blog" subtitle="Form Edit Blog" :isLoading="controller.loading || !isMounted">
    <label for="imageFile"
      class="h-[40vh] flex items-center justify-center overflow-hidden p-2 cursor-pointer group hover:bg-gray-200 bg-gray-100 mb-2">
      <img class="h-full w-full object-contain" v-if="imagePreview" :src="imagePreview" alt="image">
      <div v-else>
        <Icon name="mdi:image-plus" />
      </div>
    </label>
    <form @submit="onSubmit" class="space-y-4">
      <UiFormField v-slot="{ componentField }" name="imageFile" @update:model-value="handleChageFile">
        <UiFormItem>
          <UiFormControl>
            <input type="file" class="hidden" placeholder="image" id="imageFile" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <div class="grid md:grid-cols-2 gap-2">
        <UiFormField v-slot="{ componentField }" name="blog_category_id"
          :model-value="controller?.detail?.category?.id">
          <UiFormItem>
            <UiFormLabel>Category</UiFormLabel>
            <UiFormControl>
              <UiSelect v-bind="componentField">
                <UiSelectTrigger>
                  <UiSelectValue placeholder="Select a category" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectLabel>category</UiSelectLabel>
                    <UiSelectItem v-for="item in categoryController.all" :key="item.id" :value="item.id">
                      {{ item.title }}
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="author" :model-value="controller?.detail?.author">
          <UiFormItem>
            <UiFormLabel>Author</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="author" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
      <div>
        <UiFormField v-slot="{ componentField }" name="title" :model-value="controller?.detail?.title">
          <UiFormItem>
            <UiFormLabel>Title</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="title" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
      <div v-if="isMounted">
        <UiFormField v-slot="{ componentField }" name="body">
          <ClientOnly>
            <QuillEditor content-type="html" @update:content="handleUpdateContent" v-model:content="body"
              v-bind="componentField" id="my-editor" :options="options" />
          </ClientOnly>
        </UiFormField>
      </div>
      <div class="flex justify-end gap-2">
        <UiButton :disabled="uploadController.isUploading || controller.isSubmitting">
          <Icon v-if="uploadController.isUploading || controller.isSubmitting" name="icon-park-outline:loading"
            class="animate-spin mr-1" /> Submit
        </UiButton>
      </div>
    </form>
  </ContainersPage>
</template>