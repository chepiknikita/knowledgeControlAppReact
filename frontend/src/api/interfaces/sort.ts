export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface Sort {
  field: string;
  order: SortOrder;
}
