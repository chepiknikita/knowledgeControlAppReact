export interface TaskItem {
  id: number;
  img: string;
  name: string;
  description: string;
  count: number;
  author: string;
}

export interface AnswerItem {
  id: number;
  text: string;
  isCorrect: boolean;
  isSelect?: boolean;
}

export interface QuestionItem {
  id: number;
  question: string;
  answers: AnswerItem[];
}
