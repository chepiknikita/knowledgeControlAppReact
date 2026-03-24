import { useEffect, useState } from "react";
import axios from "axios";
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
    const controller = new AbortController();

    const id = Number(taskId);
    if (isNaN(id)) {
      setStatus("error");
      return;
    }

    const fetchTask = async () => {
      try {
        setStatus("loading");
        const data = await taskService.getById(id, controller.signal);
        setTask(data);
        setStatus("success");
      } catch (err: unknown) {
        if (axios.isCancel(err)) return;
        setStatus("error");
      }
    };

    fetchTask();

    return () => {
      controller.abort();
    };
  }, [taskId]);

  return { task, status };
}
