import { Card, CardActionArea } from "@mui/material";

type Props = {
  onOpen: () => void;
  children: React.ReactNode;
};

export function TaskCard({ onOpen, children }: Props) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        position: "relative",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(109, 40, 217, 0.16), 0 4px 12px rgba(0,0,0,0.06)",
        },
      }}
    >
      <CardActionArea
        sx={{ height: 250, width: 300 }}
        onClick={onOpen}
      >
        {children}
      </CardActionArea>
    </Card>
  );
}
