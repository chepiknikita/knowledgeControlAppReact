import { Box, CardActions, CardContent, CardMedia } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "./components/CardWrapper";
import DykTypography from "../../components/UI/typography/DykTypography";
import DykButton from "../../components/UI/buttons/DykButton";
import { TaskResponse } from "../../api/interfaces/tasks";

interface Props {
  task: TaskResponse;
  onStart: () => void;
}

export default function TaskDescription({ task, onStart }: Props) {
  const navigation = useNavigate();

  const goBack = () => {
    navigation("/");
  };

  return (
    <CardWrapper>
      <Box sx={{ height: "250px" }}>
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
      </Box>
      <CardContent>
        <DykTypography text={task.name} variant="body1" />
        <DykTypography text={task.description} variant="body2" />
        <DykTypography
          text={`Количество вопорсов - ${task.questions.length}`}
          variant="body2"
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", mx: 1, mb: 2 }}>
        <DykButton title="Начать" onClick={onStart} />
        <DykButton title="На главную" onClick={goBack} />
      </CardActions>
    </CardWrapper>
  );
}
