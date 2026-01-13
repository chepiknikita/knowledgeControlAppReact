import { Box } from "@mui/system";
import React from "react";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import { Button } from "@mui/material";

interface Props {
  title: string;
  onHome: () => void;
}

export default function ConstructorResult({ title, onHome}: Props) {
  return (
    <Box>
      <DykTypography
        text={title}
        variant="body1"
        align="center"
        sx={{ my: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={onHome}
          variant="text"
          sx={{
            mx: 1,
            color: "white",
            textTransform: "none",
            fontSize: 16,
          }}
        >
          На главную
        </Button>
      </Box>
    </Box>
  );
}
