
import type { TBlogCategoryForm, TBlogCategoryFormUpdate } from "../models/BlogCategoryModel";
import type { TQueryParams } from "../types/Common";

class BlogCategoryService {
  api = useApi();
  async all(params?: TQueryParams) {
    const response = await this.api({
      url: `blog-category/all`,
      method: "GET",
      params
    });
    return response.data;
  }
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `blog-category`,
      method: "GET",
      params
    });
    return response.data;
  }
  async create(data: TBlogCategoryForm) {
    const response = await this.api({
      url: `blog-category`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TBlogCategoryFormUpdate, id: number) {
    const response = await this.api({
      url: `blog-category/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `blog-category/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new BlogCategoryService();