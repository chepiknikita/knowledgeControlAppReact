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
    useConfirmAction<Action, undefined>({
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
        display: "flex",
        alignItems: "center",
      }}
    >
      {onEdit && (
        <EditIcon
          sx={{
            mt: 1,
            ml: 1,
            cursor: "pointer",
            zIndex: 1000,
            color: "#7C3AED",
            fontSize: 20,
            transition: "all 0.15s ease",
            "&:hover": { color: "#6D28D9", transform: "scale(1.1)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            openDialog("edit");
          }}
        />
      )}
      {onDelete && (
        <DeleteIcon
          sx={{
            mt: 1,
            ml: 1,
            cursor: "pointer",
            zIndex: 1000,
            color: "#F87171",
            fontSize: 20,
            transition: "all 0.15s ease",
            "&:hover": { color: "#DC2626", transform: "scale(1.1)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            openDialog("delete");
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
