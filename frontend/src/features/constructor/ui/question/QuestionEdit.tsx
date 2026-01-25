import { TextField } from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function QuestionEdit({ value, onChange }: Props) {
  return (
    <TextField
      placeholder="Вопрос"
      value={value}
      fullWidth
      size="small"
      sx={{ my: 1 }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
