import { memo } from "react";
import { Box } from "@mui/system";
import { User } from "../../../entities/user";
import { AvatarUploader } from "./AvatarUploader";
import { ProfileActions } from "./ProfileActions";

interface Props {
  profile: User | null;
  onAvatarChange: (file: File) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const ProfileSidebar = memo(
  ({
    profile,
    onAvatarChange,
    onLogout,
    onDeleteAccount,
  }: Props): JSX.Element => {
    return (
      <Box sx={{ width: 256, mr: 5, flexShrink: 0 }}>
        <AvatarUploader src={profile?.avatarBase64} onChange={onAvatarChange} />

        <ProfileActions
          login={profile?.login}
          onLogout={onLogout}
          onDeleteAccount={onDeleteAccount}
        />
      </Box>
    );
  },
);
