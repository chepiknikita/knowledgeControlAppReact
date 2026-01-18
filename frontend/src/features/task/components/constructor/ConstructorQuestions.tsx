import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
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
  const [editingQuestionId, setEditingQuestionId] = useState<
    number | string | null
  >(null);

  const questions = useMemo(() => task.questions ?? [], [task.questions]);

  const openEdit = useCallback(
    (id?: number | string) => setEditingQuestionId(id ?? null),
    [],
  );
  const closeEdit = useCallback(() => setEditingQuestionId(null), []);

  const editingQuestion = useMemo(
    () => questions.find((q) => q.id === editingQuestionId) ?? null,
    [questions, editingQuestionId],
  );

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
        {questions.map((item) => (
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
                    <IconButton
                      size="large"
                      disableRipple
                      onClick={() => openEdit(item.id)}
                    >
                      <CreateIcon fontSize="inherit" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        ))}
      </Box>

      {editingQuestion && (
        <ConstructorQuestionDialog
          openDialog={Boolean(editingQuestion)}
          header="Редактирование вопроса"
          initailData={editingQuestion}
          onSave={onSaveQuestion}
          handleClose={closeEdit}
        />
      )}
    </Box>
  );
}
