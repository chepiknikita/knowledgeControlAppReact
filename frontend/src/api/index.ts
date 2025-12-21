import { AuthService } from "./services/AuthService";
import { QuestionService } from "./services/QuestionService";
import { TaskService } from "./services/TaskService";
import AuthRepository from "./repositories/AuthRepository";
import AuthEnpoint from "./endpoints/AuthEnpoint";
import TaskRepository from "./repositories/TaskRepository";
import TaskEnpoint from "./endpoints/TaskEnpoint";
import QuestionRepository from "./repositories/QuestionRepository";
import QuestionEnpoint from "./endpoints/QuestionEnpoint";
import ApiClient from "./config/ApiClient";
import urlService from "./serverUrl/urlService";

export class ApiFactory {
  private static apiInstance: ApiClient;

  private static initialize() {
    if (!this.apiInstance) {
      this.apiInstance = new ApiClient(urlService.getServerUrl());
    }
  }

  public static createAuthService(): AuthService {
    this.initialize();
    const repository = new AuthRepository(new AuthEnpoint(this.apiInstance.api));
    return new AuthService(repository);
  }

  public static createTaskService(): TaskService {
    this.initialize();
    const repository = new TaskRepository(new TaskEnpoint(this.apiInstance.api));
    return new TaskService(repository);
  }

  public static createQuestionService(): QuestionService {
    this.initialize();
    const repository = new QuestionRepository(
      new QuestionEnpoint(this.apiInstance.api)
    );
    return new QuestionService(repository);
  }
}
