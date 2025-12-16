import { AxiosInstance, AxiosResponse } from "axios";
import { TaskCreating, TaskEdit } from "../interfaces/tasks";

export default class TaskEnpoint {
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

  async create<T>(payload: TaskCreating): Promise<AxiosResponse<T>> {
    return this.api.post("tasks", payload);
  }

  async update<T>(id: number, payload: TaskEdit): Promise<AxiosResponse<T>> {
    return this.api.put(`tasks/${id}`, payload);
  }

  async delete<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.delete(`tasks/${id}`);
  }
}
