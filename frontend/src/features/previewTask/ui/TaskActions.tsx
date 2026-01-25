import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmDialog } from "../../../components/UI/dialogs/ConfirmDialog";
import { useConfirmAction } from "../../../shared/hooks/useConfirmAction";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

type Action = "delete" | "edit";

const ACTION_MESSAGES: Record<Action, string> = {
  delete: "Вы уверены, что хотите удалить тест?",
  edit: "Вы уверены, что хотите отредактировать тест?",
};

export function TaskActions({ onEdit, onDelete }: Props) {
  const { open, message, openDialog, closeDialog, handleConfirm } =
    useConfirmAction<Action>({
      messages: ACTION_MESSAGES,
      onConfirm: (action) => {
        if (action === "delete") onDelete?.();
        if (action === "edit") onEdit?.();
      },
    });

  return (
    <Box
      sx={{
        position: "absolute",
        right: 0,
        top: 10,
        width: 80,
        height: 40,
        zIndex: 100,
      }}
    >
      {onEdit && (
        <EditIcon
          sx={{ mt: 1, ml: 1, cursor: "pointer", zIndex: 1000 }}
          onClick={(e) => {
            e.stopPropagation();
            openDialog("edit")
          }}
        />
      )}
      {onDelete && (
        <DeleteIcon
          sx={{ mt: 1, ml: 1, cursor: "pointer", zIndex: 1000 }}
          onClick={(e) => {
            e.stopPropagation();
            openDialog("delete")
          }}
        />
      )}

      <ConfirmDialog
        open={open}
        message={message}
        onCancel={closeDialog}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
