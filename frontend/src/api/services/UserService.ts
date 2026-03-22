import { UserCredentialsUpdate } from "../../entities/user";
import { UserResponse } from "../interfaces/auth";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
  constructor(private repository: UserRepository) {}

  async updateAvatar(id: number, payload: FormData): Promise<UserResponse> {
    return (await this.repository.updateAvatar(id, payload)).data;
  }

  async updateCredentials(id: number, payload: UserCredentialsUpdate): Promise<UserResponse> {
    return (await this.repository.updateCredentials(id, payload)).data;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getProfile(): Promise<UserResponse> {
    return (await this.repository.getProfile()).data;
  }
}
