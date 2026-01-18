import React, { useCallback, useState } from "react";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import PreviewTask from "../PreviewTest";
import { Box } from "@mui/system";
import { Task } from "../../../../entities/task";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import TaskProgress from "../../TaskProgress";

interface Props {
  task: Task;
}

export default function ConstructorPreview({ task }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

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
        task={task}
        showEdit={false}
        handleOpen={handleOpen}
        handleEdit={() => {}}
      />
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle
          component="div"
          variant="body1"
        >
          Получившийся тест
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ height: 500 }}
        >
          <TaskProgress
            task={task.toResponse()}
            showHome={false}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
