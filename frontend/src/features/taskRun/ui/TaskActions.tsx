import { CardActions } from "@mui/material";

export function TaskActions({ children }: { children: React.ReactNode }) {
  return (
    <CardActions sx={{ justifyContent: "flex-end", mx: 1, mb: 2 }}>
      {children}
    </CardActions>
  );
}
