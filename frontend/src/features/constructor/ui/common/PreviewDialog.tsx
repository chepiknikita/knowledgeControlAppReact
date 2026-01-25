import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Task } from "../../../../entities/task";
import TaskRunFeature from "../../../taskRun/TaskRunFeature";

type PreviewDialogProps = {
  open: boolean;
  task: Task;
  onClose: () => void;
  onHome: () => void;
};

export function PreviewDialog({ open, onClose, task, onHome }: PreviewDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle component="div" variant="body1">
        Получившийся тест
      </DialogTitle>

      <DialogContent dividers sx={{ height: 500 }}>
        <TaskRunFeature
          task={task}
          showHome={false}
          onHome={onHome}
        />
      </DialogContent>
    </Dialog>
  );
}
