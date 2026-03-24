import { Box } from "@mui/material";
import React from "react";
import DykTypography from "../../../components/UI/typography/DykTypography";
import ConstructorActions from "./ConstructorActions";
import { ErrorAlert } from "../../../components/UI/alerts/ErrorAlert";

interface Props {
  loading: boolean;
  error: string | null;
  onSave: () => void;
  onBack: () => void;
}

export default function ConstructorFinish({
  loading,
  error,
  onSave,
  onBack,
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
        disabledPrev={loading}
        disabledNext={loading}
        onBack={onBack}
        onNext={onSave}
      />
    </Box>
  );
}
