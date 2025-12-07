import { QuestionItem } from "./questions";

export interface Author {
  name: string;
  avatar: string;
}

export interface TaskItem {
  id: number;
  createdAt: string;
  author: Author;
  image: string;
  name: string;
  description: string;
  countQuestions: number;
}

export interface TaskItemById extends TaskItem {
  questions: QuestionItem[];
}

export interface TaskCreating {
  image: string;
  name: string;
  description: string;
  userId: number;
  questions: QuestionItem[];
}


export type TaskEdit = Pick<TaskItem, "image" | "name" | "description">;
