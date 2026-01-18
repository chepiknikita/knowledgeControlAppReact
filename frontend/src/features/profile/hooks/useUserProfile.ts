import { useCallback, useEffect, useState } from "react";
import { ApiFactory } from "../../../api";
import { User } from "../../../entities/user";

export function useUserProfile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      const userService = ApiFactory.createUserService();
      const data = await userService.getProfile();

      setProfile(User.fromApi(data));
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

      await userService.update(profile.id, formData);
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
    updateAvatar,
    deleteProfile,
  };
}
