import { AxiosInstance, AxiosResponse } from "axios";

export default class UserEndpoint {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async update<T>(id: number, payload: FormData): Promise<AxiosResponse<T>> {
    return this.api.put(`user/${id}`, payload);
  }

  async delete<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.delete(`user/${id}`);
  }
}
