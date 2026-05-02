import { DialogActions } from "@mui/material";
import DykButton from "../../../../components/UI/buttons/DykButton";

type Props = {
  isValid: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function QuestionActions({
  isValid,
  onSave,
  onCancel,
}: Props) {
  return (
    <DialogActions sx={{ m: 1 }}>
      <DykButton title="Сохранить" disabled={!isValid} onClick={onSave} variant="contained" />
      <DykButton title="Отмена" onClick={onCancel} variant="outlined" />
    </DialogActions>
  );
}
