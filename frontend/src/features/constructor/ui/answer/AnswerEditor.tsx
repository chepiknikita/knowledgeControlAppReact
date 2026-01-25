import { Box } from "@mui/system";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import { Answer } from "../../../../entities/answer";
import { IconButton, Tooltip } from "@mui/material";
import { AnswerItem } from "./AnswerItem";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import { MAX_ANSWERS, MIN_ANSWERS } from "../../constants";

type Props = {
  answers: Answer[];
  onAdd: () => void;
  onUpdateText: (id: Answer["id"], text: string) => void;
  onRemove: (id: Answer["id"]) => void;
  onSetCorrect: (id: Answer["id"]) => void;
};

export function AnswersEditor({
  answers,
  onAdd,
  onUpdateText,
  onRemove,
  onSetCorrect,
}: Props) {
  return (
    <>
      <DykTypography
        text="Создайте варианты ответов на вопрос"
        variant="body2"
        align="center"
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip title="Добавить ответ">
          <IconButton
            size="large"
            disableRipple
            disabled={answers.length >= MAX_ANSWERS}
            onClick={onAdd}
          >
            <AddBoxSharpIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>

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
    </>
  );
}
