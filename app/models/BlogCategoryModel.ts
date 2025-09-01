import type { TPaginate } from "../types/Response";

export type TBlogCategoryItem = {
  id: number
  slug: string
  title: string
}

export type TBlogCategoryForm = {
  title:string
}
export type TBlogCategoryFormUpdate = {
  title?:string
  publisedAt?:string
}

export type TResults = {
  data: TBlogCategoryItem[],
  meta: TPaginate
}
export class BlogCategoryModel {
  static paginate(response: {
    data: TBlogCategoryItem[],
    meta: TPaginate
  }) {
    return response
  }
}