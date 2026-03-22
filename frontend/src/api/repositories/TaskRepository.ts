import { AxiosResponse } from "axios";
import { BaseRepository } from "../core/BaseRepository";
import TaskEndpoint from "../endpoints/TaskEndpoint";
import { TaskResponse } from "../interfaces/tasks";
import { PagedResult, PaginationFilterPayload } from "../interfaces/paginationFilterPayload";

export default class TaskRepository extends BaseRepository<TaskResponse> {
  api: TaskEndpoint;
  constructor(api: TaskEndpoint) {
    super();
    this.api = api;
  }

  async getById(id: number): Promise<AxiosResponse<TaskResponse>> {
    return this.api.getById<TaskResponse>(id);
  }

  async create(payload: FormData): Promise<AxiosResponse<TaskResponse>> {
    return this.api.create<TaskResponse>(payload);
  }

  async update(id: number, payload: FormData): Promise<AxiosResponse<void>> {
    return this.api.update<void>(id, payload);
  }

  async delete(id: number): Promise<AxiosResponse<void>> {
    return this.api.delete<void>(id);
  }

  async getAllFiltered(
    payload: PaginationFilterPayload,
  ): Promise<AxiosResponse<PagedResult<TaskResponse>>> {
    return this.api.getAllFiltered(payload);
  }

  async getAllFilteredProfile(
    payload: PaginationFilterPayload,
  ): Promise<AxiosResponse<PagedResult<TaskResponse>>> {
    return this.api.getAllFilteredProfile(payload);
  }
}
