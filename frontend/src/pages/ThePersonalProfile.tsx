import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Pagination,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DykTypography from "../components/UI/typography/DykTypography";
import DykButton from "../components/UI/buttons/DykButton";
import PreviewTask from "../features/task/components/PreviewTest";
import { ApiFactory } from "../api";
import { TaskResponse } from "../api/interfaces/tasks";
import { useNavigate } from "react-router-dom";

export default function PersonalProfile() {
  const taskService = ApiFactory.createTaskService();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [search, setSearch] = useState("");
  const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getAllByUserId(1);
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <Box sx={{ width: "256px", mr: 5, flexShrink: 0 }}>
        <ButtonBase
          component="label"
          role={undefined}
          tabIndex={-1}
          aria-label="Avatar image"
          sx={{
            borderRadius: "40px",
            "&:has(:focus-visible)": {
              outline: "2px solid",
              outlineOffset: "2px",
            },
          }}
        >
          <Avatar
            alt="Upload new avatar"
            src={avatarSrc}
            sx={{ width: 256, height: 256, mb: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            style={{
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            }}
            onChange={handleAvatarChange}
          />
        </ButtonBase>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DykTypography text="Nickname" variant="h6" />
          <DykTypography text="Количество тестов: 0" variant="body2" />
          <DykButton title="Удалить аккаунт" sx={{ my: 1 }} />
          <DykButton title="Выход" sx={{ my: 1 }} />
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box>
          <DykTypography text="Тесты" align="center" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Поиск"
              value={search}
              name="search"
              onChange={onSearch}
              size="small"
              sx={{ my: 1, width: "250px" }}
              type="text"
            />
          </Box>
        </Box>
        <Box sx={{ height: "100%" }}>
          {tasks.length ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
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
              <Pagination
                count={5}
                variant="outlined"
                shape="rounded"
                sx={{ mt: "auto" }}
              />
            </Box>
          ) : (
            <DykTypography
              text="Список тестов пуст!"
              align="center"
              sx={{ my: 2 }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
