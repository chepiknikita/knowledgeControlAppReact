import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCallback, useState } from "react";

export interface AuthFormData {
  login: string;
  password: string;
}

export interface FormErrors {
  login?: string;
  password?: string;
}

export function useAuthForm(isSignUp: boolean) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<AuthFormData>({
    login: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((): boolean => {
    const nextErrors: FormErrors = {};

    if (!data.login.trim()) {
      nextErrors.login = "Введите логин";
    } else if (data.login.length < 3) {
      nextErrors.login = "Логин должен быть не менее 3 символов";
    }

    if (!data.password) {
      nextErrors.password = "Введите пароль";
    } else if (data.password.length < 6) {
      nextErrors.password = "Пароль должен быть не менее 6 символов";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [data]);

  const submit = useCallback(async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const result = isSignUp
        ? await signup(data)
        : await login(data);

      if (result.success) {
        navigate("/", { replace: true });
      } else {
        setError(result.error ?? "Произошла ошибка");
      }
    } catch {
      setError("Произошла непредвиденная ошибка");
    } finally {
      setLoading(false);
    }
  }, [data, isSignUp, login, signup, navigate, validate]);

  const updateField = useCallback(
    (name: keyof AuthFormData, value: string) => {
      setData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
      if (error) setError(null);
    },
    [errors, error]
  );

  return {
    data,
    errors,
    loading,
    error,
    submit,
    updateField,
  };
}
