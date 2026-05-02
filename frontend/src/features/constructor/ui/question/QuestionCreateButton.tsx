import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Question } from "../../../../entities/question";
import QuestionCreateDialog from "./QuestionCreateDialog";

interface Props {
  header: string;
  onSaveQuestion: (question: Question) => void;
}

export default function QuestionCreateButton({ header, onSaveQuestion }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => setIsOpen(true), []);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button
        aria-label="add-question"
        variant="outlined"
        fullWidth
        startIcon={<AddIcon />}
        onClick={openDialog}
        sx={{
          mb: 2,
          py: 1.25,
          borderStyle: "dashed",
          borderColor: "#C4B5FD",
          color: "#7C3AED",
          fontWeight: 600,
          fontSize: "0.875rem",
          borderRadius: "12px",
          backgroundColor: "transparent",
          "&:hover": {
            borderStyle: "dashed",
            borderColor: "#7C3AED",
            backgroundColor: "#F5F3FF",
          },
        }}
      >
        Добавить вопрос
      </Button>

      <QuestionCreateDialog
        openDialog={isOpen}
        header={header}
        onSave={onSaveQuestion}
        onClose={closeDialog}
      />
    </>
  );
}
