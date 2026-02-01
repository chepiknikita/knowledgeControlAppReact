import { useCallback, useEffect, useState } from "react";
import { ApiFactory } from "../../../api";
import { User, UserCredentialsUpdate } from "../../../entities/user";

export function useUserProfile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const userService = ApiFactory.createUserService();
      const data = await userService.getProfile();

      setProfile(User.fromApi(data));
    } catch(reason) {
      const err = reason as any;
      setError(err.response?.data?.message || 'Ошибка загрузки данных пользователя');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAvatar = useCallback(
    async (file: File) => {
      if (!profile?.id) return;

      const userService = ApiFactory.createUserService();

      const formData = new FormData();
      formData.append("image", file);

      await userService.updateAvatar(profile.id, formData);
      await fetchProfile();
    },
    [profile?.id, fetchProfile],
  );

  const updateUserCredentials = useCallback(
    async (payload: UserCredentialsUpdate) => {
      if (Object.keys(payload).length === 0 || !profile?.id) return;

      const userService = ApiFactory.createUserService();

      await userService.updateCredentials(profile.id, payload);
      await fetchProfile();
    },
    [profile?.id, fetchProfile],
  );

  const deleteProfile = useCallback(async () => {
    if (!profile?.id) return;

    const userService = ApiFactory.createUserService();
    await userService.delete(profile.id);
  }, [profile?.id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    updateAvatar,
    deleteProfile,
    updateUserCredentials,
  };
}
