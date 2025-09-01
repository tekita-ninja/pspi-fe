import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ProductModel, type TProductBulkPrice, type TProductForm, type TProductFormUpdate, type TProductItem, type TProductPriceForm, type TResults } from "../models/ProductModel";
import ProductService from "../services/ProductService";
import type { TQueryParams } from "../types/Common";
export const useProductStore = defineStore("useProductStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    detail: <TProductItem>{},
    client_product: <any>{},
  }),
  actions: {
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await ProductService.get(params)
        this.results = ProductModel.paginate(response.data)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async getDetail(id: number) {
      try {
        this.loading = true
        const response = await ProductService.getDetail(id)
        this.detail = response
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TProductForm) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await ProductService.create(data)
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
    async update(data: TProductFormUpdate, id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await ProductService.update(data, id)
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
        const response = await ProductService.delete(id)
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

    async createManyPrice(data: TProductBulkPrice[]) {
      try {
        this.loading = true
        const response = await ProductService.createManyPrice(data)
        if (response.status === 201) {
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

    // CLIENT
    async getClientProduct() {
      try {
        this.loading = true
        const response = await ProductService.getClientProduct()
        this.client_product = response
      } catch (error: any) {
        return error.response
      } finally {
        this.loading = false
      }
    },
  },
});