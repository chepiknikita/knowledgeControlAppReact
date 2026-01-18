import { Box, CardActions, CardContent, CardMedia } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "./components/CardWrapper";
import DykTypography from "../../components/UI/typography/DykTypography";
import DykButton from "../../components/UI/buttons/DykButton";
import { TaskResponse } from "../../api/interfaces/tasks";

interface Props {
  task: TaskResponse;
  showHome?: boolean;
  onStart: () => void;
}

const ImageBlock = ({ image }: { image?: string }) => {
  if (!image) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          bgcolor: "#757575",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 14,
        }}
      >
        Изображение отсутствует
      </Box>
    );
  }

  return (
    <CardMedia
      component="img"
      alt="image-task"
      image={image}
      sx={{ height: "100%" }}
    />
  );
};

export default function TaskDescription({ task, showHome = true, onStart }: Props) {
  const navigation = useNavigate();

  const goBack = () => {
    navigation("/");
  };

  return (
    <CardWrapper>
      <Box sx={{ height: "250px" }}>
        <ImageBlock image={task.imageBase64} />
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
        {showHome && <DykButton title="На главную" onClick={goBack} />}
      </CardActions>
    </CardWrapper>
  );
}
