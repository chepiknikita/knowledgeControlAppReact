import { Alert, Box } from "@mui/material";
import React from "react";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import DykButton from "../../../../components/UI/buttons/DykButton";

interface Props {
  disabled: boolean;
  loading: boolean;
  error: string | null
  onSave: () => void;
  handleBack: () => void;
}
export default function ConstructorFinish({
  disabled,
  loading,
  error,
  onSave,
  handleBack,
}: Props) {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DykTypography
          text="Поздравляю! Тест сформирован. Осталось совсем немного!"
          variant="body2"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <DykButton
          title="Назад"
          disabled={disabled}
          onClick={handleBack}
        />
        <Box sx={{ flex: "1 1 auto" }} />
        <DykButton
          title={loading ? "Сохранение..." : "Сохранить"}
          disabled={loading}
          onClick={onSave}
          // endIcon={loading ? <CircularProgress size={16} /> : undefined}
        />
      </Box>
    </Box>
  );
}
