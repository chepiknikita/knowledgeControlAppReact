
import { TaskDescription } from "./ui/TaskDescription";
import { TaskHeader } from "./ui/TaskHeader";
import { TaskImage } from "./ui/TaskImage";
import { TaskActions } from "./ui/TaskActions";
import { Task } from "../../entities/task";
import { TaskCard } from "./ui/TaskCard";

interface Props {
  task: Task;
  showEdit: boolean;
  handleOpen: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

export default function PreviewTask({
  task,
  handleOpen,
  handleEdit,
  handleDelete,
  showEdit,
}: Props) {
  return (
    <TaskCard onOpen={handleOpen}>
      <TaskHeader
        name={task.name}
        user={task.user}
        showEdit={showEdit}
        createdAt={task.createdAt}
      />

      <TaskImage image={task.imageBase64} />

      <TaskDescription description={task.description} />

      {showEdit && (
        <TaskActions
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </TaskCard>
  );
}
