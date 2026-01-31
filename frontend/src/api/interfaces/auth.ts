export interface Auth {
  login: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: number;
  login: string;
  avatar: string;
  roles: string[];
}
