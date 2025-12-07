import { Auth } from "../interfaces/auth";
import AuthRepository from "../repositories/AuthRepository";

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async login(payload: Auth): Promise<void> {
    try {
      await this.repository.login(payload);
    } catch (error) {
      console.error(error);
    }
  }

  async signUp(payload: Auth): Promise<void> {
    try {
      await this.repository.signUp(payload);
    } catch (error) {
      console.error(error);
    }
  }
}
