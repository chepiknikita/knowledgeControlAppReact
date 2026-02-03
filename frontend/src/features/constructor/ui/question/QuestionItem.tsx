import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Question } from "../../../../entities/question";
import { Box } from "@mui/system";

type Props = {
  question: Question;
  number: number;
  onEdit: () => void;
};

export function QuestionItem({ question, number, onEdit }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
      <Typography>{number}.</Typography>
      <TextField
        value={question.question}
        size="small"
        fullWidth
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
    </Box>
  );
}
