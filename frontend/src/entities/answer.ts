import { AnswerResponse } from "../api/interfaces/questions";
import { v4 as uuidv4 } from 'uuid';

export interface IAnswer {
  id?: number | string;
  text: string;
  isCorrect: boolean;
}

export class Answer implements IAnswer {
  id: number | string;
  text: string;
  isCorrect: boolean;

  constructor(data: Partial<IAnswer>) {
    this.id = data.id ?? uuidv4();
    this.text = data.text ?? "";
    this.isCorrect = data.isCorrect ?? false;
  }

  static empty(): Answer {
    return new Answer({
      id: uuidv4(),
      text: "",
      isCorrect: false,
    });
  }

  static fromApi(data: AnswerResponse): Answer {
    return new Answer({
      id: data.id,
      text: data.text,
      isCorrect: data.isCorrect,
    });
  }

  public toApi(): Partial<IAnswer> {
    return {
      text: this.text,
      isCorrect: this.isCorrect,
    };
  }

  public toResponse() {
    return {
      id: this.id ?? uuidv4(),
      text: this.text,
      isCorrect: this.isCorrect,
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
