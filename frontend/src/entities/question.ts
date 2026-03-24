import { QuestionResponse } from "../api/interfaces/questions";
import { Answer, IAnswer } from "./answer";
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

  public toApi(): { question: string; answers: Partial<IAnswer>[] } {
    return {
      question: this.question,
      answers: this.answers.map((a) => a.toApi()),
    };
  }

  public validate(): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!this.question.trim()) {
      errors.question = "Текст вопроса не может быть пустым";
    }

    if (this.answers.length < 2) {
      errors.answers = "Вопрос должен содержать минимум 2 ответа";
    }

    if (!this.answers.some((a) => a.isCorrect)) {
      errors.correctAnswer = "Необходимо выбрать правильный ответ";
    }

    const answerErrors = this.answers.filter((a) => !a.validate().isValid);
    if (answerErrors.length > 0) {
      errors.answerTexts = "Все ответы должны содержать текст";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
