import { ITask } from "../../entities/task";
import { TaskResponse } from "../interfaces/tasks";
import TaskRepository from "../repositories/TaskRepository";
import urlService from "../serverUrl/urlService";

export class TaskService {
  constructor(private repository: TaskRepository) {}

  async getAll(): Promise<TaskResponse[]> {

    try {
      const tasks = (await this.repository.getAll()).data;
      return tasks.map((v) => ({ ...v, imageBase64: v.image ? urlService.getImageUrl(v.image) : '' }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllByUserId(userId: number): Promise<TaskResponse[]> {
    try {
      const tasks = (await this.repository.getAllByUserId(userId)).data;
      return tasks.map((v) => ({ ...v, imageBase64: v.image ? urlService.getImageUrl(v.image) : '' }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getById(id: number): Promise<TaskResponse | null> {
    try {
      const task = (await this.repository.getById(id)).data;
      return task;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(payload: FormData): Promise<TaskResponse | null> {
    try {
      const task = (await this.repository.create(payload)).data;
      return task;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(id: number, payload: FormData): Promise<void> {
    try {
      await this.repository.update(id, payload);
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error(error);
    }
  }
}
