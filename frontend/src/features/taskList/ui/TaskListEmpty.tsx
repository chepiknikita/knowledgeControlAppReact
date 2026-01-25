import { memo } from "react";
import { Box, Button } from "@mui/material";

interface Props {
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const TaskListEmpty = memo(({ text, action }: Props): JSX.Element => (
  <Box
    sx={{
      my: 2,
      display: "flex",
      justifyContent: "center",
      fontFamily: "monospace",
      fontSize: 14,
    }}
  >
    <Box>
      {text}
      {action && (
        <Button
          onClick={action.onClick}
          sx={{ textTransform: "none", mx: 1 }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  </Box>
));
