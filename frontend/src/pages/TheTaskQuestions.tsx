import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskQuestions from "../features/task/TaskQuestions";
import { ApiFactory } from "../api";
import { AnswerItem, QuestionItem } from "../api/interfaces/questions";
import { Box } from "@mui/system";
import TaskFinish from "../features/task/TaskFinish";

export default function TheTaskQuestions() {
  const taskService = ApiFactory.createTaskService();
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [current, setCurrent] = useState<QuestionItem | null>(null);
  const [number, setNumber] = useState<number>(0);
  const { id } = useParams();
  const [userAnswers, setUserAnswers] = useState<AnswerItem[]>([]);

  useEffect(() => {
    if (questions.length > 0 && number < questions.length) {
      setCurrent(questions[number]);
    }
  }, [number, questions]);

  const onAnswer = (answer: AnswerItem | undefined) => {
    if (number != questions.length - 1) {
      if (answer) {
        setUserAnswers((prev) => [...prev, answer]);
      }
      setNumber((prev) => prev + 1);
    }
  };

  const onBack = () => {
    if (number > 0) {
      setNumber((prev) => prev - 1);
    } else {
      navigation(`/task/description/${id}`);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getById(+(id ?? 0));
        if (data) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      {current && !loading ? (
        number != questions.length - 1 ? (
          <TaskQuestions
            question={current}
            onAnswer={onAnswer}
            onBack={onBack}
          />
        ) : (
          <TaskFinish />
        )
      ) : (
        <Box>Идет загрузка</Box>
      )}
    </>
  );
}
