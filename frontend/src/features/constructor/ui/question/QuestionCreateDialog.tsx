import React, { useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Question } from "../../../../entities/question";
import { useQuestionState } from "../../hooks/useQuestionState";
import { QuestionEdit } from "./QuestionEdit";
import { AnswersEditor } from "../answer/AnswerEditor";
import { QuestionActions } from "./QuestionActions";

interface Props {
  openDialog: boolean;
  header: string;
  initialData?: Question;
  onSave: (question: Question) => void;
  onClose: () => void;
}

export default function QuestionCreateDialog({
  openDialog,
  header,
  initialData,
  onSave,
  onClose,
}: Props) {
  const {
    question,
    isValid,
    setField,
    updateAnswerText,
    setCorrectAnswer,
    removeAnswer,
    addAnswer,
  } = useQuestionState(initialData, openDialog);

  const save = useCallback(() => {
    onSave(new Question(question));
    onClose();
  }, [question, onSave, onClose]);

  return (
    <Dialog open={openDialog} fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle component="div" variant="body1">
        {header}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          minHeight: 300,
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <QuestionEdit
          value={question.question}
          onChange={(v) => setField("question", v)}
        />

        <AnswersEditor
          answers={question.answers}
          onAdd={addAnswer}
          onUpdateText={updateAnswerText}
          onRemove={removeAnswer}
          onSetCorrect={setCorrectAnswer}
        />
      </DialogContent>

      <QuestionActions
        isValid={isValid}
        onSave={save}
        onCancel={onClose}
      />
    </Dialog>
  );
}
