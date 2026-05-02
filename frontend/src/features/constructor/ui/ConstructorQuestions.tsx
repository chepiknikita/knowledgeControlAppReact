import { Box } from "@mui/system";
import React from "react";
import { Typography } from "@mui/material";
import { Question } from "../../../entities/question";
import QuestionsManager from "./question/QuestionsManager";

interface Props {
  questions: Question[];
  onAddQuestion: (question: Question) => void;
  onEditQuestion: (question: Question) => void;
}

export default function ConstructorQuestions({ questions, onAddQuestion, onEditQuestion }: Props) {
  return (
    <Box sx={{ px: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "#71717A" }}>
          Создайте вопросы для теста
        </Typography>
        {questions.length > 0 && (
          <Typography variant="caption" sx={{ color: "#A78BFA", fontWeight: 600 }}>
            {questions.length} {questions.length === 1 ? "вопрос добавлен" : questions.length < 5 ? "вопроса добавлено" : "вопросов добавлено"}
          </Typography>
        )}
      </Box>

      <QuestionsManager
        questions={questions}
        onAddQuestion={onAddQuestion}
        onEditQuestion={onEditQuestion}
      />

      {/* Empty state */}
      {questions.length === 0 && (
        <Box
          sx={{
            mt: 2,
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            border: "1px dashed #E4E4E7",
            borderRadius: "16px",
            backgroundColor: "#FAFAFA",
          }}
        >
          <Typography sx={{ fontSize: 32 }}>📋</Typography>
          <Typography variant="body2" sx={{ color: "#A1A1AA", fontWeight: 500 }}>
            Вопросов пока нет
          </Typography>
          <Typography variant="caption" sx={{ color: "#D4D4D8" }}>
            Нажмите кнопку выше, чтобы добавить первый вопрос
          </Typography>
        </Box>
      )}
    </Box>
  );
}
