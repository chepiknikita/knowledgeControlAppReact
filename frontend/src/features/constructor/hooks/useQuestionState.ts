import { useEffect, useMemo, useState } from "react";
import { Question } from "../../../entities/question";
import { Answer } from "../../../entities/answer";
import { MAX_ANSWERS, MIN_ANSWERS } from "../constants";

export function useQuestionState(
  initialData?: Question,
  openDialog?: boolean,
) {
  const [question, setQuestion] = useState(Question.empty);

  useEffect(() => {
    setQuestion(initialData ? new Question(initialData) : Question.empty());
  }, [initialData, openDialog]);

  const isValid = useMemo(() => {
    const hasQuestion = Boolean(question.question.trim());
    const allAnswersHaveText = question.answers.every((a) => a.text.trim());
    const answersCount = question.answers.length;
    const hasCorrect = question.answers.some((a) => a.isCorrect);

    return (
      hasQuestion &&
      allAnswersHaveText && 
      answersCount >= MIN_ANSWERS &&
      answersCount <= MAX_ANSWERS &&
      hasCorrect
    );
  }, [question]);

  const setField = (field: keyof Question, value: Question[keyof Question]) =>
    setQuestion((prev) => new Question({ ...prev, [field]: value }));

  const updateAnswerText = (id: Answer["id"], text: string) =>
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.map((a) =>
            a.id === id ? new Answer({ ...a, text }) : a,
          ),
        }),
    );

  const setCorrectAnswer = (id: Answer["id"]) =>
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.map((a) =>
            a.id === id
              ? new Answer({ ...a, isCorrect: true })
              : new Answer({ ...a, isCorrect: false }),
          ),
        }),
    );

  const removeAnswer = (id: Answer["id"]) =>
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: prev.answers.filter((a) => a.id !== id),
        }),
    );

  const addAnswer = () =>
    setQuestion(
      (prev) =>
        new Question({
          ...prev,
          answers: [...prev.answers, Answer.empty()],
        }),
    );

  return {
    question,
    isValid,
    setField,
    updateAnswerText,
    setCorrectAnswer,
    removeAnswer,
    addAnswer,
  };
}
