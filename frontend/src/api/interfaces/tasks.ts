import { QuestionResponse } from "./questions";

export interface Author {
  id: number;
  login: string;
  avatar: string;
}

export interface TaskResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  imageBase64: string;
  user: Author;
  createdAt: string;
  questions: QuestionResponse[];
}
