import { AxiosInstance, AxiosResponse } from "axios";
import { Auth, AuthTokens } from "../interfaces/auth";

export default class AuthEndpoint {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async login(payload: Auth): Promise<AxiosResponse<AuthTokens>> {
    return this.api.post("auth/login", payload);
  }

  async signUp(payload: Auth): Promise<AxiosResponse<AuthTokens>> {
    return this.api.post("auth/sign-up/", payload);
  }

  async logout(): Promise<AxiosResponse<void>> {
    return this.api.post("auth/logout");
  }
}
