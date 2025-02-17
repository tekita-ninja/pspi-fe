
import type { TFormEditUser, TFormUser } from "../models/UserModel";
import type { TQueryParams } from "../types/Common";

class UserService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `user`,
      method: "GET",
      params
    });
    return response.data;
  }
  async create(data: TFormUser) {
    const response = await this.api({
      url: `user`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TFormEditUser,id:number) {
    const response = await this.api({
      url: `user/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `user/${id}`,
      method: "DELETE",
    });
    return response;
  }
  async assignRole(userId: number, roleId: number) {
    const response = await this.api({
      url: `user/asssign-role`,
      method: "POST",
      data: {
        userId,
        roleId
      }
    });
    return response;
  }
}

export default new UserService();