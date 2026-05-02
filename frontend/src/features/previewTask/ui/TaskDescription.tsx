import { CardContent, Typography } from "@mui/material";

type Props = {
  description?: string;
};

export function TaskDescription({ description }: Props) {
  if (!description) return null;

  return (
    <CardContent
      sx={{
        px: 2,
        py: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(0,0,0,0.8)",
      }}
    >
      <Typography
        variant="body2"
        component="div"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "#FFFFFF",
        }}
      >
        {description}
      </Typography>
    </CardContent>
  );
}
