import {
  TaskCreating,
  TaskEdit,
  TaskItem,
  TaskItemById,
} from "../interfaces/tasks";
import TaskRepository from "../repositories/TaskRepository";

export class TaskService {
  constructor(private repository: TaskRepository) {}

  async getAll(): Promise<TaskItem[]> {
    try {
      const tasks = (await this.repository.getAll()).data;
      return tasks;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllByUserId(userId: number): Promise<TaskItem[]> {
    try {
      const tasks = (await this.repository.getAllByUserId(userId)).data;
      return tasks;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getById(id: number): Promise<TaskItemById | null> {
    try {
      const task = (await this.repository.getById(id)).data;
      return task;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(payload: TaskCreating): Promise<TaskItem | null> {
    try {
      const task = (await this.repository.create(payload)).data;
      return task;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(id: number, payload: TaskEdit): Promise<void> {
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
