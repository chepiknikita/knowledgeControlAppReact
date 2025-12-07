import { AxiosResponse } from "axios";
import { BaseRepositoryItem, ServiceItem } from "../interfaces/base";

export abstract class BaseService<T> implements ServiceItem<T> {
  constructor(protected repository: BaseRepositoryItem<T>) {}

  abstract getAll(): Promise<AxiosResponse<T[]>>;
  abstract getById(id: string): Promise<AxiosResponse<T>>;
}
