import { Box } from "@mui/material";
import React from "react";
import DykButton from "../../components/UI/buttons/DykButton";

export default function EmptyList({ onCreateTask }: { onCreateTask: () => void }) {
  return (
    <Box
      sx={{
        margin: "16px auto",
        display: "flex",
        justifyContent: "center",
        fontSize: "14px",
      }}
    >
      <Box>
        Данных нет! Для создания теста перейдите в
        <DykButton
          title="Конструктор"
          onClick={onCreateTask}
        />
      </Box>
    </Box>
  );
}
