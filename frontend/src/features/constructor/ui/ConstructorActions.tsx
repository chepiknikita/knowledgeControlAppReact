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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        pt: 2,
        mt: "auto",
        borderTop: "1px solid #F4F4F5",
        gap: 1.5,
      }}
    >
      <DykButton
        title="Назад"
        disabled={disabledPrev}
        variant="outlined"
        sx={{
          px: 2.5,
          gap: 0.75,
          "& .MuiButton-startIcon": { mr: 0.5 },
        }}
        onClick={onBack}
      />

      <Box sx={{ flex: "1 1 auto" }} />

      <DykButton
        title={textApplyBtn}
        disabled={disabledNext}
        variant="contained"
        sx={{
          px: 3,
          minWidth: 130,
          gap: 0.75,
        }}
        onClick={onNext}
      />
    </Box>
  );
}
