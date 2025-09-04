import type { TLegalDocumentForm, TLegalDocumentFormUpdate } from "../models/LegalDocumentModel";
import type { TQueryParams } from "../types/Common";

class LegalDocumentService {
  api = useApi();
  async all(params?: TQueryParams) {
    const response = await this.api({
      url: `legal-document/all`,
      method: "GET",
      params
    });
    return response.data;
  }
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `legal-document`,
      method: "GET",
      params
    });
    return response.data;
  }
  async create(data: TLegalDocumentForm) {
    const response = await this.api({
      url: `legal-document`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TLegalDocumentFormUpdate, id: number) {
    const response = await this.api({
      url: `legal-document/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `legal-document/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new LegalDocumentService();