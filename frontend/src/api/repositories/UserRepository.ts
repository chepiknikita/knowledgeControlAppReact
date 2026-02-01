import { AxiosResponse } from "axios";
import UserEndpoint from "../endpoints/UserEndpoint";
import { UserCredentialsUpdate } from "../../entities/user";
import { UserResponse } from "../interfaces/auth";

export default class UserRepository {
  api: UserEndpoint;

  constructor(api: UserEndpoint) {
    this.api = api;
  }

  async updateAvatar(id: number, payload: FormData): Promise<AxiosResponse<UserResponse>> {
    return this.api.updateAvatar<UserResponse>(id, payload);
  }

  async updateCredentials(id: number, payload: UserCredentialsUpdate): Promise<AxiosResponse<UserResponse>> {
    return this.api.updateCredentials<UserResponse>(id, payload);
  }

  async delete(id: number): Promise<AxiosResponse<void>> {
    return this.api.delete<void>(id);
  }

  async getProfile(): Promise<AxiosResponse<UserResponse>> {
    return this.api.getProfile<UserResponse>();
  }
}
