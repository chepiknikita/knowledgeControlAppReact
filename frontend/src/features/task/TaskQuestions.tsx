import React, { useEffect, useState } from "react";
import CardWrapper from "./components/CardWrapper";
import {
  CardActions,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DykButton from "../../components/UI/buttons/DykButton";
import DykTypography from "../../components/UI/typography/DykTypography";
import { Box } from "@mui/system";
import { AnswerResponse, QuestionResponse } from "../../api/interfaces/questions";

interface Props {
  question: QuestionResponse;
  questionProgress: string;
  onAnswer: (answer: AnswerResponse | undefined) => void;
  onBack: <T>(event: React.MouseEvent<T, MouseEvent>) => void;
}

export default function TaskQuestions({ question, questionProgress, onAnswer, onBack }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedId(null);
  }, [question])
  
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.value);
    setSelectedId(id);
  };

  const onNext = () => {
    const selectedAnswer = question.answers?.find(a => a.id === selectedId);
    onAnswer(selectedAnswer);
  }

  const onPrev = () => {
    //TODO сохраять пред. ответ при шаге назад
  }

  return (
    <CardWrapper>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", px: 2, pt: 2, pb: 0 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TextField
            id="outlined-required"
            value={question.question}
            size="small"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{ mb: 1, ml: 2, flex: 1 }}
          />
          <DykTypography text={questionProgress} variant="body1" sx={{ mx: 2}} />
        </Box>
        <RadioGroup
          name="questions"
          value={selectedId ? selectedId.toString() : ''}
          onChange={handleRadioChange}
          sx={{ m: 2 }}
        >
          {(question.answers ?? []).map((answer) => (
            <React.Fragment key={answer.id}>
              <FormControlLabel
                value={answer.id.toString()}
                label={answer.text}
                control={<Radio disableRipple />}
              />
              <Divider variant="middle" sx={{ mx: 4 }} />
            </React.Fragment>
          ))}
        </RadioGroup>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", mx: 1, mb: 2 }}>
        <DykButton title="Ответить" disabled={!selectedId} onClick={onNext} />
        <DykButton title="Назад" onClick={onBack}/>
      </CardActions>
    </CardWrapper>
  );
}
