import { useNavigate } from "react-router-dom";
import { useAuthForm } from "./hooks/useAuthForm";
import { AuthFormView } from "./ui/AuthFormView";

export default function AuthController({
  isShowSignUp = false,
}: {
  isShowSignUp?: boolean;
}) {
  const navigate = useNavigate();
  const form = useAuthForm(isShowSignUp);

  return (
    <AuthFormView
      title={isShowSignUp ? "Зарегистрируйтесь" : "Форма входа"}
      submitText={isShowSignUp ? "Зарегистрироваться" : "Войти"}
      switchText={
        isShowSignUp
          ? "Уже есть аккаунт? Войти"
          : "Нет аккаунта? Зарегистрироваться"
      }
      {...form}
      data={form.data}
      error={form.error}
      errors={form.errors}
      loading={form.loading}
      onSubmit={form.submit}
      onChange={form.updateField}
      onSwitch={() =>
        navigate(isShowSignUp ? "/login" : "/sign-up")
      }
    />
  );
}
