import { Card, CardActionArea } from "@mui/material";

type Props = {
  onOpen: () => void;
  children: React.ReactNode;
};

export function TaskCard({ onOpen, children }: Props) {
  return (
    <Card sx={{ maxWidth: 345, m: 2, position: "relative" }}>
      <CardActionArea
        sx={{ height: 250, width: 300 }}
        onClick={onOpen}
      >
        {children}
      </CardActionArea>
    </Card>
  );
}
