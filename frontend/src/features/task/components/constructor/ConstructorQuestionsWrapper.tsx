import { Box } from "@mui/system";
import React from "react";
import DykTypography from "../../../../components/UI/typography/DykTypography";
import { Question } from "../../../../entities/question";
import ConstructorQuestions from "./ConstructorQuestions";
import { Task } from "../../../../entities/task";

interface Props {
  task: Task;
  onSave: (question: Question) => void;
}

export default function ConstructorQuestionsWrapper({ task, onSave }: Props) {
  return (
    <Box>
      <DykTypography
        text="Cоздайте вопросы для теста"
        align="center"
        variant="body2"
      />
      <ConstructorQuestions
        task={task}
        onSaveQuestion={onSave}
      />
    </Box>
  );
}
