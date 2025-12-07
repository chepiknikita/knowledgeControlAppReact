import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  TextField,
  Tooltip,
} from "@mui/material";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import { QuestionItem } from "../../types/task";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import DykButton from "../../../../components/UI/buttons/DykButton";

interface Props {
  header: string;
  onSaveQuestion: (question: QuestionItem) => void;
}

class Answer {
  id = Date.now();
  text = "";
  valid = false;
}
export default function TheDialog({ header, onSaveQuestion }: Props) {
  const [open, setOpen] = React.useState(false);
  const [answers, setAswers] = React.useState<Answer[]>([]);
  const [question, setQuestion] = React.useState("");

  const handleClickOpen = () => {
    setAswers([]);
    setQuestion("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addAnswer = () => {
    if (answers.length < 5) {
      setAswers([...answers, new Answer()]);
    } else {
      console.log("max 5 вариантов ответа");
    }
  };

  const handleQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const isValidAnswers = answers.every((v) => v.text) && answers.some((v) => v.valid);
  const disabled = question && answers.length > 3 && isValidAnswers;

  const handleInputChange = (id: number, value: string) => {
    setAswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, text: value } : answer
      )
    );
  };

  const handleCheckboxChange = (
    id: number,
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, valid: value.target.checked } : { ...answer, valid: false }
      )
    );
  };

  const deleteAnswer = (id: number) => {
    setAswers(answers.filter((v) => v.id !== id));
  };

  const onSave = () => {
    onSaveQuestion({
      id: Date.now(),
      question,
      answers,
    });
    handleClose();
  };

  return (
    <>
      <Tooltip title="Добавить вопрос">
        <IconButton
          aria-label="add"
          size="large"
          onClick={handleClickOpen}
          disableRipple
          sx={{ p: 0, mx: 0, mb: 1 }}
        >
          <AddBoxSharpIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
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
            value={question}
            name="question"
            onChange={handleQuestion}
            fullWidth
            size="small"
            sx={{ my: 1 }}
          />
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
          {answers.map((answer) => (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
              >
                <OutlinedInput
                  key={`${answer.id}`}
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
                        checked={answer.valid}
                        onChange={(e) => handleCheckboxChange(answer.id, e)}
                        disableRipple
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
          <DykButton title="Сохранить" disabled={!disabled} onClick={onSave} />
          <DykButton title="Отмена" onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </>
  );
}
