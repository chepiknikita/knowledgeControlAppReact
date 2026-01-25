import React from "react";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useTask } from "../features/constructor/hooks/useTask";
import { Task } from "../entities/task";
import TaskRunFeature from "../features/taskRun/TaskRunFeature";

export default function TheTaskDescription() {
  const { id } = useParams<{ id: string }>();
  const { task, status } = useTask(id);

  if (status === "loading") {
    return <Box>Идет загрузка...</Box>;
  }

  if (status === "error") {
    return <Box>Ошибка загрузки задачи</Box>;
  }

  if (!task) {
    return null;
  }

  return <TaskRunFeature task={Task.fromApi(task)}/>;
}
