import { AxiosResponse } from "axios";
import { BaseRepository } from "../core/BaseRepository";
import TaskEnpoint from "../endpoints/TaskEnpoint";
import {
  TaskCreating,
  TaskEdit,
  TaskItem,
  TaskItemById,
} from "../interfaces/tasks";

export default class TaskRepository extends BaseRepository<any> {
  api: TaskEnpoint;
  constructor(api: TaskEnpoint) {
    super();
    this.api = api;
  }

  async getAll(): Promise<AxiosResponse<TaskItem[]>> {
    return this.api.getAll<TaskItem[]>();
  }

  async getById(id: number): Promise<AxiosResponse<TaskItemById>> {
    return this.api.getById<TaskItemById>(id);
  }

  async create(payload: TaskCreating): Promise<AxiosResponse<TaskItem>> {
    return this.api.create<TaskItem>(payload);
  }

  async update(id: number, payload: TaskEdit): Promise<AxiosResponse<void>> {
    return this.api.update<void>(id, payload);
  }

  async delete(id: number): Promise<AxiosResponse<void>> {
    return this.api.delete<void>(id);
  }
}
