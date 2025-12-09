import { Box, CardActions, CardContent, CardMedia } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "./components/CardWrapper";
import DykTypography from "../../components/UI/typography/DykTypography";
import DykButton from "../../components/UI/buttons/DykButton";
import { TaskItemById } from "../../api/interfaces/tasks";

interface Props {
  task: TaskItemById;
}

export default function TaskDescription({ task }: Props) {
  const navigation = useNavigate();

  const goBack = () => {
    navigation(-1);
  };

  const onStartTask = () => {
    navigation(`/task/questions/${task.id}`);
  };

  return (
    <CardWrapper>
      <Box sx={{ height: "250px" }}>
        {task.image ? (
          <CardMedia
            component="img"
            alt="image-task"
            image={task.image}
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
        <DykButton title="Начать" onClick={onStartTask} />
        <DykButton title="Назад" onClick={goBack} />
      </CardActions>
    </CardWrapper>
  );
}
