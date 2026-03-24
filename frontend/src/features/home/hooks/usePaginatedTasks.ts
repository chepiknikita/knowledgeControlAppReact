import { useCallback, useEffect, useState } from "react";
import { Filter } from "../../../api/interfaces/filter";
import { PaginationResponse } from "../../../api/interfaces/paginationFilterPayload";
import { Task } from "../../../entities/task";
import { ApiFactory } from "../../../api";
import { useAsyncAction } from "../../../shared/hooks/useAsync";

type TaskScope = "all" | "profile";

interface Props {
  scope: TaskScope;
  filters: Filter[];
  page: number;
  limit: number;
}

interface UsePaginatedTasksResult {
  tasks: Task[];
  pagination: PaginationResponse | null;
  loading: boolean;
  error: string | null;
  deleteTask: (taskId: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export function usePaginatedTasks({
  scope,
  filters,
  page,
  limit,
}: Props): UsePaginatedTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse | null>(null);

  const {
    run,
    loading,
    error,
  } = useAsyncAction();

  const fetchTasks = useCallback(() => {
    return run(async () => {
      const taskService = ApiFactory.createTaskService();

      const payload = {
        page,
        limit,
        filters,
        include: "user",
        fields: "user.id,user.login,user.avatar",
      }

      const response =
        scope === 'profile'
          ? await taskService.getAllFilteredProfile(payload)
          : await taskService.getAllFiltered(payload);

      setTasks(response.data.map(Task.fromApi));
      setPagination(response.pagination);
    });
  }, [scope, page, limit, filters, run]);

  const deleteTask = useCallback(
    async (taskId: number) => {
      await run(async () => {
        const taskService = ApiFactory.createTaskService();
        await taskService.delete(taskId);
        await fetchTasks();
      },
      { withLoading: false },
      );
    },
    [fetchTasks, run]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    pagination,
    loading,
    error,
    deleteTask,
    refetch: fetchTasks,
  };
}
