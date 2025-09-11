import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import LegalDocumentService from "../services/LegalDocument";
import type { TQueryParams } from "../types/Common";
import { LegalDocumentModel, type TResults, type TLegalDocumentForm, type TLegalDocumentFormUpdate, type TLegalDocumentItem } from "../models/LegalDocumentModel";
export const useLegalDocumentStore = defineStore("useLegalDocumentStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    all: <TLegalDocumentItem[]>[]
  }),
  actions: {
    async getAll(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await LegalDocumentService.all(params)
        this.all = response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await LegalDocumentService.get(params)
        this.results = LegalDocumentModel.paginate(response.data)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TLegalDocumentForm) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await LegalDocumentService.create(data)
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
    async update(data: TLegalDocumentFormUpdate, id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await LegalDocumentService.update(data, id)
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
        const response = await LegalDocumentService.delete(id)
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