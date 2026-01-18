import React, { useEffect, useState } from "react";
import TaskDescription from "./TaskDescription";
import TaskQuestions from "./TaskQuestions";
import TaskFinish from "./TaskFinish";
import { TaskResponse } from "../../api/interfaces/tasks";
import {
  AnswerResponse,
  QuestionResponse,
} from "../../api/interfaces/questions";

interface Props {
  task: TaskResponse;
  showHome?: boolean;
}

type TaskStep = "description" | "questions" | "finish";

export default function TaskProgress({ task, showHome = true }: Props) {
  const [step, setStep] = useState<TaskStep>("description");

  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerResponse | null)[]>([]);

  useEffect(() => {
    if (!task) {
      return;
    }
    setQuestions(task.questions);
    setAnswers(new Array(task.questions.length).fill(null));
    setCurrentIndex(0);
    setStep("description");
  }, [task]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];

  const questionProgress = `${currentIndex + 1}/${questions.length}`;

  const onStartTask = () => {
    setStep("questions");
    setCurrentIndex(0);
  };

  const handleAnswer = (answer?: AnswerResponse) => {
    if (!answer) {
      return;
    }

    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = answer;
      return next;
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStep("finish");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setStep("description");
    }
  };

  const handleRepeat = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
    setStep("questions");
  };

  return (
    <>
      {step === "description" && (
        <TaskDescription
          task={task}
          showHome={showHome}
          onStart={onStartTask}
        />
      )}
      {step === "questions" && currentQuestion && (
        <TaskQuestions
          question={currentQuestion}
          questionProgress={questionProgress}
          currentAnswer={currentAnswer}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}
      {step === "finish" && (
        <TaskFinish
          answers={answers.filter(Boolean) as AnswerResponse[]}
          showHome={showHome}
          onRepeat={handleRepeat}
        />
      )}
    </>
  );
}
