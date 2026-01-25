import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { useTaskFilters } from "./hooks/useTaskFilters";
import { usePaginatedTasks } from "./hooks/usePaginatedTasks";
import { TasksFilters } from "./ui/TaskFilters";
import { TaskList } from "../taskList/TaskList";

export default function HomeFeature(): JSX.Element {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<DateRange<Dayjs>>([null, null]);
  const [page, setPage] = useState<number>(1);

  const debouncedSearch = useDebounce(search, 300);
  const filters = useTaskFilters(debouncedSearch, date);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { tasks, pagination, loading } = usePaginatedTasks({
    scope: "all",
    filters,
    page,
    limit: 10,
  });

  const handleOpenTask = useCallback(
    (id: number) => navigate(`/task/${id}`),
    [navigate]
  );

  const handleCreateTask = useCallback(
    () => navigate("/constructor"),
    [navigate]
  );

  return (
    <Box>
      <TasksFilters
        search={search}
        date={date}
        onSearchChange={setSearch}
        onDateChange={setDate}
      />

      <TaskList
        loading={loading}
        tasks={tasks}
        pagination={pagination}
        onPageChange={setPage}
        onOpen={handleOpenTask}
        emptyText="Данных нет!"
        emptyAction={{
          label: "Конструктор",
          onClick: handleCreateTask,
        }}
      />
    </Box>
  );
}
