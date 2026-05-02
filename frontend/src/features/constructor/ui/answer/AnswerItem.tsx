import { Box } from "@mui/system";
import { IconButton, Radio, TextField, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Answer } from "../../../../entities/answer";

type Props = {
  answer: Answer;
  canDelete: boolean;
  onChangeText: (text: string) => void;
  onDelete: () => void;
  onSetCorrect: () => void;
};

export function AnswerItem({ answer, canDelete, onChangeText, onDelete, onSetCorrect }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 1,
        p: 1,
        borderRadius: "10px",
        border: "1px solid",
        borderColor: answer.isCorrect ? "#A78BFA" : "#E4E4E7",
        backgroundColor: answer.isCorrect ? "#F5F3FF" : "#FFFFFF",
        transition: "all 0.18s ease",
      }}
    >
      {/* Correct answer radio */}
      <Tooltip title={answer.isCorrect ? "Правильный ответ" : "Отметить правильным"}>
        <Box
          onClick={onSetCorrect}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            flexShrink: 0,
            color: answer.isCorrect ? "#6D28D9" : "#D4D4D8",
            transition: "color 0.15s ease",
            "&:hover": { color: "#7C3AED" },
          }}
        >
          {answer.isCorrect ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 22 }} />
          ) : (
            <Radio
              disableRipple
              checked={false}
              onChange={onSetCorrect}
              size="small"
              sx={{ p: 0, color: "inherit" }}
            />
          )}
        </Box>
      </Tooltip>

      {/* Answer text input */}
      <TextField
        placeholder="Введите вариант ответа"
        value={answer.text}
        size="small"
        fullWidth
        onChange={(e) => onChangeText(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "transparent",
            "& fieldset": { border: "none" },
            "&:hover fieldset": { border: "none" },
            "&.Mui-focused fieldset": { border: "none" },
          },
          "& .MuiOutlinedInput-input": {
            px: 0.5,
            py: 0.5,
            fontSize: "0.875rem",
            color: answer.isCorrect ? "#5B21B6" : "#18181B",
            fontWeight: answer.isCorrect ? 600 : 400,
          },
        }}
      />

      {/* Correct label */}
      {answer.isCorrect && (
        <Typography
          variant="caption"
          sx={{ color: "#7C3AED", fontWeight: 600, flexShrink: 0, fontSize: "0.7rem" }}
        >
          верный
        </Typography>
      )}

      {/* Delete button */}
      <IconButton
        size="small"
        disabled={!canDelete}
        onClick={onDelete}
        sx={{
          flexShrink: 0,
          color: canDelete ? "#F87171" : "#E4E4E7",
          borderRadius: "8px",
          transition: "all 0.15s ease",
          "&:hover": { color: "#DC2626", backgroundColor: "#FEF2F2" },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
