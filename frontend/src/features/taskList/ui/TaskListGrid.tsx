import { memo } from "react";
import { Box } from "@mui/material";
import { Task } from "../../../entities/task";
import PreviewTask from "../../previewTask/PreviewTask";

interface Props {
  tasks: Task[];
  onOpen: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  showEdit: boolean;
}

export const TaskListGrid = memo(
  ({ tasks, onOpen, onEdit, onDelete, showEdit }: Props): JSX.Element => (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {tasks.map((task) => (
        <PreviewTask
          key={task.id}
          task={task}
          showEdit={showEdit}
          handleOpen={() => onOpen(task.id as number)}
          handleEdit={onEdit ? () => onEdit(task.id as number) : undefined}
          handleDelete={onDelete ? () => onDelete(task.id as number) : undefined}
        />
      ))}
    </Box>
  ),
);
