import { Box } from "@mui/material";
import React from "react";
import DykButton from "../../../../components/UI/buttons/DykButton";

interface Props {
  disabledPrev: boolean;
  disabledNext: boolean;
  textApplyBtn: string;
  handleBack: () => void;
  handleNext: () => void;
}
export default function ConstructorActions({
  disabledPrev,
  disabledNext,
  textApplyBtn,
  handleBack,
  handleNext,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <DykButton
        title="Назад"
        disabled={disabledPrev}
        onClick={handleBack}
      />
      <Box sx={{ flex: "1 1 auto" }} />
      <DykButton
        title={textApplyBtn}
        disabled={disabledNext}
        onClick={handleNext}
      />
    </Box>
  );
}
