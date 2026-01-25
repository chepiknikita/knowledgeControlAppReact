import { useCallback, useState } from "react";
import { Question } from "../../../entities/question";

export function useQuestionEditing() {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const openEdit = useCallback(
    (question: Question) => setEditingQuestion(question),
    [],
  );

  const closeEdit = useCallback(() => setEditingQuestion(null), []);

  return {
    editingQuestion,
    openEdit,
    closeEdit,
  };
}
