import { CardMedia } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  image?: string;
};

export function TaskImage({ image }: Props) {
  if (image) {
    return (
      <CardMedia
        component="img"
        alt="image-task"
        image={image}
        sx={{ height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        height: "100%",
        background: "linear-gradient(135deg, #F5F3FF 0%, #FAF5FF 50%, #FDF2F8 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 12,
        fontWeight: 500,
        color: "#A78BFA",
        letterSpacing: "0.02em",
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "14px",
          backgroundColor: "rgba(124, 58, 237, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        🖼
      </Box>
      Изображение отсутствует
    </Box>
  );
}
