import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog = ({
  open,
  title = "Подтвердите действие",
  message,
  onCancel,
  onConfirm,
  confirmText = "Да",
  cancelText = "Отмена",
}: Props): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={() => onCancel}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle component="div" variant="body1">
        {title}
      </DialogTitle>

      <DialogContent dividers>{message}</DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={(e) => {
            e.stopPropagation();
            onConfirm();
          }}
          autoFocus
        >
          {confirmText}
        </Button>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
