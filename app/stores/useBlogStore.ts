import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { TQueryParams } from "../types/Common";
import BlogService from "../services/BlogService";
import { BlogModel, type TBlogForm, type TBlogFormUpdate, type TBlogItem, type TResults } from "../models/BlogModel";
import type { TClientPagination } from "../types/Response";
export const useBlogStore = defineStore("useBlogStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    detail: <TBlogItem>{},
    publication: <any>{},
    publications: <{
      data: TBlogItem[],
      meta: TClientPagination
    }>{}
  }),
  actions: {
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await BlogService.get(params)
        this.results = BlogModel.paginate(response.data)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async show(id: number) {
      try {
        this.loading = true
        const response = await BlogService.show(id)
        this.detail = response
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TBlogForm) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await BlogService.create(data)
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
    async update(data: TBlogFormUpdate, id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await BlogService.update(data, id)
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
        const response = await BlogService.delete(id)
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
    
    async getPublication(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await BlogService.getPublication(params)
        this.publications = response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async showPublication(slug: string) {
      try {
        this.loading = true
        const response = await BlogService.showPublication(slug)
        this.publication = response
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
  },
});