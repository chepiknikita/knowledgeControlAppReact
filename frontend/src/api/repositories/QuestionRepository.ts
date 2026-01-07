import { AxiosResponse } from "axios";
import { BaseRepository } from "../core/BaseRepository";
import QuestionEndpoint from "../endpoints/QuestionEndpoint";
import { QuestionResponse } from "../interfaces/questions";
import { IQuestion } from "../../entities/question";

export default class QuestionRepository extends BaseRepository<any> {
  api: QuestionEndpoint;

  constructor(api: QuestionEndpoint) {
    super();
    this.api = api;
  }

  async getAll(taskId: number): Promise<AxiosResponse<QuestionResponse[]>> {
    return this.api.getAll<QuestionResponse[]>(taskId);
  }

  // Возможно не нужен
  async getById(id: number): Promise<AxiosResponse<QuestionResponse>> {
    return this.api.getById<QuestionResponse>(id);
  }

  async create(payload: Partial<IQuestion>[]): Promise<AxiosResponse<QuestionResponse>> {
    return this.api.create<QuestionResponse>(payload);
  }

  async update(id: number, payload: Partial<IQuestion>): Promise<AxiosResponse<void>> {
    return this.api.update<void>(id, payload);
  }

  async delete(id: number): Promise<AxiosResponse<void>> {
    return this.api.delete<void>(id);
  }
}
