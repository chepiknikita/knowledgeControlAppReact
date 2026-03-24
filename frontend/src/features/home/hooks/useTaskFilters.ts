import { useMemo } from "react";
import { Dayjs } from "dayjs";
import { Filter, FilterOperator } from "../../../api/interfaces/filter";

export function useTaskFilters(
  search: string,
  dateRange: [Dayjs | null, Dayjs | null],
): Filter[] {
  const [start, end] = dateRange;

  return useMemo(() => {
    const filters: Filter[] = [];

    if (search.trim()) {
      filters.push({
        field: "name",
        operator: FilterOperator.CONTAINS,
        value: search.trim(),
        valueType: "string",
      });
    }

    if (start && end) {
      filters.push({
        field: "createdAt",
        operator: FilterOperator.BETWEEN,
        value: start.startOf("day").toISOString(),
        value2: end.endOf("day").toISOString(),
        valueType: "date",
      });
    } else if (start) {
      filters.push({
        field: "createdAt",
        operator: FilterOperator.GREATER_THAN_OR_EQUAL,
        value: start.startOf("day").toISOString(),
        valueType: "date",
      });
    } else if (end) {
      filters.push({
        field: "createdAt",
        operator: FilterOperator.LESS_THAN_OR_EQUAL,
        value: end.endOf("day").toISOString(),
        valueType: "date",
      });
    }

    return filters;
  }, [search, start, end]);
}
