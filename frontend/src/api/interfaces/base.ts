import { AxiosResponse } from "axios";

export interface BaseRepositoryItem<T> {
  getAll(id?: number): Promise<AxiosResponse<T[]>>;
  getById(id: number): Promise<AxiosResponse<T>>;
  create(item: Omit<T, "id">): Promise<AxiosResponse<T>>;
  update(id: number, item: Partial<T>): Promise<AxiosResponse<T>>;
  delete(id: number): Promise<AxiosResponse<void>>;
}

export interface ServiceItem<T> {
  getAll(): Promise<AxiosResponse<T[]>>;
  getById(id: string): Promise<AxiosResponse<T>>;
}
