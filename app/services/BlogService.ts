
import type { TBlogForm, TBlogFormUpdate } from "../models/BlogModel";
import type { TQueryParams } from "../types/Common";

class BlogService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `blog`,
      method: "GET",
      params
    });
    return response.data;
  }
  async show(id:number) {
    const response = await this.api({
      url: `blog/${id}`,
      method: "GET",
    });
    return response.data.data;
  }
  async create(data: TBlogForm) {
    const response = await this.api({
      url: `blog`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TBlogFormUpdate, id: number) {
    const response = await this.api({
      url: `blog/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `blog/${id}`,
      method: "DELETE",
    });
    return response;
  }
  
  async getPublication(params?: TQueryParams) {
    const response = await this.api({
      url: `api/blogs`,
      method: "GET",
      params
    });
    return response.data;
  }
  async showPublication(slug: string) {
    const response = await this.api({
      url: `api/blogs/${slug}`,
      method: "GET",
    });
    return response.data;
  }
}

export default new BlogService();