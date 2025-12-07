import React from "react";
import { useNavigate } from "react-router-dom";
import TaskQuestions from "../features/task/TaskQuestions";

export default function TheTaskQuestions() {
  const navigation = useNavigate();

  const questions = [
    {
      id: 12,
      question: "Кто такое Петр1?",
      answers: [
        {
          id: 1,
          text: "Asdasdsada asd asd asd",
          valid: false,
        },
        {
          id: 2,
          text: "asdasd  asd dd dd",
          valid: true,
        },
        {
          id: 3,
          text: "werwerwer w",
          valid: false,
        },
        {
          id: 4,
          text: "werewr",
          valid: false,
        },
      ],
    },
    {
      id: 13,
      question: "Кто такое Петр1?",
      answers: [
        {
          id: 1,
          text: "Asdasdsada asd asd asd",
          valid: false,
          isSelect: false,
        },
        {
          id: 2,
          text: "asdasd  asd dd dd",
          valid: true,
          isSelect: false,
        },
        {
          id: 3,
          text: "werwerwer w",
          valid: false,
          isSelect: false,
        },
        {
          id: 4,
          text: "werewr",
          valid: false,
          isSelect: false,
        },
      ],
    },
  ];

  const onAnswer = () => {
    navigation(`/task/end/3`);
  };
  const current: any = questions[0];

  return <TaskQuestions question={current} onAnswer={onAnswer} />;
}
