<script setup lang="ts">
import { useBlogCategoryStore } from '@/app/stores/useBlogCategoryStore';
import { useBlogStore } from '@/app/stores/useBlogStore';
import { useUploadStore } from '@/app/stores/useUploadStore';
import { crateBlogSchema } from '@/app/validations/blog';
import { useForm } from 'vee-validate';

const imageFile = ref<File>()
const imagePreview = ref('')
const body = ref<string>('')
const categoryController = useBlogCategoryStore()
const uploadController = useUploadStore()
const controller = useBlogStore()
await categoryController.getAll()

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
  const responseImage = await uploadFile()
  const newValue = {
    ...values,
    image: responseImage.data
  }
  controller.create(newValue);
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
  <div>
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
            <input class="hidden" type="file" placeholder="image" id="imageFile" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <div class="grid md:grid-cols-2 gap-2">
        <UiFormField v-slot="{ componentField }" name="blog_category_id">
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
                    <UiSelectItem v-for="item in categoryController.all" :key="item.id" :value="item.id">{{ item.title
                      }}</UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="author">
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
        <UiFormField v-slot="{ componentField }" name="title">
          <UiFormItem>
            <UiFormLabel>Title</UiFormLabel>
            <UiFormControl>
              <UiInput type="text" placeholder="title" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
      <div>
        <ClientOnly>
          <UiFormField v-slot="{ componentField }" name="body">
            <QuillEditor content-type="html" @update:content="handleUpdateContent" v-model:content="body"
              v-bind="componentField" id="my-editor" :options="options" />
          </UiFormField>
        </ClientOnly>
      </div>
      <div class="flex justify-end gap-2">
        <UiButton :disabled="uploadController.isUploading || controller.isSubmitting">
          <Icon v-if="uploadController.isUploading || controller.isSubmitting" name="icon-park-outline:loading"
            class="animate-spin mr-1" /> Submit
        </UiButton>
      </div>
    </form>
  </div>
</template>