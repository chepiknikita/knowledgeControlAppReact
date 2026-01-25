import { Box } from "@mui/system";

export function UploadPlaceholder() {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#757575",
        height: "100%",
        p: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        fontSize: 14,
      }}
    >
      Загрузить изображение
    </Box>
  );
}
