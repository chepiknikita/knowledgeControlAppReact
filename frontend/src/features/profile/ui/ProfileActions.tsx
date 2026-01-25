import { memo } from "react";
import { Box } from "@mui/system";
import DykTypography from "../../../components/UI/typography/DykTypography";
import DykButton from "../../../components/UI/buttons/DykButton";
import { ConfirmDialog } from "../../../components/UI/dialogs/ConfirmDialog";
import { useConfirmAction } from "../../../shared/hooks/useConfirmAction";

interface Props {
  login?: string;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

type Action = "delete" | "logout";

const ACTION_MESSAGES: Record<Action, string> = {
  delete: "Вы уверены, что хотите удалить аккаунт?",
  logout: "Вы уверены, что хотите выйти?",
};

export const ProfileActions = memo(
  ({ login, onLogout, onDeleteAccount }: Props): JSX.Element => {
    const { open, message, openDialog, closeDialog, handleConfirm } =
      useConfirmAction<Action>({
        messages: ACTION_MESSAGES,
        onConfirm: (action) => {
          if (action === "delete") onDeleteAccount();
          if (action === "logout") onLogout();
        },
      });

    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <DykTypography text={login ?? "Неизвестно"} variant="h6" />
        <DykTypography text="Количество тестов: 0" variant="body2" />

        <DykButton
          title="Удалить аккаунт"
          sx={{ my: 1 }}
          onClick={() => openDialog("delete")}
        />
        <DykButton
          title="Выход"
          sx={{ my: 1 }}
          onClick={() => openDialog("logout")}
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
