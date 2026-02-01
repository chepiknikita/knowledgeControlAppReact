import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { useTaskFilters } from "../home/hooks/useTaskFilters";
import { useUserProfile } from "./hooks/useUserProfile";
import { usePaginatedTasks } from "../home/hooks/usePaginatedTasks";
import { Box } from "@mui/system";
import { Alert, Divider } from "@mui/material";
import { ProfileSidebar } from "./ui/ProfileSidebar";
import { TasksSection } from "./ui/TasksSection";
import { UserCredentialsUpdate } from "../../entities/user";

export default function PersonalProfileFeature(): JSX.Element {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);
  const filters = useTaskFilters(debouncedSearch, [null, null]);

  useEffect(() => setPage(1), [filters]);

   //TODO вывод ошибки.
  const { profile, error, updateAvatar, deleteProfile, updateUserCredentials } = useUserProfile();

   //TODO вывод ошибки.
  const { tasks, pagination, loading, deleteTask } = usePaginatedTasks({
    scope: "profile",
    filters,
    page,
    limit: 10,
  });

  const handleDeleteAccount = useCallback(async () => {
    await deleteProfile();
    await logout();
  }, [logout, deleteProfile]);

  const handleOpenTask = useCallback(
    (id: number) => navigate(`/task/${id}`),
    [navigate]
  );

  const handleEditTask = useCallback(
    (id: number) => navigate(`/task/edit/${id}`),
    [navigate]
  );

  const handleUpdateCredentials = useCallback(async (payload: UserCredentialsUpdate) => {
    await updateUserCredentials(payload)
  }, [updateUserCredentials]);

  return (
    <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <ProfileSidebar
        profile={profile}
        onAvatarChange={updateAvatar}
        onLogout={logout}
        onDeleteAccount={handleDeleteAccount}
        onUpdateUserCredentials={handleUpdateCredentials}
      />

      <Divider orientation="vertical" flexItem />

      <TasksSection
        search={search}
        onSearchChange={setSearch}
        loading={loading}
        tasks={tasks}
        pagination={pagination}
        onPageChange={setPage}
        onOpen={handleOpenTask}
        onEdit={handleEditTask}
        onDelete={deleteTask}
      />
      
        {error &&
          <Alert
            variant="outlined"
            severity="error"
            color="error"
            sx={{ my:1 }}
          >
            {error}
          </Alert>}
    </Box>
  );
}
