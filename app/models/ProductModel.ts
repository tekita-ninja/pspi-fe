import type { TPaginate } from "../types/Response";

export type TProductItem = {
  id: number
  name: string
  unit: string
  status: boolean
  prices: TProductPrice[]
}
export type TProductPrice = {
  id: number
  title: string
  sub_title: string
  usd: number
  idr: number
  createdAt: string
}
export type TProductForm = {
  name: string
  unit: string
}
export type TProductFormUpdate = {
  name?: string
  unit?: string
  status?: boolean
}
export type TProductPriceForm = {
  title: string
  sub_title: string
  usd: number
  idr: number
}

export type TProductFormMany = TProductForm & {
  prices: TProductPriceForm[]
}
export type TBlogFormUpdate = {
  blog_category_id?: number
  title?: string,
  image?: string,
  author?: string,
  body?: string,
  publishedAt?: Date
}


export type TProductBulkPrice = {
  product_id: number
  title: string
  sub_title: string
  usd: number
  idr: number
}

export type TResults = {
  data: TProductItem[],
  meta: TPaginate
}
export class ProductModel {
  static paginate(response: {
    data: TProductItem[],
    meta: TPaginate
  }) {
    return response
  }
}