import type { TLogin } from "@/app/types/Auth";

class AuthService {
  api = useApi();
  async login(formData: TLogin) {
    const access_token = useCookie("access_token");
    const refresh_token = useCookie("refresh_token");
    const response = await this.api({
      url: `auth/login`,
      method: "POST",
      data: formData,
    });
    if (response) {
      if (response.status === 200) {
        access_token.value = response.data.data.token
        refresh_token.value = response.data.data.refreshToken
        localStorage.setItem('c_user', JSON.stringify(response.data.data.user))
        window.location.reload()
      }
    }
    return false
  }
}

export default new AuthService();