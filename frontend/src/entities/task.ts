import { Author as ApiAuthor, TaskResponse } from "../api/interfaces/tasks";
import urlService from "../api/serverUrl/urlService";
import { Question } from "./question";

export interface Author extends ApiAuthor {
  imageUrl?: string;
}

export interface ITask {
  id?: number | string;
  name: string;
  description: string;
  image?: File;
  imageUrl: string;
  user?: Author;
  createdAt?: string;
  questions: Question[];
}

export class Task implements ITask {
  id?: number | string;
  name: string;
  description: string;
  image?: File;
  imageUrl: string;
  user?: Author;
  createdAt?: string;
  questions: Question[];

  constructor(data: Partial<ITask>) {
    this.id = data.id;
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.image = data.image;
    this.imageUrl = data.imageUrl ?? "";
    this.user = data.user;
    this.createdAt = data.createdAt;
    this.questions = data.questions ?? [];
  }

  static empty(): Task {
    return new Task({
      name: "",
      description: "",
      imageUrl: "",
      questions: [],
    });
  }

  static fromApi(data: TaskResponse): Task {
    return new Task({
      id: data.id,
      name: data.name,
      imageUrl: data.image ? urlService.getImageUrl(data.image) : "",
      description: data.description,
      user: data.user && {
        ...data.user,
        imageUrl: data.user.avatar
          ? urlService.getImageUrl(data.user.avatar)
          : "" 
      },
      createdAt: data.createdAt,
      questions: data.questions?.map((v) => Question.fromApi(v)),
    });
  }

  public toApi(): (Partial<ITask> & { userId?: number }) {
    return {
      name: this.name,
      description: this.description,
      userId: this.user?.id,
      questions: this.questions,
    };
  }

  public toFormData(): FormData {
    const formData = new FormData();
    if (this.image) {
      formData.append("image", this.image);
    }
    formData.append("data", JSON.stringify(this.toApi()));
    return formData;
  }

  public toResponse(): TaskResponse {
    return {
      id: this.id ?? 0,
      name: this.name,
      description: this.description,
      image: this.imageUrl,
      user: this.user,
      createdAt: this.createdAt ?? new Date().toISOString(),
      questions: this.questions.map((q) => q.toResponse()),
    };
  }

  public validate(): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!this.name.trim()) {
      errors.name = "Название задания не может быть пустым";
    }

    if (!this.description.trim()) {
      errors.description = "Описание задания не может быть пустым";
    }

    if (this.questions.length === 0) {
      errors.questions = "Задание должно содержать хотя бы один вопрос";
    }

    const invalidQuestions = this.questions.filter(
      (q) => !q.validate().isValid
    );
    if (invalidQuestions.length > 0) {
      errors.invalidQuestions = `${invalidQuestions.length} вопрос(а) содержат ошибки`;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
