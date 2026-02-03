import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { useTaskFilters } from "../home/hooks/useTaskFilters";
import { useUserProfile } from "./hooks/useUserProfile";
import { usePaginatedTasks } from "../home/hooks/usePaginatedTasks";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
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

  const {
    profile,
    error: profileError,
    updateAvatar,
    deleteProfile,
    updateUserCredentials,
  } = useUserProfile();

  const {
    tasks,
    pagination,
    loading,
    error: tasksError,
    deleteTask,
  } = usePaginatedTasks({
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
    [navigate],
  );

  const handleEditTask = useCallback(
    (id: number) => navigate(`/task/edit/${id}`),
    [navigate],
  );

  const handleUpdateCredentials = useCallback(
    async (payload: UserCredentialsUpdate) => {
      await updateUserCredentials(payload);
    },
    [updateUserCredentials],
  );

  const pageError = profileError || tasksError;

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
        loading={loading}
        error={pageError}
        tasks={tasks}
        pagination={pagination}
        onSearchChange={setSearch}
        onPageChange={setPage}
        onOpen={handleOpenTask}
        onEdit={handleEditTask}
        onDelete={deleteTask}
      />
    </Box>
  );
}
