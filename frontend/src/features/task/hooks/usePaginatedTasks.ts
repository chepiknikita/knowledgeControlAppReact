import { useCallback, useEffect, useState } from 'react';
import { Filter } from '../../../api/interfaces/filter';
import { PaginationResponse } from '../../../api/interfaces/paginationFilterPayload';
import { Task } from '../../../entities/task';
import { ApiFactory } from '../../../api';
import { TaskResponse } from '../../../api/interfaces/tasks';

type TaskScope = 'all' | 'profile';

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
  error: unknown;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const taskService = ApiFactory.createTaskService();
      const payload = {
        page,
        limit,
        filters,
      };

      const response = scope === 'profile'
        ? await taskService.getAllFilteredProfile(payload)
        : await taskService.getAllFiltered(payload);

      const tasksData = response.data as TaskResponse[];

      setTasks(tasksData.map(Task.fromApi));
      setPagination(response.pagination);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [scope, page, limit, filters]);

  const deleteTask = useCallback(
    async (taskId: number) => {
      const taskService = ApiFactory.createTaskService();
      await taskService.delete(taskId);
      await fetchTasks();
    },
    [fetchTasks]
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
