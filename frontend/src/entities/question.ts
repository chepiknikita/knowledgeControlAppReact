import { QuestionResponse } from "../api/interfaces/questions";
import { Answer } from "./answer";

export interface IQuestion {
  id?: number;
  question: string;
  answers: Answer[];
}

export class Question implements IQuestion {
  id?: number;
  question: string;
  answers: Answer[];

  constructor(data: Partial<IQuestion>) {
    this.id = data.id;
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
      answers: data.answers.map((v) => Answer.fromApi(v)),
    });
  }

  public toApi(): Partial<IQuestion> {
    return {
      question: this.question,
      answers: this.answers,
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
