import { AxiosInstance, AxiosResponse } from "axios";
import { UserCredentialsUpdate } from "../../entities/user";

export default class UserEndpoint {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async updateAvatar<T>(id: number, payload: FormData): Promise<AxiosResponse<T>> {
    return this.api.put(`user/${id}/avatar`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async updateCredentials<T>(id: number, payload: UserCredentialsUpdate): Promise<AxiosResponse<T>> {
    return this.api.put(`user/${id}/credentials`, payload);
  }

  async delete<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.delete(`user/${id}`);
  }

  async getProfile<T>(): Promise<AxiosResponse<T>> {
    return this.api.get("user/profile");
  }
}
