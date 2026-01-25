import React, { useCallback, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import { Question } from "../../../../entities/question";
import QuestionCreateDialog from "./QuestionCreateDialog";

interface Props {
  header: string;
  initailData?: Question;
  onSaveQuestion: (question: Question) => void;
}

export default function QuestionCreateButton({
  header,
  onSaveQuestion,
  initailData,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => setIsOpen(true), []);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Tooltip title="Добавить вопрос">
        <IconButton
          aria-label="add-question"
          size="large"
          disableRipple
          sx={{ p: 0, mx: 0, mb: 1 }}
          onClick={openDialog}
        >
          <AddBoxSharpIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <QuestionCreateDialog
        openDialog={isOpen}
        header={header}
        initailData={initailData}
        onSave={onSaveQuestion}
        handleClose={closeDialog}
      />
    </>
  );
}
