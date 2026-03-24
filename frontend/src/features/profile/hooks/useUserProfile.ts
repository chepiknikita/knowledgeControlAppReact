import { useCallback, useEffect, useState } from "react";
import { ApiFactory } from "../../../api";
import { User, UserCredentialsUpdate } from "../../../entities/user";
import { useAsyncAction } from "../../../shared/hooks/useAsync";

export function useUserProfile() {
  const [profile, setProfile] = useState<User | null>(null);

  const {
    run,
    loading,
    error,
  } = useAsyncAction();

  const fetchProfile = useCallback(async () => {
    return run(async () => {
      const userService = ApiFactory.createUserService();
      const data = await userService.getProfile();
      setProfile(User.fromApi(data));
    });
  }, [run]);

  const updateAvatar = useCallback(
    async (file: File) => {
      await run(async () => {
        if (!profile?.id) throw new Error('Профиль не загружен');

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
      await run(async () => {
        if (!profile?.id) throw new Error('Профиль не загружен');
        if (Object.keys(payload).length === 0) return;

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
      await run(async () => {
        if (!profile?.id) throw new Error('Профиль не загружен');

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
