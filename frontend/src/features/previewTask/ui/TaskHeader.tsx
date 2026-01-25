import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import { Task } from "../../../entities/task";
import DykTypography from "../../../components/UI/typography/DykTypography";

type Props = {
  name: string;
  createdAt?: string;
  user?: Task["user"];
};

export function TaskHeader({ name, createdAt, user }: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(0,0,0,0.8)",
        py: 1,
        pl: 2,
        pr: 6,
        display: "flex",
        zIndex: 0,
        alignItems: "center",
      }}
    >
      {user && (
        <Avatar
          alt={user.login ?? "avatar"}
          src={user.imageUrl ?? undefined}
        />
      )}

      <Box sx={{ overflow: "hidden", ml: 2, mr: 4 }}>
        <DykTypography
          text={name}
          variant="body1"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        />
        {createdAt && (
          <DykTypography
            text={new Date(createdAt).toLocaleString()}
            variant="body2"
          />
        )}
      </Box>
    </Box>
  );
}
