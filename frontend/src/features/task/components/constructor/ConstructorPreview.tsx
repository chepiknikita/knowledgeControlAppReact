import React, { useState } from "react";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import PreviewTask from "../PreviewTest";
import { Box } from "@mui/system";
import { Task } from "../../../../entities/task";

interface Props {
  task: Task;
}

export default function ConstructorPreview({ task }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <DykTypography
        text=" Ваш тест почти готов, можете посмотреть что получилось!"
        align="center"
        sx={{ mb: 2 }}
        variant="body2"
      />
      <PreviewTask
        key={task.id ?? 0}
        task={task}
        showEdit={false}
        handleOpen={handleOpen}
        handleEdit={() => {}}
      />
      {/* TODO форма в dialog на прохождение теста. */}
    </Box>
  );
}
