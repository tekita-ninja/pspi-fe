import type { TPaginate } from "../types/Response";
import type { TArmadaForm } from "./ArmadaModel";
import type { TDriverForm } from "./DriverModel";

export type TDeliveryForm = {
  statusPengiriman?: number
  driverId: number
  armadaId: number
  startDate?: Date
  phone: string
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

export type TProgresPemgirimanItem = {
  id: number
  statusPengiriman: number
  description: string
  createdAt: string
}
export type TDeliveryItem = {
  id: number
  code: string
  statusPengiriman: number
  driverId: number
  codriverId?: number
  armadaId: number
  startDate: string
  endDate: string | null,
  phone: string
  tujuan: string
  createdAt: string
  updatedAt: string
  driver: TDriverForm
  bukti_pengiriman: TBuktiPengiriman[],
  progress_pengiriman: TProgresPemgirimanItem[] | [],
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