import { Alert } from "@mui/material";
import { memo } from "react";

type Props = {
  error?: string | null;
  sx?: object;
};

export const ErrorAlert = memo(({ error, sx }: Props) => {
  if (!error) return null;

  return (
    <Alert
      variant="outlined"
      severity="error"
      color="error"
      sx={{ my: 1, ...sx }}
    >
      {error}
    </Alert>
  );
});
