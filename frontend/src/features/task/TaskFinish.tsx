import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardActions, CardContent } from "@mui/material";
import CardWrapper from "./components/CardWrapper";
import DykTypography from "../../components/UI/typography/DykTypography";
import DykButton from "../../components/UI/buttons/DykButton";
import { AnswerItem } from "../../api/interfaces/questions";

interface Props {
  answers: AnswerItem[];
  onRepeat: <T>(event: React.MouseEvent<T, MouseEvent>) => void;
}

export default function TaskFinish({ answers, onRepeat }: Props) {
  const [validAnswers, setValidAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  
  const navigation = useNavigate();

  const onGoHome = () => {
    navigation(`/`);
  };

  useEffect(() => {
    setValidAnswers(answers.filter((v) => v.isCorrect).length);
    setTotalAnswers(answers.length);
  }, []);

  const generateMessage = () => {
    if (totalAnswers === 0) {
      return "Нет ответов для оценки";
    }

    const correctPercentage = (validAnswers / totalAnswers) * 100;

    if (correctPercentage <= 50) {
      return "Не расстраивайся!";
    } else if (correctPercentage <= 70) {
      return "Не плохо!";
    } else if (correctPercentage < 100) {
      return "Хорошо!";
    } else {
      return "Отлично!";
    }
  };

  return (
    <CardWrapper>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          py: 4,
        }}
      >
        <DykTypography
          text="Тест завершен!"
          variant="body1"
          sx={{ fontWeight: "bold" }}
        />
        <DykTypography text={generateMessage()} variant="body2" />
        <DykTypography
          text={`Ваш результат: ${validAnswers}/${totalAnswers}`}
          variant="body2"
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", mx: 1, mb: 2 }}>
        <DykButton title="Повторить" onClick={onRepeat} />
        <DykButton title="На главную" onClick={onGoHome} />
      </CardActions>
    </CardWrapper>
  );
}
