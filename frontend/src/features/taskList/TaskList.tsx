import { memo } from "react";
import { Box, Pagination } from "@mui/material";
import { Task } from "../../entities/task";
import { PaginationResponse } from "../../api/interfaces/paginationFilterPayload";
import { TaskListEmpty } from "./ui/TaskListEmpty";
import { TaskListGrid } from "./ui/TaskListGrid";

interface Props {
  loading: boolean;
  tasks: Task[];
  pagination: PaginationResponse | null;
  onPageChange: (page: number) => void;

  onOpen: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;

  emptyText?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };

  showEdit?: boolean;
}

export const TaskList = memo(
  ({
    loading,
    tasks,
    pagination,
    onPageChange,
    onOpen,
    onEdit,
    onDelete,
    emptyText = "Список задач пуст",
    emptyAction,
    showEdit = false,
  }: Props): JSX.Element => {
    if (loading) {
      return <Box textAlign="center">Загрузка...</Box>;
    }

    if (!tasks.length) {
      return (
        <TaskListEmpty text={emptyText} action={emptyAction} />
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <TaskListGrid
          tasks={tasks}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
          showEdit={showEdit}
        />

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={pagination.currentPage}
            count={pagination.totalPages}
            // variant="outlined"
            // shape="rounded"
            sx={{ mt: "auto" }}
            onChange={(_, page) => onPageChange(page)}
          />
        )}
      </Box>
    );
  }
);
