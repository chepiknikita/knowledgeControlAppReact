import { AxiosInstance, AxiosResponse } from "axios";
import { Auth, AuthToken } from "../interfaces/auth";

export default class AuthEndpoint {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async login(payload: Auth): Promise<AxiosResponse<AuthToken>> {
    return this.api.post("auth/login", payload);
  }

  async signUp(payload: Auth): Promise<AxiosResponse<AuthToken>> {
    return this.api.post("auth/sign-up/", payload);
  }
}
