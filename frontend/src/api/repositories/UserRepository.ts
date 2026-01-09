import { AxiosResponse } from "axios";
import UserEndpoint from "../endpoints/UserEndpoint";

export default class UserRepository {
  api: UserEndpoint;

  constructor(api: UserEndpoint) {
    this.api = api;
  }

  async update(id: number, payload: FormData): Promise<AxiosResponse> {
    return this.api.update(id, payload);
  }

  async delete(id: number) {
    return this.api.delete(id);
  }

  async getProfile() {
    return this.api.getProfile();
  }
}
