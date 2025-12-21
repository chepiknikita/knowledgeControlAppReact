import { IQuestion } from "../../entities/question";
import { QuestionResponse } from "../interfaces/questions";
import QuestionRepository from "../repositories/QuestionRepository";

export class QuestionService {
  constructor(private repository: QuestionRepository) {}

  async getAll(taskId: number): Promise<QuestionResponse[]> {
    try {
      const questions = (await this.repository.getAll(taskId)).data;
      return questions;
    } catch (error) {
      // throw new ApiException(error);
      console.error(error);
      return []
    }
  }

  async getById(id: number): Promise<QuestionResponse | null> {
    try {
      const question = (await this.repository.getById(id)).data;
      return question;
    } catch (error) {
      console.error(error);
      return null
    }
  }

  async create(payload: Partial<IQuestion>[]): Promise<QuestionResponse | null> {
    try {
      const question = (await this.repository.create(payload)).data;
      return question;
    } catch (error) {
      console.error(error);
      return null
    }
  }

  async update(id: number, payload: Partial<IQuestion>): Promise<void> {
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
