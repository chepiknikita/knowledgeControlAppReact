import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ApiFactory } from "../../../api";
import { Auth, UserResponse } from "../../../api/interfaces/auth";

interface AuthContextType {
  user: UserResponse | null;
  loading: boolean;
  login: (payload: Auth) => Promise<{ success: boolean; error?: string }>;
  signup: (payload: Auth) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

function parseJwt(token: string): Record<string, unknown> {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    throw new Error('Невозможно декодировать токен');
  }
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (
    error !== null &&
    typeof error === "object" &&
    "response" in error
  ) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return fallback;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const authServiceRef = useRef(ApiFactory.createAuthService());
  const authService = authServiceRef.current;

  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const payload = parseJwt(token);
          setUser({
            id: payload.id,
            login: payload.login,
            avatar: payload.avatar,
            roles: payload.roles || [],
          });
        } catch (error) {
          console.error("Ошибка декодирования токена:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (payload: Auth) => {
    try {
      const response = await authService.login(payload);
      const data = parseJwt(response.accessToken);
      setUser({
        id: data.id,
        login: data.login,
        avatar: data.avatar,
        roles: data.roles || [],
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: extractErrorMessage(error, "Ошибка авторизации"),
      };
    }
  };

  const signup = async (payload: Auth) => {
    try {
      const response = await authService.signUp(payload);
      const data = parseJwt(response.accessToken);
      setUser({
        id: data.id,
        login: data.login,
        avatar: data.avatar,
        roles: data.roles || [],
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: extractErrorMessage(error, "Ошибка регистрации"),
      };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
