import { memo } from "react";
import { Box } from "@mui/system";
import { Task } from "../../../entities/task";
import DykTypography from "../../../components/UI/typography/DykTypography";
import { TasksSearch } from "./TasksSearch";
import { PaginationResponse } from "../../../api/interfaces/paginationFilterPayload";
import { TaskList } from "../../taskList/TaskList";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
  tasks: Task[];
  pagination: PaginationResponse | null;
  onPageChange: (page: number) => void;
  onOpen: (taskId: number) => void;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => Promise<void>;
}

export const TasksSection = memo(
  ({
    search,
    onSearchChange,
    loading,
    tasks,
    pagination,
    onPageChange,
    onOpen,
    onEdit,
    onDelete,
  }: Props): JSX.Element => {
    return (
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <DykTypography text="Тесты" align="center" />

        <TasksSearch value={search} onChange={onSearchChange} />

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
