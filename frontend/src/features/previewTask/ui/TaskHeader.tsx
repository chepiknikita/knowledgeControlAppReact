import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import { Task } from "../../../entities/task";
import DykTypography from "../../../components/UI/typography/DykTypography";

type Props = {
  name: string;
  createdAt?: string;
  showEdit: boolean;
  user?: Task["user"];
};

export function TaskHeader({ name, showEdit, createdAt, user }: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(255,255,255,0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(228, 228, 231, 0.7)",
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
          sx={{ width: 30, height: 30 }}
        />
      )}

      <Box sx={{ overflow: "hidden", ml: 1, mr: showEdit ? 4 : 0 }}>
        <DykTypography
          text={name}
          variant="body2"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontWeight: 600,
            color: "#18181B",
          }}
        />
        {createdAt && (
          <DykTypography
            text={new Date(createdAt).toLocaleString()}
            variant="caption"
            sx={{ color: "#71717A" }}
          />
        )}
      </Box>
    </Box>
  );
}
