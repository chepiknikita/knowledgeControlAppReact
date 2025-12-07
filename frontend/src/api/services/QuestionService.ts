import { QuestionItem } from "../interfaces/questions";
import QuestionRepository from "../repositories/QuestionRepository";

export class QuestionService {
  constructor(private repository: QuestionRepository) {}

  async getAll(taskId: number): Promise<QuestionItem[]> {
    try {
      const questions = (await this.repository.getAll(taskId)).data;
      return questions;
    } catch (error) {
      // throw new ApiException(error);
      console.error(error);
      return []
    }
  }

  async getById(id: number): Promise<QuestionItem | null> {
    try {
      const question = (await this.repository.getById(id)).data;
      return question;
    } catch (error) {
      console.error(error);
      return null
    }
  }

  async create(payload: QuestionItem[]): Promise<QuestionItem | null> {
    try {
      const question = (await this.repository.create(payload)).data;
      return question;
    } catch (error) {
      console.error(error);
      return null
    }
  }

  async update(id: number, payload: QuestionItem): Promise<void> {
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
