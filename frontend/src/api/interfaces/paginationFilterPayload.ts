import { Filter } from "./filter";
import { Sort } from "./sort";

export interface PaginationResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationFilterPayload {
  page?: number;
  limit?: number;
  filters?: Filter[];
  sorts?: Sort[];
  include?: string;
  fields?: string;
}

export interface PagedResult<T> {
  data: T[];
  pagination: PaginationResponse;
}
