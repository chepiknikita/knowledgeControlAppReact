import { IconButton, InputAdornment, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Question } from "../../../../entities/question";

type Props = {
  question: Question;
  onEdit: () => void;
};

export function QuestionItem({ question, onEdit }: Props) {
  return (
    <TextField
      value={question.question}
      size="small"
      fullWidth
      sx={{ mb: 1 }}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="large" disableRipple onClick={onEdit}>
                <CreateIcon fontSize="inherit" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
