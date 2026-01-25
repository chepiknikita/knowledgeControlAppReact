import React from "react";
import PageWrapper from "../components/wrappers/PageWrapper";
import { Task } from "../entities/task";
import { useParams } from "react-router-dom";
import { useTask } from "../features/constructor/hooks/useTask";
import { Box } from "@mui/system";
import TaskConstructor from "../features/constructor/TaskConstructor";

export default function TheTaskEdit() {
  const { id } = useParams();
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

  return (
    <PageWrapper>
      <TaskConstructor initialData={Task.fromApi(task)} />
    </PageWrapper>
  );
}
