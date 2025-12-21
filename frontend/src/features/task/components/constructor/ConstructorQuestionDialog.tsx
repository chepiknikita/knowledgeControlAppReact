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
import React, { useEffect } from "react";
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

export default function ConstructorQuestionDialog({
  openDialog,
  header,
  initailData,
  onSave,
  handleClose,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState(Question.empty);

  const isValidAnswers =
    question.answers.every((v) => v.text) &&
    question.answers.some((v) => v.isCorrect);

  const disabled =
    question.question && question.answers.length > 3 && isValidAnswers;

  React.useEffect(() => {
    if (initailData) {
      setQuestion(initailData);
    }
  }, [initailData]);

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleChange = (field: keyof Question, value: any) => {
    setQuestion((prev) => {
      return new Question({ ...prev, [field]: value });
    });
  };

  const handleQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("question", e.target.value);
  };

  const handleCheckboxChange = (
    id: number,
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.map((answer) =>
            answer.id === id
              ? new Answer({ ...answer, isCorrect: value.target.checked })
              : new Answer({ ...answer, isCorrect: false })
          ),
        })
    );
  };

  const handleInputChange = (id: number, value: string) => {
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.map((answer) =>
            answer.id === id ? new Answer({ ...answer, text: value }) : answer
          ),
        })
    );
  };

  const deleteAnswer = (id: number) => {
    handleChange(
      "answers",
      question.answers.filter((a) => a.id !== id)
    );
  };

  const addAnswer = () => {
    if (question.answers.length < 5) {
      setQuestion(
        (prev) =>
          new Question({
            ...prev,
            answers: [...prev.answers, Answer.empty()],
          })
      );
      console.log("e33", question);
    } else {
      console.log("max 5 вариантов ответа");
    }
  };

  const save = () => {
    onSave(new Question({ ...question, id: Date.now() }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
          onChange={handleQuestion}
          fullWidth
          size="small"
          sx={{ my: 1 }}
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
                aria-label="add"
                size="large"
                onClick={addAnswer}
                disableRipple
                sx={{ p: 0, my: 1 }}
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
                onChange={(e) => handleInputChange(answer.id, e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => deleteAnswer(answer.id)}
                      disableRipple
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
                      onChange={(e) => handleCheckboxChange(answer.id, e)}
                    />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        {/* TODO: autoFocus */}
        <DykButton title="Сохранить" disabled={!disabled} onClick={save} />
        <DykButton title="Отмена" onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
}
