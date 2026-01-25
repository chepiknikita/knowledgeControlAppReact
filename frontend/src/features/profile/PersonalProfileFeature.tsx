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

export default function PersonalProfileFeature(): JSX.Element {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);
  const filters = useTaskFilters(debouncedSearch, [null, null]);

  useEffect(() => setPage(1), [filters]);

  const { profile, updateAvatar, deleteProfile } = useUserProfile();

  const { tasks, pagination, loading, deleteTask } = usePaginatedTasks({
    scope: "profile",
    filters,
    page,
    limit: 10,
  });

  const handleDeleteAccount = useCallback(async () => {
    await logout();
    await deleteProfile();
  }, [logout, deleteProfile]);

  const handleOpenTask = useCallback(
    (id: number) => navigate(`/task/${id}`),
    [navigate]
  );

  const handleEditTask = useCallback(
    (id: number) => navigate(`/task/edit/${id}`),
    [navigate]
  );

  return (
    <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <ProfileSidebar
        profile={profile}
        onAvatarChange={updateAvatar}
        onLogout={logout}
        onDeleteAccount={handleDeleteAccount}
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
    </Box>
  );
}
