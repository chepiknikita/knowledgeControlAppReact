import { useCallback, useEffect, useMemo, useState } from "react";
import { Question } from "../../../entities/question";
import { Answer } from "../../../entities/answer";

export function useQuestionState(
  initialData?: Question,
  openDialog?: boolean,
) {
  const [question, setQuestion] = useState(() => Question.empty());

  useEffect(() => {
    setQuestion(initialData ? new Question(initialData) : Question.empty());
  }, [initialData, openDialog]);

  const isValid = useMemo(() => question.validate().isValid, [question]);

  const setField = useCallback(
    (field: keyof Question, value: Question[keyof Question]) =>
      setQuestion((prev) => new Question({ ...prev, [field]: value })),
    [],
  );

  const updateAnswerText = useCallback(
    (id: Answer["id"], text: string) =>
      setQuestion(
        (prev) =>
          new Question({
            ...prev,
            answers: prev.answers.map((a) =>
              a.id === id ? new Answer({ ...a, text }) : a,
            ),
          }),
      ),
    [],
  );

  const setCorrectAnswer = useCallback(
    (id: Answer["id"]) =>
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
      ),
    [],
  );

  const removeAnswer = useCallback(
    (id: Answer["id"]) =>
      setQuestion(
        (prev) =>
          new Question({
            ...prev,
            answers: prev.answers.filter((a) => a.id !== id),
          }),
      ),
    [],
  );

  const addAnswer = useCallback(
    () =>
      setQuestion(
        (prev) =>
          new Question({
            ...prev,
            answers: [...prev.answers, Answer.empty()],
          }),
      ),
    [],
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
