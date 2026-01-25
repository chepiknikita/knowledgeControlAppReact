import { Question } from "../../../../entities/question";
import QuestionCreateDialog from "./QuestionCreateDialog";

type Props = {
  question: Question | null;
  onSave: (question: Question) => void;
  onClose: () => void;
};

export function EditQuestionDialog({ question, onSave, onClose }: Props) {
  if (!question) return null;

  return (
    <QuestionCreateDialog
      openDialog
      header="Редактирование вопроса"
      initailData={question}
      onSave={onSave}
      handleClose={onClose}
    />
  );
}