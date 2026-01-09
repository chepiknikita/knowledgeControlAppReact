import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth, AuthUser } from "../api/interfaces/auth";
import { ApiFactory } from "../api";

interface AuthContextType {
  user: AuthUser | null;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const authService = ApiFactory.createAuthService();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser({
            id: payload.id,
            login: payload.login,
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
      const data = JSON.parse(atob(response.accessToken.split(".")[1]));
      setUser({
        id: data.id,
        login: data.login,
        roles: data.roles || [],
      });

      return { success: true };
    } catch (error) {
      const err = error as any;
      return {
        success: false,
        error: err.response?.data?.message || "Ошибка авторизации",
      };
    }
  };

  const signup = async (payload: Auth) => {
    try {
      const response = await authService.signUp(payload);
      const data = JSON.parse(atob(response.accessToken.split(".")[1]));
      setUser({
        id: data.id,
        login: data.login,
        roles: data.roles || [],
      });

      return { success: true };
    } catch (error) {
      const err = error as any;
      return {
        success: false,
        error: err.response?.data?.message || "Ошибка регистрации",
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
