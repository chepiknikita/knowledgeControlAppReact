import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo } from "react";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import DykButton from "../../../../components/UI/buttons/DykButton";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import { Question } from "../../../../entities/question";
import { Answer } from "../../../../entities/answer";

interface Props {
  openDialog: boolean;
  header: string;
  initailData?: Question;
  onSave: (question: Question) => void;
  handleClose: () => void;
}

const MAX_ANSWERS = 5;
const MIN_ANSWERS = 2;

export default function ConstructorQuestionDialog({
  openDialog,
  header,
  initailData,
  onSave,
  handleClose,
}: Props) {
  const [question, setQuestion] = React.useState(Question.empty);

  useEffect(() => {
    setQuestion(initailData ? new Question(initailData) : Question.empty());
  }, [initailData, openDialog]);

  const isValid = useMemo(() => {
    const hasQuestion = Boolean(question.question.trim());
    const validAnswersCount = question.answers.filter((a) =>
      a.text.trim(),
    ).length;
    const hasCorrect = question.answers.some((a) => a.isCorrect);

    return (
      hasQuestion &&
      validAnswersCount >= MIN_ANSWERS &&
      validAnswersCount <= MAX_ANSWERS &&
      hasCorrect
    );
  }, [question]);

  const setField = (field: keyof Question, value: any) =>
    setQuestion((prev) => new Question({ ...prev, [field]: value }));

  const updateAnswerText = (id: Answer["id"], text: string) => {
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.map((answer) =>
            answer.id === id ? new Answer({ ...answer, text }) : answer,
          ),
        }),
    );
  };

  const setCorrectAnswer = (id: Answer["id"]) => {
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.map((answer) =>
            answer.id === id
              ? new Answer({ ...answer, isCorrect: true })
              : new Answer({ ...answer, isCorrect: false }),
          ),
        }),
    );
  };

  const removeAnswer = (id: number | string) =>
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.filter((a) => a.id !== id),
        }),
    );

  const addAnswer = () => {
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: [...prev.answers, Answer.empty()],
        }),
    );
  };

  const save = () => {
    onSave(new Question(question));
    handleClose();
  };

  return (
    <Dialog
      open={openDialog}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
    >
      <DialogTitle component="div" variant="body1">
        {header}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          height: 400,
        }}
      >
        <TextField
          placeholder="Вопрос"
          value={question.question}
          fullWidth
          size="small"
          sx={{ my: 1 }}
          onChange={(e) => setField("question", e.target.value)}
        />
        <Box>
          <DykTypography
            text="Создайте варианты ответов на вопрос"
            variant="body2"
            align="center"
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Добавить ответ">
              <IconButton
                aria-label="add-answer"
                size="large"
                disableRipple
                sx={{ p: 0, my: 1 }}
                disabled={question.answers.length >= MAX_ANSWERS}
                onClick={addAnswer}
              >
                <AddBoxSharpIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {question.answers.map((answer) => (
          <Box
            key={answer.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControl variant="outlined" size="small" fullWidth>
              <OutlinedInput
                placeholder="Введите ответ"
                fullWidth
                sx={{ my: 1 }}
                value={answer.text}
                onChange={(e) => updateAnswerText(answer.id, e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="delete-answer"
                      size="large"
                      disableRipple
                      disabled={question.answers.length <= MIN_ANSWERS}
                      onClick={() => removeAnswer(answer.id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <Radio
                      disableRipple
                      checked={answer.isCorrect}
                      onChange={(e) => setCorrectAnswer(answer.id)}
                    />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <DykButton
          title="Сохранить"
          disabled={!isValid}
          onClick={save}
        />
        <DykButton
          title="Отмена"
          onClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
}
