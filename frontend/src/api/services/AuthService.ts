import { Auth, AuthTokens } from "../interfaces/auth";
import AuthRepository from "../repositories/AuthRepository";

export class AuthService {
  constructor(private repository: AuthRepository) {}

  private saveTokens(tokens: AuthTokens): void {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }

  async login(payload: Auth): Promise<AuthTokens> {
    const data = (await this.repository.login(payload)).data;
    this.saveTokens(data);
    return data;
  }

  async signUp(payload: Auth): Promise<AuthTokens> {
    const data = (await this.repository.signUp(payload)).data;
    this.saveTokens(data);
    return data;
  }

  async logout(): Promise<void> {
    try {
      await this.repository.logout();
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
}
