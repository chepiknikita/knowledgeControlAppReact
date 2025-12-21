import { AxiosResponse } from "axios";
import { BaseRepository } from "../core/BaseRepository";
import TaskEnpoint from "../endpoints/TaskEnpoint";
import { TaskResponse } from "../interfaces/tasks";
import { ITask } from "../../entities/task";

export default class TaskRepository extends BaseRepository<any> {
  api: TaskEnpoint;
  constructor(api: TaskEnpoint) {
    super();
    this.api = api;
  }

  async getAll(): Promise<AxiosResponse<TaskResponse[]>> {
    return this.api.getAll<TaskResponse[]>();
  }

  async getAllByUserId(userId: number): Promise<AxiosResponse<TaskResponse[]>> {
    return this.api.getAllByUserId<TaskResponse[]>(userId);
  }

  async getById(id: number): Promise<AxiosResponse<TaskResponse>> {
    return this.api.getById<TaskResponse>(id);
  }

  async create(payload: FormData): Promise<AxiosResponse<TaskResponse>> {
    return this.api.create<TaskResponse>(payload);
  }

  async update(id: number, payload: Partial<ITask>): Promise<AxiosResponse<void>> {
    return this.api.update<void>(id, payload);
  }

  async delete(id: number): Promise<AxiosResponse<void>> {
    return this.api.delete<void>(id);
  }
}
