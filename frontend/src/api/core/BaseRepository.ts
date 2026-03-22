import { AxiosResponse } from "axios";
import { BaseRepositoryItem } from "../interfaces/base";

export abstract class BaseRepository<T> implements BaseRepositoryItem<T> {
  abstract getById(id: number): Promise<AxiosResponse<T>>;
  abstract create(item: unknown): Promise<AxiosResponse<T>>;
  abstract update(id: number, item: unknown): Promise<AxiosResponse<void>>;
  abstract delete(id: number): Promise<AxiosResponse<void>>;
}
