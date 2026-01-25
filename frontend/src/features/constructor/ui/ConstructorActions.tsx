import { Box } from "@mui/material";
import React from "react";
import DykButton from "../../../components/UI/buttons/DykButton";

interface Props {
  disabledPrev: boolean;
  disabledNext: boolean;
  textApplyBtn: string;
  onBack: () => void;
  onNext: () => void;
}
export default function ConstructorActions({
  disabledPrev,
  disabledNext,
  textApplyBtn,
  onBack,
  onNext,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <DykButton
        title="Назад"
        disabled={disabledPrev}
        onClick={onBack}
      />
      <Box sx={{ flex: "1 1 auto" }} />
      <DykButton
        title={textApplyBtn}
        disabled={disabledNext}
        onClick={onNext}
      />
    </Box>
  );
}
