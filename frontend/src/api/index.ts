import { AuthService } from "./services/AuthService";
import { TaskService } from "./services/TaskService";
import AuthRepository from "./repositories/AuthRepository";
import AuthEndpoint from "./endpoints/AuthEndpoint";
import TaskRepository from "./repositories/TaskRepository";
import TaskEndpoint from "./endpoints/TaskEndpoint";
import ApiClient from "./config/ApiClient";
import urlService from "./serverUrl/urlService";
import UserService from "./services/UserService";
import UserRepository from "./repositories/UserRepository";
import UserEndpoint from "./endpoints/UserEndpoint";

export class ApiFactory {
  private static apiInstance: ApiClient;

  private static initialize() {
    if (!this.apiInstance) {
      this.apiInstance = new ApiClient(urlService.getServerUrl());
    }
  }

  public static createAuthService(): AuthService {
    this.initialize();
    const repository = new AuthRepository(
      new AuthEndpoint(this.apiInstance.api)
    );
    return new AuthService(repository);
  }

  public static createTaskService(): TaskService {
    this.initialize();
    const repository = new TaskRepository(
      new TaskEndpoint(this.apiInstance.api)
    );
    return new TaskService(repository);
  }

  public static createUserService(): UserService {
    this.initialize();
    const repository = new UserRepository(
      new UserEndpoint(this.apiInstance.api)
    );
    return new UserService(repository);
  }
}
