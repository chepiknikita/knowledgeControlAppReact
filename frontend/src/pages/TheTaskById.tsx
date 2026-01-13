import React, { useEffect, useState } from "react";
import TaskDescription from "../features/task/TaskDescription";
import { ApiFactory } from "../api";
import { Box } from "@mui/system";
import { TaskResponse } from "../api/interfaces/tasks";
import { useParams } from "react-router-dom";
import { AnswerResponse, QuestionResponse } from "../api/interfaces/questions";
import TaskQuestions from "../features/task/TaskQuestions";
import TaskFinish from "../features/task/TaskFinish";

export default function TheTaskDescription() {
  const taskService = ApiFactory.createTaskService();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [showTask, setShowTask] = useState<boolean>(false);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [showFinish, setShowFinish] = useState<boolean>(false);

  const [task, setTask] = useState<TaskResponse | null>(null);
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  const [questionProgress, setQuestionProgress] = useState("");
  const [userAnswers, setUserAnswers] = useState<(AnswerResponse | null)[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getById(+(id ?? 0));
        if (data) {
          setTask(data);
          setQuestions(data.questions);
          setUserAnswers(new Array(data.questions.length).fill(null));
          setShowTask(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestionProgress(`${currentQuestionIndex + 1}/${questions.length}`);
    }
  }, [currentQuestionIndex, questions]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  const handleAnswer = (answer: AnswerResponse | undefined) => {
    if (!questions.length) return;
      if (answer) {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setUserAnswers(newAnswers);
      }
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setShowQuestions(false);
        setShowFinish(true);
      }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev -1);
    } else {
      setShowTask(true);
      setShowQuestions(false);
    }
  };

  const onStartTask = () => {
    setShowTask(false);
    setShowQuestions(true);
    setCurrentQuestionIndex(0);
  }

  const handleRepeat = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowFinish(false);
    setShowQuestions(true);
  }

  return (
    <>
      {task && !loading ? (
        <>
          {showTask && !showQuestions && !showFinish && 
            <TaskDescription
              task={task}
              onStart={onStartTask}
            />
          }
          {showQuestions && !showFinish && !showTask && currentQuestion &&
            <TaskQuestions
              question={currentQuestion}
              questionProgress={questionProgress}
              currentAnswer={currentAnswer}
              onAnswer={handleAnswer}
              onBack={handleBack}
            />
          }
          {showFinish && !showTask && !showQuestions &&
            <TaskFinish
              answers={userAnswers.filter(Boolean) as AnswerResponse[]}
              onRepeat={handleRepeat}
            />
          }
        </>
      ) : (
        <Box>Идет загрузка</Box>
      )}
    </>
  );
}
