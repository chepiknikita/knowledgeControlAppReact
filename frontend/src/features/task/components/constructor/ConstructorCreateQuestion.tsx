import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import { Question } from "../../../../entities/question";
import ConstructorQuestionDialog from "./ConstructorQuestionDialog";

interface Props {
  header: string;
  initailData?: Question;
  onSaveQuestion: (question: Question) => void;
}

export default function ConstructorCreateQuestion({
  header,
  onSaveQuestion,
  initailData,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <ConstructorQuestionDialog
        openDialog={open}
        header={header}
        initailData={initailData}
        onSave={onSaveQuestion}
        handleClose={handleClose}
      />
    </>
  );
}
