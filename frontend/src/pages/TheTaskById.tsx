import React from "react";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import TaskProgress from "../features/task/TaskProgress";
import { useTask } from "../features/task/hooks/useTask";

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

  return <TaskProgress task={task} />;
}
