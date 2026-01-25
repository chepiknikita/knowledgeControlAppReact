import React from "react";
import { CardContent, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Question } from "../../../entities/question";
import { Answer } from "../../../entities/answer";
import DykButton from "../../../components/UI/buttons/DykButton";
import { useQuestionStep } from "../hooks/useQuestionStep";
import { TaskActions } from "./TaskActions";
import { TaskHeader } from "./TaskHeader";
import CardWrapper from "../../../components/wrappers/CardWrapper";

type Props = {
  question: Question;
  progress: string;
  currentAnswer?: Answer;
  onAnswer: (answer?: Answer) => void;
  onBack: () => void;
};

export function TaskQuestion({
  question,
  progress,
  currentAnswer,
  onAnswer,
  onBack,
}: Props) {
  const {
    answers,
    selectedId,
    setSelectedId,
    selectedAnswer,
  } = useQuestionStep(question, currentAnswer);

  return (
    <CardWrapper>
      <CardContent sx={{ px: 2, pt: 2, pb: 0 }}>
        <TaskHeader
          question={question.question}
          progress={progress}
        />

        <RadioGroup
          value={selectedId}
          sx={{ m: 2 }}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {answers.map((answer) => (
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

      <TaskActions>
        <DykButton
          title="Ответить"
          disabled={!selectedId}
          onClick={() => onAnswer(selectedAnswer)}
        />
        <DykButton title="Назад" onClick={onBack} />
      </TaskActions>
    </CardWrapper>
  );
}
