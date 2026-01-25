import { memo } from "react";
import { Box } from "@mui/system";
import { User } from "../../../entities/user";
import { AvatarUploader } from "./AvatarUploader";
import { ProfileActions } from "./ProfileActions";
import { ConfirmDialog } from "../../../components/UI/dialogs/ConfirmDialog";
import { useConfirmAction } from "../../../shared/hooks/useConfirmAction";

interface Props {
  profile: User | null;
  onAvatarChange: (file: File) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

type Action = "delete" | "logout" | "updateAvatar";

const ACTION_MESSAGES: Record<Action, string> = {
  delete: "Вы уверены, что хотите удалить аккаунт?",
  logout: "Вы уверены, что хотите выйти?",
  updateAvatar: "Вы уверены, что хотите сменить аватар?",
};

export const ProfileSidebar = memo(
  ({
    profile,
    onAvatarChange,
    onLogout,
    onDeleteAccount,
  }: Props): JSX.Element => {
    const { open, message, openDialog, closeDialog, handleConfirm } =
      useConfirmAction<Action, File>({
        messages: ACTION_MESSAGES,
        onConfirm: (action, payload) => {
        if (action === "delete") onDeleteAccount();
        if (action === "logout") onLogout();

        if (action === "updateAvatar" && payload) {
          onAvatarChange(payload);
        }
      },
      });

    return (
      <Box sx={{ width: 256, mr: 5, flexShrink: 0 }}>
        <AvatarUploader
          src={profile?.avatarBase64}
          onChange={(file) => openDialog("updateAvatar", file)}
        />

        <ProfileActions
          login={profile?.login}
          onLogout={() => openDialog("logout")}
          onDeleteAccount={() => openDialog("delete")}
        />

        <ConfirmDialog
          open={open}
          message={message}
          onCancel={closeDialog}
          onConfirm={handleConfirm}
        />
      </Box>
    );
  },
);
