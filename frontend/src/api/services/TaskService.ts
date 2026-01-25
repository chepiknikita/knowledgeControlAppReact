import { PaginationFilterPayload } from "../interfaces/paginationFilterPayload";
import { TaskResponse } from "../interfaces/tasks";
import TaskRepository from "../repositories/TaskRepository";

export class TaskService {
  constructor(private repository: TaskRepository) {}

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

  async getAllFiltered(payload: PaginationFilterPayload): Promise<any> {
    try {
      const response = (await this.repository.getAllFiltered(payload)).data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllFilteredProfile(payload: PaginationFilterPayload): Promise<any> {
    try {
      const response = (await this.repository.getAllFilteredProfile(payload))
        .data;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
