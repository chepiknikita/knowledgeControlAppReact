import { UserResponse } from "../api/interfaces/auth";
import urlService from "../api/serverUrl/urlService";

export interface IUser {
  id: number;
  login: string;
  avatarBase64?: string;
  roles: string[];
  password?: string | null;
  tasksCount?: number;
}

export interface UserCredentialsUpdate {
  login?: string;
  currentPassword?: string;
  newPassword?: string;
}

export class User implements IUser {
  id: number;
  login: string;
  avatarBase64: string;
  roles: string[];
  tasksCount?: number;

  constructor(data: Partial<IUser>) {
    this.id = data.id ?? 0;
    this.login = data.login ?? "";
    this.avatarBase64 = data.avatarBase64 ?? "";
    this.roles = data.roles ?? [];
    this.tasksCount = data.tasksCount ?? 0;
  }

  static fromApi(data: UserResponse) {
    return new User({
      id: data.id,
      login: data.login,
      avatarBase64: data.avatar ? urlService.getImageUrl(data.avatar) : '',
      roles: data.roles,
      tasksCount: data.tasksCount,
    });
  }
}
