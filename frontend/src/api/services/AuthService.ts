import { Auth, AuthToken } from "../interfaces/auth";
import AuthRepository from "../repositories/AuthRepository";

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async login(payload: Auth): Promise<AuthToken | undefined> {
    try {
      const data = (await this.repository.login(payload)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async signUp(payload: Auth): Promise<AuthToken | undefined> {
    try {
      const data = (await this.repository.signUp(payload)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    // try {
    //   await this.repository.signUp(payload);
    // } catch (error) {
    //   console.error(error);
    // }
  }
}
