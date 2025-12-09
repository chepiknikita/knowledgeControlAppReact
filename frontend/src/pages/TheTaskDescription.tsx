import React, { useEffect, useState } from "react";
import TaskDescription from "../features/task/TaskDescription";
import { ApiFactory } from "../api";
import { TaskItemById } from "../api/interfaces/tasks";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

export default function Task() {
  const taskService = ApiFactory.createTaskService();

  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<TaskItemById | null>(null);
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
