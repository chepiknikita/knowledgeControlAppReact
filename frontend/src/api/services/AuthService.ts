import { Auth, AuthTokens } from "../interfaces/auth";
import AuthRepository from "../repositories/AuthRepository";

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async login(payload: Auth): Promise<AuthTokens> {
    const data = (await this.repository.login(payload)).data;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  }

  async signUp(payload: Auth): Promise<AuthTokens> {
    const data = (await this.repository.signUp(payload)).data;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  }

  async logout(): Promise<void> {
    try {
      await this.repository.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
}
