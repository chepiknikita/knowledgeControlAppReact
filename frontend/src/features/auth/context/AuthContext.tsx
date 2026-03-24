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
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

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

interface JwtPayload {
  id: number;
  login: string;
  avatar: string;
  roles: string[];
  exp: number;
}

function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload) as JwtPayload;
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
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
        const payload = parseJwt(token);
        if (payload) {
          setUser({
            id: payload.id,
            login: payload.login,
            avatar: payload.avatar,
            roles: payload.roles || [],
          });
        } else {
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
      if (!data) throw new Error("Ошибка авторизации");
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
        error: getErrorMessage(error),
      };
    }
  };

  const signup = async (payload: Auth) => {
    try {
      const response = await authService.signUp(payload);
      const data = parseJwt(response.accessToken);
      if (!data) throw new Error("Ошибка регистрации");
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
        error: getErrorMessage(error),
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
