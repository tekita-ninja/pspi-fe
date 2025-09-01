import type { TUtility } from "../models/UtilityModel";
import type { TQueryParams } from "../types/Common";

class UtilityService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `utility`,
      method: "GET",
      params
    });
    return response.data.data;
  }
  async setup(data: TUtility) {
    const response = await this.api({
      url: `utility`,
      method: "POST",
      data
    });
    return response;
  }
  async getUtilityClient() {
    const response = await this.api({
      url: `api/utility`,
      method: "GET",
    });
    return response.data;
  }
}

export default new UtilityService();