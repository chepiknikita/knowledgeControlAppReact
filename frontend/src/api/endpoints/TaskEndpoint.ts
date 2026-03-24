import { AxiosInstance, AxiosResponse } from "axios";
import {
  PagedResult,
  PaginationFilterPayload,
} from "../interfaces/paginationFilterPayload";
import { TaskResponse } from "../interfaces/tasks";

export default class TaskEndpoint {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getById<T>(id: number, signal?: AbortSignal): Promise<AxiosResponse<T>> {
    return this.api.get<T>(`tasks/${id}`, { signal });
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

  async getAllFiltered(
    payload: PaginationFilterPayload,
  ): Promise<AxiosResponse<PagedResult<TaskResponse>>> {
    return this.api.post("tasks/filter", payload);
  }

  async getAllFilteredProfile(
    payload: PaginationFilterPayload,
  ): Promise<AxiosResponse<PagedResult<TaskResponse>>> {
    return this.api.post("tasks/filter/user", payload);
  }
}
