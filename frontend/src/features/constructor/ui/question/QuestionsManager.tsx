import { Box } from "@mui/material";
import React, { useCallback } from "react";
import QuestionCreateButton from "./QuestionCreateButton";
import { Question } from "../../../../entities/question";
import { useQuestionEditing } from "../../hooks/useQuestionEditing";
import { QuestionsList } from "./QuestionList";
import { EditQuestionDialog } from "./QuestionEditDialog";

interface Props {
  questions: Question[];
  onCreateQuestion: (question: Question) => void;
  onEditQuestion: (question: Question) => void;
}

export default function QuestionsManager({
  questions,
  onCreateQuestion,
  onEditQuestion,
}: Props) {
  const { editingQuestion, openEdit, closeEdit } = useQuestionEditing();

  const handleSaveEdit = useCallback((question: Question) => {
    onEditQuestion(question);
    closeEdit();
  }, [onEditQuestion, closeEdit]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        m: 1,
      }}
    >
      <QuestionCreateButton
        header="Создание вопроса"
        onSaveQuestion={onCreateQuestion}
      />

      <QuestionsList
        questions={questions}
        onEdit={openEdit}
      />

      <EditQuestionDialog
        question={editingQuestion}
        onSave={handleSaveEdit}
        onClose={closeEdit}
      />
    </Box>
  );
}
