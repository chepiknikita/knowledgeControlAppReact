import { TaskResponse } from "../api/interfaces/tasks";
import urlService from "../api/serverUrl/urlService";
import { Question } from "./question";

export interface ITask {
  id?: number;
  name: string;
  description: string;
  image?: File;
  imageBase64: string;
  userId?: number;
  questions: Question[];
}

export class Task implements ITask {
  id?: number;
  name: string;
  description: string;
  image?: File;
  imageBase64: string;
  userId?: number;
  questions: Question[];

  constructor(data: Partial<ITask>) {
    this.id = data.id;
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.image = data.image;
    this.imageBase64 = data.imageBase64 ?? "";
    this.userId = data.userId;
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
      userId: data.user.id,
      questions: data.questions.map((v) => Question.fromApi(v)),
    });
  }

  public toApi(): Partial<ITask> {
    return {
      name: this.name,
      description: this.description,
      userId: this.userId,
      questions: this.questions,
    };
  }

  public toFormData(): FormData {
    const formData = new FormData();
    console.log('wweeee', this.image)
    if (this.image) {
      formData.append("image", this.image);
    }
    formData.append("data", JSON.stringify(this.toApi()));
    return formData;
  }

  public validate(): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
