import { AxiosInstance, AxiosResponse } from "axios";
import { QuestionItem } from "../interfaces/questions";

export default class QuestionEnpoint {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getAll<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.get(`tasks/${id}/questions`);
  }

  async getById<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.get(`questions/${id}`);
  }

  async create<T>(payload: QuestionItem[]): Promise<AxiosResponse<T>> {
    return this.api.post("questions", payload);
  }

  async update<T>(id: number, payload: QuestionItem): Promise<AxiosResponse<T>> {
    return this.api.put(`questions/${id}`, payload);
  }

  async delete<T>(id: number): Promise<AxiosResponse<T>> {
    return this.api.delete(`questions/${id}`);
  }
}
