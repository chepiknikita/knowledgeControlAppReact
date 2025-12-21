import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import ConstructorCreateQuestion from "./ConstructorCreateQuestion";
import { Question } from "../../../../entities/question";
import CreateIcon from "@mui/icons-material/Create";
import ConstructorQuestionDialog from "./ConstructorQuestionDialog";
import { Task } from "../../../../entities/task";

interface Props {
  task: Task;
  onSaveQuestion: (question: Question) => void;
}
export default function ConstructorQuestions({ task, onSaveQuestion }: Props) {
  const [editOpen, setOpenEdit] = useState(false);

  const openEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        m: 1,
      }}
    >
      <ConstructorCreateQuestion
        header="Создание вопроса"
        onSaveQuestion={onSaveQuestion}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {task.questions.map((item) => (
          <TextField
            key={item.id}
            id={`${item.id}${item.question}`}
            defaultValue={item.question}
            size="small"
            fullWidth
            sx={{ mb: 1 }}
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: task.id ? (
                  <InputAdornment position="end">
                    <>
                      <IconButton size="large" onClick={openEdit} disableRipple>
                        <CreateIcon fontSize="inherit" />
                      </IconButton>
                      <ConstructorQuestionDialog
                        openDialog={editOpen}
                        header="Редактирование вопроса"
                        initailData={item}
                        onSave={onSaveQuestion}
                        handleClose={handleClose}
                      />
                    </>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
