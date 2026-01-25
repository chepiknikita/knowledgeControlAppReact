import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export function TaskActions({ onEdit, onDelete }: Props) {
  return (
    <Box
      sx={{
        // textDecoration: "none",
        // color: "inherit",
        position: "absolute",
        right: 0,
        top: 8,
        width: 80,
        height: 40,
      }}
    >
      {onEdit && (
        <EditIcon
          sx={{ mt: 1, ml: 1, cursor: "pointer" }}
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <DeleteIcon
          sx={{ mt: 1, ml: 1, cursor: "pointer" }}
          onClick={onDelete}
        />
      )}
    </Box>
  );
}
