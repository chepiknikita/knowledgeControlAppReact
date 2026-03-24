import React from "react";
import { Task } from "../../entities/task";
import { Answer } from "../../entities/answer";
import { useTaskRun } from "./hooks/useTaskRun";
import { TaskIntro } from "./ui/TaskIntro";
import { TaskQuestion } from "./ui/TaskQuestion";
import { TaskFinish } from "./ui/TaskFinish";

interface Props {
  task: Task;
  showHome?: boolean;
  onHome?: () => void;
}

export default function TaskRunFeature({
  task,
  showHome = true,
  onHome = () => {},
}: Props) {

  const {
    step,
    currentQuestion,
    answers,
    currentAnswer,
    questionProgress,
    start,
    handleAnswer,
    handleBack,
    handleRepeat,
  } = useTaskRun(task);

  if (step === "intro") {
    return (
      <TaskIntro
        name={task.name}
        description={task.description}
        image={task.imageUrl}
        questionsCount={task.questions.length}
        showHome={showHome}
        onStart={start}
        onHome={onHome}
      />
    );
  }

  if (step === "question" && currentQuestion) {
    return (
      <TaskQuestion
        question={currentQuestion}
        progress={questionProgress}
        currentAnswer={currentAnswer ?? undefined}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    );
  }

  return (
    <TaskFinish
      answers={answers.filter((a): a is Answer => a !== null)}
      showHome={showHome}
      onRepeat={handleRepeat}
      onHome={onHome}
    />
  );
}
