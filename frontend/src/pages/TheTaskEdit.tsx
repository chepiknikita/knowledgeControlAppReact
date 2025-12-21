import React, { useEffect, useState } from "react";
import PageWrapper from "../components/wrappers/PageWrapper";
import TaskConstructor from "../features/task/TaskConstructor";
import { ApiFactory } from "../api";
import { Task } from "../entities/task";
import { useParams } from "react-router-dom";

export default function TheTaskEdit() {
  const taskService = ApiFactory.createTaskService();

  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<Task | undefined>();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await taskService.getById(+(id ?? 0));
        if (data) {
          setTask(Task.fromApi(data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <PageWrapper>
      <TaskConstructor
        loading={loading}
        initialData={task}
      />
    </PageWrapper>
  );
}
