import type { TPaginate } from "../types/Response";

export type TBlogItem = {
  id: string
  title: string
  slug: string
  image: string
  author: string
  publishedAt: string | null
  body:string
  category: {
    id: number
    title: string
    slug: string
  }
  created_by: {
    id: number
    name: string
    username: string
  }
}

export type TBlogForm = {
  blog_category_id?:number
  title:string,
  image:string,
  author:string,
  body: string,
  publishedAt?: Date
}
export type TBlogFormUpdate = {
  blog_category_id?:number
  title?:string,
  image?:string,
  author?:string,
  body?: string,
  publishedAt?: Date
}

export type TResults = {
  data: TBlogItem[],
  meta: TPaginate
}
export class BlogModel {
  static paginate(response: {
    data: TBlogItem[],
    meta: TPaginate
  }) {
    return response
  }
}