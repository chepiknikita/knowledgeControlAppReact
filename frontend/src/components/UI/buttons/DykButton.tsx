import { Theme } from "@emotion/react";
import { Button, SxProps } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  onClick?: <T>(event: React.MouseEvent<T, MouseEvent>) => void;
}

export default function DykButton({ title, fullWidth, sx, disabled, variant = "contained", onClick }: Props) {
  return (
    <Button
      variant={variant}
      color="primary"
      fullWidth={fullWidth}
      sx={{ ...sx }}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
