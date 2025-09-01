import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { DriverModel, type TDriverForm, type TDriverItem, type TResults } from "../models/DriverModel";
import DriverService from "../services/DriverService";
import type { TQueryParams } from "../types/Common";
export const useDriverStore = defineStore("useDriverStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    lists: <TDriverItem[]>[]
  }),
  actions: {
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await DriverService.get(params)
        this.results = DriverModel.paginate(response.data)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async getAll(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await DriverService.getAll(params)
        this.lists = response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TDriverForm) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await DriverService.create(data)
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
    async update(data: TDriverForm, id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await DriverService.update(data, id)
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
        const response = await DriverService.delete(id)
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