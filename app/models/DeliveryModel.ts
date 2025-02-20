import type { TPaginate } from "../types/Response";
import type { TArmadaForm } from "./ArmadaModel";
import type { TDriverForm } from "./DriverModel";

export type TDeliveryForm = {
  statusPengiriman?: number
  driverId: number
  armadaId: number
  startDate?: Date
  tujuan: string
}
export type TBuktiPengiriman = {
  id: number
  image: string
}
export type TFormBuktiPengiriman = {
  id: number
  images: string[]
}
export type TDeliveryItem = {
  id: number
  code: string
  statusPengiriman: number
  driverId: number
  armadaId: number
  startDate: string
  endDate: string | null,
  tujuan: string
  createdAt: string
  updatedAt: string
  driver: TDriverForm
  bukti_pengiriman: TBuktiPengiriman[],
  armada: TArmadaForm
}

export type TResults = {
  data: TDeliveryItem[],
  meta: TPaginate
}
export class DeliveryModel {
  static paginate(response: {
    data: TDeliveryItem[],
    meta: TPaginate
  }) {
    return response
  }
}