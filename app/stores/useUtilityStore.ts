import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { TSummary, TUtility } from "../models/UtilityModel";
import UtilityService from "../services/UtilityService";
import type { TQueryParams } from "../types/Common";

export const useUtilityStore = defineStore("useUtilityStore", {
  state: () => ({
    dialog: false,
    loading: false,
    data: <TUtility>{},
    utilityClient: <TUtility>{},
    summary: <TSummary[]>[],
    showAnnouncement: <boolean>false
  }),
  actions: {


    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await UtilityService.get(params)
        this.data = await UtilityService.get()
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async setup(data: TUtility) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await UtilityService.setup(data)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success create data!'
          })
        }
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async getUtilityClient() {
      try {
        this.loading = true
        const response = await UtilityService.getUtilityClient()
        this.utilityClient = response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    setShowAnnouncement(state:boolean) {
      this.showAnnouncement = state
    }
  },
});