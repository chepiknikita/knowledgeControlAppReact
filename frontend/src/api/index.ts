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
  private static authServiceInstance: AuthService;
  private static taskServiceInstance: TaskService;
  private static userServiceInstance: UserService;

  private static initialize() {
    if (!this.apiInstance) {
      this.apiInstance = new ApiClient(urlService.getServerUrl());
    }
  }

  public static createAuthService(): AuthService {
    this.initialize();
    if (!this.authServiceInstance) {
      this.authServiceInstance = new AuthService(
        new AuthRepository(new AuthEndpoint(this.apiInstance.instance))
      );
    }
    return this.authServiceInstance;
  }

  public static createTaskService(): TaskService {
    this.initialize();
    if (!this.taskServiceInstance) {
      this.taskServiceInstance = new TaskService(
        new TaskRepository(new TaskEndpoint(this.apiInstance.instance))
      );
    }
    return this.taskServiceInstance;
  }

  public static createUserService(): UserService {
    this.initialize();
    if (!this.userServiceInstance) {
      this.userServiceInstance = new UserService(
        new UserRepository(new UserEndpoint(this.apiInstance.instance))
      );
    }
    return this.userServiceInstance;
  }
}
