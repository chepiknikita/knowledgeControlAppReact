import { PagedResult, PaginationFilterPayload } from "../interfaces/paginationFilterPayload";
import { TaskResponse } from "../interfaces/tasks";
import TaskRepository from "../repositories/TaskRepository";

export class TaskService {
  constructor(private repository: TaskRepository) {}

  async getById(id: number, signal?: AbortSignal): Promise<TaskResponse> {
    return (await this.repository.getById(id, signal)).data;
  }

  async create(payload: FormData): Promise<TaskResponse> {
    return (await this.repository.create(payload)).data;
  }

  async update(id: number, payload: FormData): Promise<void> {
    await this.repository.update(id, payload);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getAllFiltered(payload: PaginationFilterPayload): Promise<PagedResult<TaskResponse>> {
    return (await this.repository.getAllFiltered(payload)).data;
  }

  async getAllFilteredProfile(payload: PaginationFilterPayload): Promise<PagedResult<TaskResponse>> {
    return (await this.repository.getAllFilteredProfile(payload)).data;
  }
}
