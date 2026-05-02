import { Box } from "@mui/system";

export function UploadPlaceholder() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        background: "linear-gradient(135deg, #F5F3FF 0%, #FAF5FF 100%)",
        border: "2px dashed #C4B5FD",
        height: "100%",
        p: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        fontSize: 13,
        fontWeight: 500,
        color: "#A78BFA",
        letterSpacing: "0.01em",
        transition: "all 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          background: "linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)",
          borderColor: "#7C3AED",
          color: "#6D28D9",
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "14px",
          backgroundColor: "rgba(124, 58, 237, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          transition: "all 0.2s ease",
        }}
      >
        📷
      </Box>
      Загрузить изображение
    </Box>
  );
}
