import React, { useEffect, useState } from "react";
import TaskDescription from "../features/task/TaskDescription";
import { ApiFactory } from "../api";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { TaskResponse } from "../api/interfaces/tasks";

export default function TheTaskDescription() {
  const taskService = ApiFactory.createTaskService();

  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<TaskResponse | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getById(+(id ?? 0));
        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      {task && !loading ? (
        <TaskDescription task={task} />
      ) : (
        <Box>Идет загрузка</Box>
      )}
    </>
  );
}
