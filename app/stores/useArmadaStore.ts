import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import Service from "../services/ArmadaService";
import type { TQueryParams } from "../types/Common";
import { ArmadaModel, type TArmadaForm, type TArmadaItem, type TResults } from "../models/ArmadaModel";
export const useArmadaStore = defineStore("useArmadaStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    detail: <TArmadaItem>{},
    lists: <TArmadaItem[]>[],
  }),
  actions: {
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await Service.get(params)
        this.results = ArmadaModel.paginate(response.data)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async getAll(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await Service.getAll(params)
        this.lists = response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async getById(id: number) {
      try {
        this.loading = true
        const response = await Service.show(id)
        this.detail = response
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TArmadaForm) {
      const common = useCommonStore()
      try {
        this.isSubmitting = true
        const response = await Service.create(data)
        if (response.status === 201) {
          await this.get(toQueryParams(common.$state.params))
          toast.success('Success!', {
            description: 'success create data!'
          })
        }
      } catch (error: any) {
        this.dialog = true
        return error.response.data
      } finally {
        this.isSubmitting = false
      }
    },
    async update(data: TArmadaForm, id: number) {
      const common = useCommonStore()
      try {
        this.isSubmitting = true
        const response = await Service.update(data, id)
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
        this.isSubmitting = false
      }
    },
    async delete(id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await Service.delete(id)
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