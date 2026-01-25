import { useMemo } from "react";
import { Answer } from "../../../entities/answer";

export function useTaskFinish(answers: Answer[]) {
  const total = answers.length;
  const correct = answers.filter((a) => a.isCorrect).length;

  const message = useMemo(() => {
    if (!total) return "Нет ответов для оценки";

    const percent = (correct / total) * 100;

    if (percent <= 50) return "Не расстраивайся!";
    if (percent <= 70) return "Неплохо!";
    if (percent < 100) return "Хорошо!";
    return "Отлично!";
  }, [total, correct]);

  return {
    total,
    correct,
    message,
  };
}
