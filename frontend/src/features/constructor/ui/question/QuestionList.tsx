import { Box } from "@mui/system";
import { Question } from "../../../../entities/question";
import { QuestionItem } from "./QuestionItem";

type Props = {
  questions: Question[];
  onEdit: (question: Question) => void;
};

export function QuestionsList({ questions, onEdit }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          number={index + 1}
          onEdit={() => onEdit(question)}
        />
      ))}
    </Box>
  );
}
