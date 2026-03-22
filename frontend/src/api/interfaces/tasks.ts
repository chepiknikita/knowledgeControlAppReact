import { QuestionResponse } from "./questions";

export interface Author {
  id: number;
  login: string;
  avatar: string;
}

export interface TaskResponse {
  id: number | string;
  name: string;
  description: string;
  image: string;
  user?: Author;
  createdAt: string;
  questions: QuestionResponse[];
}
