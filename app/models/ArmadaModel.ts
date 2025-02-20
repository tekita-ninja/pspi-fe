import type { TPaginate } from "../types/Response";

export type TArmadaForm = {
  defaultDriverId: number
  nopol: string
  merk: string
  quantity: string
  kompartment: string
  image_front?: string
  image_right?: string
  image_left?: string
  image_back?: string
  terra_doc?: string
}

export type TArmadaItem = {
  id: number
  defaultDriverId: number
  nopol: string
  merk: string
  quantity: string
  kompartment: string
  image_front: string,
  image_right: string,
  image_left: string,
  image_back: string,
  terra_doc: string,
  createdAt: string
}

export type TResults = {
  data: TArmadaItem[],
  meta: TPaginate
}
export class ArmadaModel {
  static paginate(response: {
    data: TArmadaItem[],
    meta: TPaginate
  }) {
    return response
  }
}