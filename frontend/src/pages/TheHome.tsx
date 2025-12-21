import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DykDatePicker from "../components/UI/datePickers/DykDatePicker";
import PreviewTask from "../features/task/components/PreviewTest";
import { ApiFactory } from "../api";
import { TaskResponse } from "../api/interfaces/tasks";

export default function Home() {
  const navigate = useNavigate();
  const taskService = ApiFactory.createTaskService();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getAll();
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const onClickNoData = () => {
    navigate("/constructor");
  };

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DykDatePicker sx={{ width: "300px", mr: 2 }} />
        <TextField
          placeholder="Поиск"
          value={search}
          name="search"
          onChange={onSearch}
          size="small"
          sx={{ width: "300px" }}
          type="text"
        />
      </Box>
      <section>
        {!tasks.length ? (
          <Box
            sx={{
              margin: "16px auto",
              display: "flex",
              justifyContent: "center",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            <Box>
              Данных нет! Для создания теста перейдите в
              <Button
                onClick={onClickNoData}
                sx={{
                  textDecoration: "none",
                  textTransform: "none",
                  backgroundColor: "white",
                  mx: 1,
                  color: "black",
                }}
              >
                Конструктор
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              my: 1,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {tasks.map((task) => (
              <PreviewTask
                key={task.id}
                task={task}
                showEdit={true}
                handleOpen={() => navigate(`/task/description/${task.id}`)}
                handleEdit={() => navigate(`/task/edit/${task.id}`)}
              />
            ))}
          </Box>
        )}
      </section>
    </Box>
  );
}
