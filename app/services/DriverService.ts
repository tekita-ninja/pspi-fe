
import type { TDriverForm } from "../models/DriverModel";
import type { TQueryParams } from "../types/Common";

class DriverService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `driver`,
      method: "GET",
      params
    });
    return response.data;
  }
  async getAll(params?: TQueryParams) {
    const response = await this.api({
      url: `driver/all`,
      method: "GET",
      params
    });
    return response.data;
  }
  async show(id:number) {
    const response = await this.api({
      url: `driver/${id}`,
      method: "GET",
    });
    return response.data.data;
  }
  async create(data: TDriverForm) {
    const response = await this.api({
      url: `driver`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TDriverForm, id: number) {
    const response = await this.api({
      url: `driver/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `driver/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new DriverService();