import type { TPaginate } from "../types/Response";

export type TDriverForm = {
  image: string
  name: string
  phone: string
  email?: string
  type: number
}

export type TDriverItem = {
  id: number
  name: string
  type?: number
  image: string
  phone: string
  email: string
  createdAt: string
  updatedAt: string
}

export type TResults = {
  data: TDriverItem[],
  meta: TPaginate
}
export class DriverModel {
  static paginate(response: {
    data: TDriverItem[],
    meta: TPaginate
  }) {
    return response
  }
}