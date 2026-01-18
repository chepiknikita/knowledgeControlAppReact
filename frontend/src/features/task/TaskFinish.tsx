import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CardActions, CardContent } from "@mui/material";
import CardWrapper from "./components/CardWrapper";
import DykTypography from "../../components/UI/typography/DykTypography";
import DykButton from "../../components/UI/buttons/DykButton";
import { AnswerResponse } from "../../api/interfaces/questions";

interface Props {
  answers: AnswerResponse[];
  showHome?: boolean;
  onRepeat: <T>(event: React.MouseEvent<T, MouseEvent>) => void;
}

export default function TaskFinish({
  answers,
  showHome = true,
  onRepeat,
}: Props) {
  const navigation = useNavigate();

  const totalAnswers = answers.length;
  const validAnswers = useMemo(
    () => answers.filter((v) => v.isCorrect).length,
    [answers],
  );

  const message = useMemo(() => {
    if (totalAnswers === 0) return "Нет ответов для оценки";

    const percent = (validAnswers / totalAnswers) * 100;

    if (percent <= 50) return "Не расстраивайся!";
    if (percent <= 70) return "Неплохо!";
    if (percent < 100) return "Хорошо!";
    return "Отлично!";
  }, [totalAnswers, validAnswers]);

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
        <DykTypography text={message} variant="body2" />
        <DykTypography
          text={`Ваш результат: ${validAnswers}/${totalAnswers}`}
          variant="body2"
        />
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", mx: 1, mb: 2 }}>
        <DykButton title="Повторить" onClick={onRepeat} />
        {showHome && (
          <DykButton title="На главную" onClick={() => navigation("/")} />
        )}
      </CardActions>
    </CardWrapper>
  );
}
