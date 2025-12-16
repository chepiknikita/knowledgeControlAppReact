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
  const [questionProgress, setQuestionProgress] = useState("");

  useEffect(() => {
    if (questions.length > 0 && number < questions.length) {
      setCurrent(questions[number]);
      setQuestionProgress(`${number + 1}/${questions.length}`);
    }
  }, [number, questions]);

  const onAnswer = (answer: AnswerItem | undefined) => {
    if (number !== questions.length) {
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

  const onRepeat = () => {
    setNumber(0);
    setUserAnswers([]);
  }

  return (
    <>
      {current && !loading ? (
        number !== questions.length ? (
          <TaskQuestions
            question={current}
            questionProgress={questionProgress}
            onAnswer={onAnswer}
            onBack={onBack}
          />
        ) : (
          <TaskFinish answers={userAnswers} onRepeat={onRepeat}/>
        )
      ) : (
        <Box>Идет загрузка</Box>
      )}
    </>
  );
}
