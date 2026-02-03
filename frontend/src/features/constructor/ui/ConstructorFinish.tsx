import { Box } from "@mui/material";
import React from "react";
import DykTypography from "../../../components/UI/typography/DykTypography";
import ConstructorActions from "./ConstructorActions";
import { ErrorAlert } from "../../../components/UI/alerts/ErrorAlert";

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

      <ErrorAlert error={error} />

      <ConstructorActions
        textApplyBtn={loading ? "Сохранение..." : "Сохранить"}
        disabledPrev={disabled || loading}
        disabledNext={loading}
        onBack={handleBack}
        onNext={onSave}
      />
    </Box>
  );
}
