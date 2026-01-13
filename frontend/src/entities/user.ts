import { AuthUser } from "../api/interfaces/auth";
import urlService from "../api/serverUrl/urlService";

export interface IUser {
  id: number;
  login: string;
  avatar?: File;
  avatarBase64?: string;
  roles: string[];
  password?: string | null;
}

export class User implements IUser {
  id: number;
  login: string;
  avatar?: File;
  avatarBase64: string;
  roles: string[];

  constructor(data: Partial<IUser>) {
    this.id = data.id ?? 0;
    this.login = data.login ?? "";
    this.avatar = data.avatar;
    this.avatarBase64 = data.avatarBase64 ?? "";
    this.roles = data.roles ?? [];
  }

  static fromApi(data: AuthUser) {
    return new User({
      id: data.id,
      login: data.login,
      avatarBase64: data.avatar ? urlService.getImageUrl(data.avatar) : '',
      roles: data.roles,
    });
  }

  public toApi(): Partial<IUser> {
    return {
      login: this.login,
      password: null,
    };
  }

  public toFormData(): FormData {
    const formData = new FormData();
    if (this.avatar) {
      formData.append("image", this.avatar);
    }
    formData.append("data", JSON.stringify(this.toApi()));
    return formData;
  }
}
