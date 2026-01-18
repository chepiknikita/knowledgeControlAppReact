import { TaskResponse } from "../api/interfaces/tasks";
import urlService from "../api/serverUrl/urlService";
import { Question } from "./question";

export interface Author {
  id: number;
  login: string;
  avatar: string;
  imageUrl?: string;
}

export interface ITask {
  id?: number | string;
  name: string;
  description: string;
  image?: File;
  imageBase64: string;
  user?: Author;
  createdAt?: string;
  questions: Question[];
}

export class Task implements ITask {
  id?: number | string;
  name: string;
  description: string;
  image?: File;
  imageBase64: string;
  user?: Author;
  createdAt?: string;
  questions: Question[];

  constructor(data: Partial<ITask>) {
    this.id = data.id;
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.image = data.image;
    this.imageBase64 = data.imageBase64 ?? "";
    this.user = data.user;
    this.createdAt = data.createdAt;
    this.questions = data.questions ?? [];
  }

  static empty(): Task {
    return new Task({
      name: "",
      description: "",
      imageBase64: "",
      questions: [],
    });
  }

  static fromApi(data: TaskResponse): Task {
    return new Task({
      id: data.id,
      name: data.name,
      imageBase64: data.image ? urlService.getImageUrl(data.image) : "",
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
      image: "",
      imageBase64: this.imageBase64,
      user: this.user,
      createdAt: this.createdAt ?? new Date().toISOString(),
      questions: this.questions.map((q) => q.toResponse()),
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
