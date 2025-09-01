
import type { TProductBulkPrice, TProductForm, TProductFormUpdate } from "../models/ProductModel";
import type { TQueryParams } from "../types/Common";

class ProductService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `product`,
      method: "GET",
      params
    });
    return response.data;
  }
  async getDetail(id: number) {
    const response = await this.api({
      url: `product/${id}`,
      method: "GET",
    });
    return response.data.data;
  }
  async create(data: TProductForm) {
    const response = await this.api({
      url: `product`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TProductFormUpdate, id: number) {
    const response = await this.api({
      url: `product/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `product/${id}`,
      method: "DELETE",
    });
    return response;
  }

  async createManyPrice(data: TProductBulkPrice[]) {
    const response = await this.api({
      url: `product/price/create`,
      method: "POST",
      data
    });
    return response;
  }

  // CLIENT
  async getClientProduct() {
    const response = await this.api({
      url: `api/products`,
      method: "GET",
    });
    return response.data;
  }
}

export default new ProductService();