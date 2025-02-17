import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import {
  BlogCategoryModel,
  type TBlogCategoryForm,
  type TBlogCategoryFormUpdate,
  type TResults
} from "../models/BlogCategoryModel";
import BlogCategoryService from "../services/BlogCategoryService";
import type { TQueryParams } from "../types/Common";
import type { TBlogItem } from "../models/BlogModel";
export const useBlogCategoryStore = defineStore("useBlogCategoryStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    all: <TBlogItem[]>[]
  }),
  actions: {
    async getAll(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await BlogCategoryService.get(params)
        this.all = response.data.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await BlogCategoryService.get(params)
        this.results = BlogCategoryModel.paginate(response.data)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TBlogCategoryForm) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await BlogCategoryService.create(data)
        if (response.status === 201) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success create data!'
          })
        }
      } catch (error: any) {
        this.dialog = true
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async update(data: TBlogCategoryFormUpdate, id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await BlogCategoryService.update(data, id)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success update data!'
          })
        }
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async delete(id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await BlogCategoryService.delete(id)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success delete data!'
          })
        }
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
  },
});