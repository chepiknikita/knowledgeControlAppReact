import { Box } from "@mui/material";
import React from "react";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import DykButton from "../../../../components/UI/buttons/DykButton";

interface Props {
  disabled: boolean;
  onSave: () => void;
  handleBack: () => void;
}
export default function ConstructorFinish({
  disabled,
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
          text="Поздравляю! Тест полностью сформирован."
          variant="body2"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <DykButton title="Назад" disabled={disabled} onClick={handleBack} />
        <Box sx={{ flex: "1 1 auto" }} />
        <DykButton title="Сохранить" onClick={onSave} />
      </Box>
    </Box>
  );
}
