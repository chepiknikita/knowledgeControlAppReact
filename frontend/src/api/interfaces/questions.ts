export interface QuestionResponse {
  id: number;
  question: string;
  answers: AnswerResponse[];
}

export interface AnswerResponse {
  id: number;
  text: string;
  isCorrect: boolean;
}
