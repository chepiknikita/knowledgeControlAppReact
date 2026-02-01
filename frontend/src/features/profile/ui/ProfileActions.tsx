import { memo } from "react";
import { Box } from "@mui/system";
import DykTypography from "../../../components/UI/typography/DykTypography";
import DykButton from "../../../components/UI/buttons/DykButton";

interface Props {
  login?: string;
  taskCount?: number;
  onEditProfile: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const ProfileActions = memo(
  ({ login, taskCount, onLogout, onDeleteAccount, onEditProfile }: Props): JSX.Element => {

    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <DykTypography text={login ?? "Неизвестно"} variant="h6" />
        <DykTypography
          text={`Количество тестов: ${taskCount ?? 0}`}
          variant="body2"
          sx={{ mb: 1 }}
        />

        <DykButton
          title="Редактировать"
          onClick={onEditProfile}
        />
        <DykButton
          title="Удалить аккаунт"
          sx={{ my: 1 }}
          onClick={onDeleteAccount}
        />
        <DykButton
          title="Выход"
          onClick={onLogout}
        />
      </Box>
    );
  },
);
