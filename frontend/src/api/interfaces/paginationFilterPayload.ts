import { Filter } from "./filter";
import { Sort } from "./sort";

export interface PaginationFilterPayload {
  page?: number;
  limit?: number;
  filters?: Filter[];
  sorts?: Sort[];
  include?: string;
  fields?: string;
}