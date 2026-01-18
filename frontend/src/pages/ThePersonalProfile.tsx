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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import { useDebounce } from "../shared/hooks/useDebounce";
import { useTaskFilters } from "../features/task/hooks/useTaskFilters";
import { useUserProfile } from "../features/profile/hooks/useUserProfile";
import { usePaginatedTasks } from "../features/task/hooks/usePaginatedTasks";

export default function PersonalProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedSearch = useDebounce(search, 300);
  const filters = useTaskFilters(debouncedSearch, [null, null]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { profile, updateAvatar, deleteProfile } = useUserProfile();

  const { tasks, pagination, loading, deleteTask } = usePaginatedTasks({
    scope: 'profile',
    filters,
    page,
    limit,
  });

  const handleDeleteAccount = async () => {
    await logout();
    await deleteProfile();
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
            src={profile?.avatarBase64}
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) updateAvatar(file);
            }}
          />
        </ButtonBase>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DykTypography text={profile?.login ?? " Неизвестно"} variant="h6" />
          <DykTypography text="Количество тестов: 0" variant="body2" />
          <DykButton
            title="Удалить аккаунт"
            sx={{ my: 1 }}
            onClick={handleDeleteAccount}
          />
          <DykButton title="Выход" sx={{ my: 1 }} onClick={logout} />
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <DykTypography text="Тесты" align="center" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            placeholder="Поиск"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            type="text"
            sx={{ my: 1, width: "250px" }}
          />
        </Box>

        {loading ? (
          <Box textAlign="center">Загрузка...</Box>
        ) : !tasks.length ? (
          <DykTypography
            text="Список тестов пуст!"
            align="center"
            sx={{ my: 2 }}
          />
        ) : (
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
                  handleOpen={() => navigate(`/task/${task.id}`)}
                  handleEdit={() => navigate(`/task/edit/${task.id}`)}
                  handleDelete={() => deleteTask(task.id as number)}
                />
              ))}
            </Box>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                page={pagination.currentPage}
                count={pagination.totalPages}
                onChange={(_, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
                sx={{ mt: "auto" }}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
