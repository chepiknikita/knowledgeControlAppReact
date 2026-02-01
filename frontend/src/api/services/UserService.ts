import { UserCredentialsUpdate } from "../../entities/user";
import { UserResponse } from "../interfaces/auth";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
  constructor(private repository: UserRepository) {}

  async updateAvatar(id: number, payload: FormData): Promise<any> {
    try {
      const data = (await this.repository.updateAvatar(id, payload)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateCredentials(id: number, payload: UserCredentialsUpdate): Promise<UserResponse> {
     try {
      const data = (await this.repository.updateCredentials(id, payload)).data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw error
    }
  }

  async getProfile() {
    try {
      const data = (await this.repository.getProfile()).data;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
