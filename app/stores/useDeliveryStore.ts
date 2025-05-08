import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { DeliveryModel, type TDeliveryForm, type TDeliveryItem, type TFormBuktiPengiriman, type TResults } from "../models/DeliveryModel";
import Service from "../services/DeliverService";
import type { TQueryParams } from "../types/Common";
type TQueryDelivery = TQueryParams & {
  code?: string
  driverId?: number
  start?: string
  end?: string
}
export const useDeliveryStore = defineStore("useDeliveryStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{},
    detail: <TDeliveryItem>{},
  }),
  actions: {
    async get(params?: TQueryDelivery) {
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
      const dayjs = useDayjs()
      try {
        this.loading = true
        const response = await Service.getByCode(code)
        // response.createdAt
        if (!response) {
          toast.error('Ups', {
            description: 'No. Pengiriman Tidak Ditemukan',
            position: 'top-center'
          })
          this.loading = false
          return
        }
        const isExp = dayjs().diff(dayjs(response.createdAt), 'day') > 14
        if (isExp) {
          toast.error('Ups', {
            description: 'No. Pengiriman Kadaluwarsa',
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
        // const textWA = `No. Pengiriman: ${response.data?.data?.code} - Pesanan Anda Sudah Dibuat pada ${dayjs(data.startDate).format('DD MMMM YYYY HH:mm')} dan siap dikirimkan`
        // const textWA = `Pesanan%20BBM%20anda%20sudah%20kami%20siapkan%20pada%${dayjs(data.startDate).format('DD MMMM YYYY HH:mm')}%2015%3A02%20dan%20siap%20untuk%20dikirimkan.%0A%0AKode%20Pengiriman%3A%20${response.data?.data?.code}%0A%0ASilahkan%20cek%20status%20pengiriman%20BBM%20melalui%20website%20resmi%20kami%3A%0Ahttps%3A%2F%2Fwww.primasynergy.com%2Flacak%2F%0A%0ATerima%20kasih%20sudah%20mempercayakan%20kebutuhan%20BBM%20anda%20Kepada%20kami🙏🙏🙏  %F0%9F%99%8F`
        // const textWA = `Pesanan%20BBM%20anda%20sudah%20kami%20siapkan%20pada%${dayjs(data.startDate).format('DD MMMM YYYY HH:mm')}%2015%3A02%20dan%20siap%20untuk%20dikirimkan.%0A%0AKode%20Pengiriman%3A%20${response.data?.data?.code}%0A%0ASilahkan%20cek%20status%20pengiriman%20BBM%20melalui%20website%20resmi%20kami%3A%0Ahttps%3A%2F%2Fwww.primasynergy.com%2Flacak%2F%0A%0ATerima%20kasih%20sudah%20mempercayakan%20kebutuhan%20BBM%20anda%20Kepada%20kami.`
        const textWA = `Terima%20kasih%20telah%20mempercayakan%20kebutuhan%20BBM%20Anda%20kepada%20kami.%0A%0AKami%20ingin%20menginformasikan%20bahwa%20pesanan%20BBM%20sedang%20dalam%20proses%20pengiriman.%0A%0AKode%20Pengiriman%3A%20${response.data?.data?.code}%0ASilakan%20cek%20status%20pengiriman%20BBM%20Anda%20melalui%20website%20resmi%20kami%20di%20https%3A%2F%2Fwww.primasynergy.com%2Flacak%2F%0A%0AJika%20ada%20pertanyaan%20atau%20membutuhkan%20bantuan%20lainnya`
        if (response.status === 201) {
          await this.get(toQueryParams(common.$state.params))
          toast.success('Success!', {
            description: 'success create data!'
          })
          window.open(`https://wa.me/${wa}?text=${textWA}`, '_blank')
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
    async downloadExcel() {
      try {
        this.loading = true
        const response = await Service.downloadExcel()
        // this.detail = response
        return response;
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
  },
});