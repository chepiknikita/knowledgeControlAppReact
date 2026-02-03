import { memo } from "react";
import { Box } from "@mui/system";
import { Task } from "../../../entities/task";
import DykTypography from "../../../components/UI/typography/DykTypography";
import { TasksSearch } from "./TasksSearch";
import { PaginationResponse } from "../../../api/interfaces/paginationFilterPayload";
import { TaskList } from "../../taskList/TaskList";
import { ErrorAlert } from "../../../components/UI/alerts/ErrorAlert";

interface Props {
  search: string;
  loading: boolean;
  error: string | null;
  tasks: Task[];
  pagination: PaginationResponse | null;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onOpen: (taskId: number) => void;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => Promise<void>;
}

export const TasksSection = memo(
  ({
    search,
    loading,
    error,
    tasks,
    pagination,
    onSearchChange,
    onPageChange,
    onOpen,
    onEdit,
    onDelete,
  }: Props): JSX.Element => {
    return (
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <DykTypography text="Тесты" align="center" />
        <TasksSearch value={search} onChange={onSearchChange} />
        <ErrorAlert error={error} sx={{ mx: 2 }} />

        <TaskList
          loading={loading}
          tasks={tasks}
          pagination={pagination}
          showEdit={true}
          onPageChange={onPageChange}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Box>
    );
  },
);
