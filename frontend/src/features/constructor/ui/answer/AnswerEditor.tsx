import { Box } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Answer } from "../../../../entities/answer";
import { AnswerItem } from "./AnswerItem";
import { MAX_ANSWERS, MIN_ANSWERS } from "../../constants";

type Props = {
  answers: Answer[];
  onAdd: () => void;
  onUpdateText: (id: Answer["id"], text: string) => void;
  onRemove: (id: Answer["id"]) => void;
  onSetCorrect: (id: Answer["id"]) => void;
};

export function AnswersEditor({ answers, onAdd, onUpdateText, onRemove, onSetCorrect }: Props) {
  const canAdd = answers.length < MAX_ANSWERS;

  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 2 }} />

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#71717A", letterSpacing: "0.04em" }}>
          ВАРИАНТЫ ОТВЕТОВ
        </Typography>
        <Typography variant="caption" sx={{ color: "#A1A1AA" }}>
          {answers.length}/{MAX_ANSWERS}
        </Typography>
      </Box>

      {/* Hint */}
      <Typography variant="caption" sx={{ color: "#A78BFA", display: "block", mb: 1.5, fontSize: "0.75rem" }}>
        Отметьте правильный ответ нажатием на иконку слева
      </Typography>

      {/* Answer list */}
      {answers.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          canDelete={answers.length > MIN_ANSWERS}
          onChangeText={(text) => onUpdateText(answer.id, text)}
          onDelete={() => onRemove(answer.id)}
          onSetCorrect={() => onSetCorrect(answer.id)}
        />
      ))}

      {/* Add answer button */}
      {canAdd && (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{
            mt: 0.5,
            py: 0.75,
            borderStyle: "dashed",
            borderColor: "#E4E4E7",
            color: "#71717A",
            fontWeight: 500,
            fontSize: "0.8rem",
            borderRadius: "10px",
            "&:hover": {
              borderStyle: "dashed",
              borderColor: "#C4B5FD",
              backgroundColor: "#F5F3FF",
              color: "#7C3AED",
            },
          }}
        >
          Добавить вариант
        </Button>
      )}
    </Box>
  );
}
