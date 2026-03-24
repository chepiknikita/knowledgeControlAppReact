import { Box } from "@mui/system";
import React from "react";
import DykTypography from "../../../components/UI/typography/DykTypography";
import { Question } from "../../../entities/question";
import QuestionsManager from "./question/QuestionsManager";

interface Props {
  questions: Question[];
  onAddQuestion: (question: Question) => void;
  onEditQuestion: (question: Question) => void;
}

export default function ConstructorQuestions({
  questions,
  onAddQuestion,
  onEditQuestion,
}: Props) {
  return (
    <Box sx={{ px: 2 }}>
      <DykTypography
        text="Cоздайте вопросы для теста"
        align="center"
        variant="body2"
      />
      <QuestionsManager
        questions={questions}
        onAddQuestion={onAddQuestion}
        onEditQuestion={onEditQuestion}
      />
    </Box>
  );
}
