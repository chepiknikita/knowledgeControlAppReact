import { useEffect, useState } from "react";
import { TaskResponse } from "../../../api/interfaces/tasks";
import { ApiFactory } from "../../../api";

export function useTask(taskId?: string) {
  const [task, setTask] = useState<TaskResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

  useEffect(() => {
    if (!taskId) return;

    const taskService = ApiFactory.createTaskService();

    const fetchTask = async () => {
      try {
        setStatus("loading");
        const data = await taskService.getById(Number(taskId));
        setTask(data);
        setStatus("success");
      } catch (err) {
         //TODO вывод ошибки.
        console.error(err);
        setStatus("error");
      }
    };

    fetchTask();
  }, [taskId]);

  return { task, status };
}
