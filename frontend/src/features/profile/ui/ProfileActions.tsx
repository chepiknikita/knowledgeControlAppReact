import { memo } from "react";
import { Box } from "@mui/system";
import DykTypography from "../../../components/UI/typography/DykTypography";
import DykButton from "../../../components/UI/buttons/DykButton";

interface Props {
  login?: string;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export const ProfileActions = memo(
  ({ login, onLogout, onDeleteAccount }: Props): JSX.Element => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <DykTypography text={login ?? "Неизвестно"} variant="h6" />
        <DykTypography text="Количество тестов: 0" variant="body2" />

        <DykButton
          title="Удалить аккаунт"
          sx={{ my: 1 }}
          onClick={onDeleteAccount}
        />
        <DykButton title="Выход" sx={{ my: 1 }} onClick={onLogout} />
      </Box>
    );
  },
);
