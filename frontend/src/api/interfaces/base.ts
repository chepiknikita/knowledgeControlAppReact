import { AxiosResponse } from "axios";

export interface BaseRepositoryItem<T> {
  getById(id: number): Promise<AxiosResponse<T>>;
  create(item: Omit<T, "id">): Promise<AxiosResponse<T>>;
  update(id: number, item: unknown): Promise<AxiosResponse<void>>;
  delete(id: number): Promise<AxiosResponse<void>>;
}
