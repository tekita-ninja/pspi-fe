import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { DeliveryModel, type TDeliveryForm, type TDeliveryItem, type TFormBuktiPengiriman, type TResults } from "../models/DeliveryModel";
import Service from "../services/DeliverService";
import type { TQueryParams } from "../types/Common";
export const useDeliveryStore = defineStore("useDeliveryStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    detail: <TDeliveryItem>{},
  }),
  actions: {
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await Service.get(params)
        this.results = DeliveryModel.paginate(response.data)
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
    async getByCode(code: string) {
      try {
        this.loading = true
        const response = await Service.getByCode(code)
        if (!response) {
          toast.error('Ups', {
            description: 'No. Pengiriman Tidak Ditemukan',
            position: 'top-center'
          })
          this.loading = false
          return
        }
        this.detail = response
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TDeliveryForm) {
      const dayjs = useDayjs()
      const common = useCommonStore()
      const wa = `62` + toWaNumber(data.phone)
      try {
        this.isSubmitting = true
        const response = await Service.create(data)
        const textWA = `No. Pengiriman: ${response.data?.data?.code} - Pesanan Anda Sudah Dibuat pada ${dayjs(data.startDate).format('DD MMMM YYYY HH:mm')} dan siap dikirimkan`
        if (response.status === 201) {
          await this.get(toQueryParams(common.$state.params))
          toast.success('Success!', {
            description: 'success create data!'
          })
          window.open(`https://wa.me/${wa}?text=${textWA}`,'_blank')
        }
      } catch (error: any) {
        this.dialog = true
        return error.response.data
      } finally {
        this.isSubmitting = false
      }
    },
    async setDelivered(data: TFormBuktiPengiriman) {
      // const common = useCommonStore()
      try {
        this.isSubmitting = true
        const response = await Service.setDelivered(data)
        if (response.status === 200) {
          // await this.get(toQueryParams(common.$state.params))
          toast.success('Success!', {
            description: 'success update data!'
          })
        }
      } catch (error: any) {
        this.dialog = true
        return error.response.data
      } finally {
        this.isSubmitting = false
      }
    },
    async update(data: TDeliveryForm, id: number) {
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
    async changeStatus(data: { id: number, statusPengiriman: number }) {
      const common = useCommonStore()
      try {
        this.isSubmitting = true
        const response = await Service.changeStatus(data)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success update status!'
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