import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Question } from "../../../../entities/question";

type Props = {
  question: Question;
  number: number;
  onEdit: (question: Question) => void;
};

export function QuestionItem({ question, number, onEdit }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 1,
        p: 1.5,
        borderRadius: "12px",
        border: "1px solid #E4E4E7",
        backgroundColor: "#FFFFFF",
        transition: "all 0.18s ease",
        cursor: "default",
        "&:hover": {
          borderColor: "#C4B5FD",
          backgroundColor: "#FAFAF9",
          boxShadow: "0 2px 8px rgba(109, 40, 217, 0.07)",
        },
      }}
    >
      {/* Number badge */}
      <Box
        sx={{
          minWidth: 26,
          height: 26,
          borderRadius: "8px",
          backgroundColor: "#EDE9FE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#6D28D9", lineHeight: 1 }}
        >
          {number}
        </Typography>
      </Box>

      {/* Question text */}
      <Typography
        variant="body2"
        sx={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "#18181B",
          fontWeight: 500,
        }}
      >
        {question.question || <span style={{ color: "#A1A1AA", fontStyle: "italic" }}>Вопрос не задан</span>}
      </Typography>

      {/* Answers count badge */}
      <Typography
        variant="caption"
        sx={{
          color: "#71717A",
          flexShrink: 0,
          fontSize: "0.7rem",
        }}
      >
        {question.answers?.length ?? 0} отв.
      </Typography>

      {/* Edit button */}
      <IconButton
        size="small"
        onClick={() => onEdit(question)}
        sx={{
          flexShrink: 0,
          color: "#A78BFA",
          borderRadius: "8px",
          transition: "all 0.15s ease",
          "&:hover": { color: "#6D28D9", backgroundColor: "#EDE9FE" },
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
