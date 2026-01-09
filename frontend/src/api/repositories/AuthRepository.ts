import AuthEndpoint from "../endpoints/AuthEndpoint";
import { Auth } from "../interfaces/auth";

export default class AuthRepository {
  api: AuthEndpoint;

  constructor(api: AuthEndpoint) {
    this.api = api;
  }

  async login(payload: Auth) {
    return this.api.login(payload);
  }

  async signUp(payload: Auth) {
    return this.api.signUp(payload);
  }

  async logout() {
    return this.api.logout();
  }
}
