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
        sx={{ height: "100%" }}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        bgcolor: "#757575",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
      }}
    >
      Изображение отсутствует
    </Box>
  );
}
