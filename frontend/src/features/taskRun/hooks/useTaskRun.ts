import { useState } from "react";
import { Task } from "../../../entities/task";
import { Answer } from "../../../entities/answer";

type Step = "intro" | "question" | "finish";

export function useTaskRun(task: Task) {
  const [step, setStep] = useState<Step>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>([]);

  const questions = task.questions ?? [];
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];

  const questionProgress = `${currentIndex + 1}/${questions.length}`;

  const start = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
    setStep("question");
  };

  const handleAnswer = (answer?: Answer) => {
    if (!answer) return;

    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = answer;
      return next;
    });

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStep("finish");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setStep("intro");
    }
  };

  const handleRepeat = () => {
    setStep("intro");
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
  };

  return {
    step,
    currentQuestion,
    answers,
    currentAnswer,
    questionProgress,
    start,
    handleAnswer,
    handleBack,
    handleRepeat,
  };
}
