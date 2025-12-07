import { AxiosResponse } from "axios";
import { BaseRepositoryItem } from "../interfaces/base";

export abstract class BaseRepository<T> implements BaseRepositoryItem<T> {
  abstract getAll(id?: number): Promise<AxiosResponse<T[]>>;
  abstract getById(id: number): Promise<AxiosResponse<T>>;
  abstract create(item: Omit<T, "id">): Promise<AxiosResponse<T>>;
  abstract update(id: number, item: Partial<T>): Promise<AxiosResponse<T>>;
  abstract delete(id: number): Promise<AxiosResponse<void>>;
}
