import { Box } from "@mui/material";
import React from "react";
import PreviewTask from "../task/components/PreviewTest";
import { TaskResponse } from "../../api/interfaces/tasks";
import { useNavigate } from "react-router-dom";

export default function TaskList({ data }: { data: TaskResponse[] }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        my: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {data.map((item) => (
        <PreviewTask
          key={item.id}
          task={item}
          showEdit={true}
          handleOpen={() => navigate(`/task/description/${item.id}`)}
          handleEdit={() => navigate(`/task/edit/${item.id}`)}
        />
      ))}
    </Box>
  );
}
