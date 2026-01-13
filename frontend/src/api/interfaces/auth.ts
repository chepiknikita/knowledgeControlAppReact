export interface Auth {
  login: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: number;
  login: string;
  avatar: string;
  roles: string[];
}
