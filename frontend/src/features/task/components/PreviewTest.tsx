import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Avatar, Box } from "@mui/material";
import DykTypography from "../../../components/UI/typography/DykTypography";
import EditIcon from "@mui/icons-material/Edit";
import { TaskResponse } from "../../../api/interfaces/tasks";
import { Task } from "../../../entities/task";

interface Props {
  task: TaskResponse | Task;
  showEdit: boolean;
  handleOpen: () => void;
  handleEdit?: () => void;
}

export default function PreviewTask({
  task,
  handleOpen,
  handleEdit,
  showEdit,
}: Props) {
  return (
    <Card sx={{ maxWidth: 345, m: 2, position: "relative" }}>
      <Box
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={handleOpen}
      >
        <CardActionArea sx={{ height: "250px", width: "300px" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bgcolor: "rgba(0,0,0, 0.5)",
              py: 1,
              pl: 2,
              pr: 6,
              display: "flex",
            }}
          >
            {/* <Avatar alt="avatar" src={task.user ?? undefined} /> */}
            <Box sx={{ overflow: "hidden", ml: 2 }}>
              <DykTypography
                text={task.name}
                variant="body1"
                sx={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              />
              {/* <DykTypography
                text={new Date(task.createdAt).toLocaleString()}
                variant="body2"
              /> */}
            </Box>
          </Box>
          {task.imageBase64 ? (
            <CardMedia
              component="img"
              alt="image-task"
              image={task.imageBase64}
              sx={{ height: "100%" }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                bgcolor: "#757575",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              Изображение отсутствует
            </Box>
          )}
          <CardContent
            sx={{
              px: 2,
              py: 1,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "rgba(0,0,0, 0.5)",
            }}
          >
            <Typography variant="body2" component="div">
              {task.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
      {showEdit && (
        <Box
          style={{
            textDecoration: "none",
            position: "absolute",
            color: "inherit",
            right: "0px",
            top: "0px",
            width: "40px",
            height: "40px",
          }}
          onClick={handleEdit}
        >
          <EditIcon sx={{ mt: 1, ml: 1 }} />
        </Box>
      )}
    </Card>
  );
}
