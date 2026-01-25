import { useEffect, useState } from "react";
import { Answer } from "../../../entities/answer";
import { Question } from "../../../entities/question";

export function useQuestionStep(question: Question, currentAnswer?: Answer) {
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    setSelectedId(currentAnswer?.id?.toString() ?? "");
  }, [currentAnswer, question.id]);

  const answers = question.answers ?? [];

  const selectedAnswer = answers.find((a) => a.id.toString() === selectedId);

  return {
    answers,
    selectedId,
    setSelectedId,
    selectedAnswer,
  };
}
