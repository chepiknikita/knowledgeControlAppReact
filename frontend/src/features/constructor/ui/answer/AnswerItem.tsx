import { FormControl, IconButton, InputAdornment, OutlinedInput, Radio } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Answer } from "../../../../entities/answer";

type Props = {
  answer: Answer;
  canDelete: boolean;
  onChangeText: (text: string) => void;
  onDelete: () => void;
  onSetCorrect: () => void;
};

export function AnswerItem({
  answer,
  canDelete,
  onChangeText,
  onDelete,
  onSetCorrect,
}: Props) {
  return (
    <FormControl variant="outlined" size="small" fullWidth>
      <OutlinedInput
        placeholder="Введите ответ"
        sx={{ my: 1 }}
        value={answer.text}
        onChange={(e) => onChangeText(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Radio
              disableRipple
              checked={answer.isCorrect}
              onChange={onSetCorrect}
            />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="large"
              disableRipple
              disabled={!canDelete}
              onClick={onDelete}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
