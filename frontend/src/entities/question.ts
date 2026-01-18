import { QuestionResponse } from "../api/interfaces/questions";
import { Answer } from "./answer";
import { v4 as uuidv4 } from 'uuid';

export interface IQuestion {
  id?: number | string;
  question: string;
  answers: Answer[];
}

export class Question implements IQuestion {
  id: number | string;
  question: string;
  answers: Answer[];

  constructor(data: Partial<IQuestion>) {
    this.id = data.id ?? uuidv4();
    this.question = data.question ?? "";
    this.answers = data.answers ?? [];
  }

  static empty(): Question {
    return new Question({
      question: "",
      answers: [],
    });
  }

  static fromApi(data: QuestionResponse): Question {
    return new Question({
      id: data.id,
      question: data.question,
      answers: data.answers?.map((v) => Answer.fromApi(v)),
    });
  }

  public toApi(): Partial<IQuestion> {
    return {
      question: this.question,
      answers: this.answers,
    };
  }

  public toResponse() {
    return {
      id: this.id ?? uuidv4(),
      question: this.question,
      answers: this.answers.map((a) => a.toResponse()),
    };
  }

  public validate(): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
