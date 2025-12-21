import { AnswerResponse } from "../api/interfaces/questions";

export interface IAnswer {
  id?: number;
  text: string;
  isCorrect: boolean;
}

export class Answer implements IAnswer {
  id: number;
  text: string;
  isCorrect: boolean;

  constructor(data: Partial<IAnswer>) {
    this.id = data.id ?? Date.now();
    this.text = data.text ?? "";
    this.isCorrect = data.isCorrect ?? false;
  }

  static empty(): Answer {
    return new Answer({
      id: Date.now(),
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

  public validate(): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
