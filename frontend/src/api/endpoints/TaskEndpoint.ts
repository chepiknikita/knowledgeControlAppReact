import { AxiosInstance, AxiosResponse } from "axios";

export default class TaskEndpoint {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getAll<T>(): Promise<AxiosResponse<T>> {
    return this.api.get("tasks");
  }

  async getAllByUserId<T>(userId: number): Promise<AxiosResponse<T>> {
    return this.api.get(`tasks/user/${userId}`);
  }

  async getById<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.get<T>(`tasks/${id}`);
  }

  async create<T>(payload: FormData): Promise<AxiosResponse<T>> {
    return this.api.post("tasks", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update<T>(id: number, payload: FormData): Promise<AxiosResponse<T>> {
    return this.api.put(`tasks/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async delete<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.delete(`tasks/${id}`);
  }
}
