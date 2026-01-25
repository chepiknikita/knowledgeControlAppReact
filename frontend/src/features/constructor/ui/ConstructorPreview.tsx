import React, { useCallback, useState } from "react";
import { Box } from "@mui/system";
import { Task } from "../../../entities/task";
import DykTypography from "../../../components/UI/typography/DykTypography";
import { PreviewDialog } from "./common/PreviewDialog";
import { useNavigate } from "react-router-dom";
import PreviewTask from "../../previewTask/PreviewTask";

interface Props {
  task: Task;
}

export default function ConstructorPreview({ task }: Props) {
  const navigate = useNavigate();
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
      />
      <PreviewDialog
        open={isOpen}
        task={task}
        onClose={handleClose}
        onHome={() => navigate('/')}
      />
    </Box>
  );
}
