import { useCallback, useEffect, useState } from "react";
import { ApiFactory } from "../../../api";
import { User, UserCredentialsUpdate } from "../../../entities/user";
import { useAsync } from "../../../shared/hooks/useAsync";

export function useUserProfile() {
  const [profile, setProfile] = useState<User | null>(null);

  const {
    run,
    loading,
    error,
  } = useAsync();

  const fetchProfile = useCallback(async () => {
    return run(async () => {
      const userService = ApiFactory.createUserService();
      const data = await userService.getProfile();
      setProfile(User.fromApi(data));
    });
  }, [run]);

  const updateAvatar = useCallback(
    async (file: File) => {
      if (!profile?.id) return;

      await run(async () => {
        const userService = ApiFactory.createUserService();

        const formData = new FormData();
        formData.append('image', file);

        const data = await userService.updateAvatar(profile.id, formData);
        setProfile(User.fromApi(data));
      },
      { withLoading: false },
      );
    },
    [profile?.id, run]
  );

  const updateUserCredentials = useCallback(
    async (payload: UserCredentialsUpdate) => {
      if (!profile?.id || Object.keys(payload).length === 0) return;

      await run(async () => {
        const userService = ApiFactory.createUserService();

        const data = await userService.updateCredentials(profile.id, payload);
        setProfile(User.fromApi(data));
      },
      { withLoading: false },
      );
    },
    [profile?.id, run]
  );

  const deleteProfile = useCallback(
    async () => {
      if (!profile?.id) return;

      await run(async () => {
        const userService = ApiFactory.createUserService();
        await userService.delete(profile.id);
        setProfile(null);
      },
      { withLoading: false },      
      );
    },
    [profile?.id, run]
  );

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
