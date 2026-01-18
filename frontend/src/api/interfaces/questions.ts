export interface QuestionResponse {
  id: number | string;
  question: string;
  answers: AnswerResponse[];
}

export interface AnswerResponse {
  id: number | string;
  text: string;
  isCorrect: boolean;
}
