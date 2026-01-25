import { memo } from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const TasksSearch = memo(({ value, onChange }: Props): JSX.Element => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        value={value}
        placeholder="Поиск"
        size="small"
        sx={{ my: 1, width: 250 }}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
});
