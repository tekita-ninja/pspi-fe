import type { TArmadaForm } from "../models/ArmadaModel";
import type { TQueryParams } from "../types/Common";

class ArmadaService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `armada`,
      method: "GET",
      params
    });
    return response.data;
  }
  async getAll(params?: TQueryParams) {
    const response = await this.api({
      url: `armada/all`,
      method: "GET",
      params
    });
    return response.data;
  }
  async show(id:number) {
    const response = await this.api({
      url: `armada/${id}`,
      method: "GET",
    });
    return response.data.data.data;
  }
  async create(data: TArmadaForm) {
    const response = await this.api({
      url: `armada`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TArmadaForm, id: number) {
    const response = await this.api({
      url: `armada/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `armada/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new ArmadaService();