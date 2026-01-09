import React, { useState } from "react";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { Alert, Box, Card, CardContent, TextField } from "@mui/material";
import DykTypography from "../../components/UI/typography/DykTypography";
import DykButton from "../../components/UI/buttons/DykButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthForm({
  isShowSignUp = false,
}: {
  isShowSignUp?: boolean;
}) {
  const { login, signup } = useAuth();
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    login: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    login: "",
    password: "",
  });

  const title = isShowSignUp ? "Зарегистрируйтесь" : "Форма входа";
  const submitButtonText = isShowSignUp ? "Зарегистрироваться" : "Войти";
  const switchButtonText = isShowSignUp
    ? "Уже есть аккаунт? Войти"
    : "Нет аккаунта? Зарегистрироваться";

  const validateForm = (): boolean => {
    const errors = {
      login: "",
      password: "",
    };
    let isValid = true;

    if (!formData.login.trim()) {
      errors.login = "Введите логин";
      isValid = false;
    } else if (formData.login.length < 3) {
      errors.login = "Логин должен быть не менее 3 символов";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Введите пароль";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Пароль должен быть не менее 6 символов";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      if (isShowSignUp) {
        result = await signup(formData);
      } else {
        result = await login(formData);
      }

      if (result.success) {
        navigation("/", { replace: true });
      } else {
        setError(result.error || "Произошла ошибка");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Произошла непредвиденная ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchPage = () => {
    navigation(isShowSignUp ? "/login" : "/sign-up");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  return (
    <PageWrapper>
      <Card sx={{ width: 400, px: 1 }} component="form" onSubmit={handleSubmit}>
        <CardContent>
          <DykTypography
            text={title}
            variant="h6"
            align="center"
            sx={{ my: 1 }}
          />
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}
          <TextField
            placeholder="Логин"
            name="login"
            fullWidth
            size="small"
            sx={{ my: 1 }}
            value={formData.login}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={!!formErrors.login}
            helperText={formErrors.login}
            disabled={loading}
            autoComplete="username"
          />
          <TextField
            placeholder="Пароль"
            name="password"
            type="password"
            fullWidth
            size="small"
            sx={{ mt: 1 }}
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            error={!!formErrors.password}
            helperText={formErrors.password}
            disabled={loading}
            autoComplete={isShowSignUp ? "new-password" : "current-password"}
          />
        </CardContent>
        <Box sx={{ px: 2, pb: 2 }}>
          <DykButton
            title={submitButtonText}
            fullWidth
            sx={{ my: 1 }}
            onClick={handleButtonClick}
            disabled={loading}
          />
          <DykButton
            title={switchButtonText}
            fullWidth
            sx={{ my: 1 }}
            onClick={handleSwitchPage}
            disabled={loading}
          />
        </Box>
      </Card>
    </PageWrapper>
  );
}
