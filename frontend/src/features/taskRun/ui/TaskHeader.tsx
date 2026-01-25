import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import DykTypography from "../../../components/UI/typography/DykTypography";

type Props = {
  question: string;
  progress: string;
};

export function TaskHeader({ question, progress }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        value={question}
        size="small"
        fullWidth
        slotProps={{ input: { readOnly: true } }}
        sx={{ ml: 2 }}
      />
      <DykTypography text={progress} variant="body1" sx={{ mx: 2 }} />
    </Box>
  );
}
