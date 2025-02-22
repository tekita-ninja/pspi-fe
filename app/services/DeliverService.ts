import type { TBuktiPengiriman, TDeliveryForm, TFormBuktiPengiriman } from "../models/DeliveryModel";
import type { TQueryParams } from "../types/Common";

class DeliverService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `delivery`,
      method: "GET",
      params
    });
    return response.data;
  }
  async show(id:number) {
    const response = await this.api({
      url: `delivery/${id}`,
      method: "GET",
    });
    return response.data.data;
  }
  async getByCode(code:string) {
    const response = await this.api({
      url: `delivery/search/${code}`,
      method: "GET",
    });
    return response.data.data;
  }
  async create(data: TDeliveryForm) {
    const response = await this.api({
      url: `delivery`,
      method: "POST",
      data
    });
    return response;
  }
  async setDelivered(data: TFormBuktiPengiriman) {
    const response = await this.api({
      url: `delivery/set-delivered`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TDeliveryForm, id: number) {
    const response = await this.api({
      url: `delivery/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async changeStatus(data: { id:number, statusPengiriman:number }) {
    const response = await this.api({
      url: `delivery/update-status`,
      method: "POST",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `delivery/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new DeliverService();