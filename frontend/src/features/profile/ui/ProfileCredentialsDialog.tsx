import { useEffect, useMemo, useState } from "react";
import { UserCredentialsUpdate } from "../../../entities/user";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

type ProfileCredentialsForm = {
  login: string;
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
};

type FormErrors = Partial<Record<keyof ProfileCredentialsForm, string>>;

function validateProfileCredentials(data: ProfileCredentialsForm): FormErrors {
  const errors: FormErrors = {};

  if (data.login && data.login.length < 3) {
    errors.login = "Логин должен быть не короче 3 символов";
  }

  if (data.newPassword || data.repeatPassword) {
    if (!data.currentPassword) {
      errors.currentPassword = "Введите текущий пароль";
    }

    if (data.newPassword.length < 6) {
      errors.newPassword = "Пароль должен быть не короче 6 символов";
    }

    if (data.newPassword !== data.repeatPassword) {
      errors.repeatPassword = "Пароли не совпадают";
    }
  }

  return errors;
}

type Props = {
  isOpen: boolean;
  loading?: boolean;
  initialLogin?: string;
  onClose: () => void;
  onSubmit: (payload: UserCredentialsUpdate) => void;
};

export const ProfileCredentialsDialog = ({
  isOpen,
  loading = false,
  initialLogin = "",
  onClose,
  onSubmit,
}: Props) => {
  const [form, setForm] = useState<ProfileCredentialsForm>({
    login: initialLogin,
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      login: initialLogin,
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    });
    setValidationErrors({});
  }, [isOpen, initialLogin]);

  const handleFieldChange = (
    field: keyof ProfileCredentialsForm,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const { isLoginChanged, isPasswordValidInput, isSaveDisabled } =
    useMemo(() => {
      const isLoginChanged = Boolean(form.login) && form.login !== initialLogin;

      const isPasswordValidInput =
        Boolean(form.currentPassword) &&
        Boolean(form.newPassword) &&
        Boolean(form.repeatPassword);

      const canSave = isLoginChanged || isPasswordValidInput;

      return {
        isLoginChanged,
        isPasswordValidInput,
        isSaveDisabled: loading || !canSave,
      };
    }, [form, initialLogin, loading]);

  const handleSubmit = () => {
    if (isSaveDisabled) return;

    const errors = validateProfileCredentials(form);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload: UserCredentialsUpdate = {};

    if (isLoginChanged) {
      payload.login = form.login;
    }

    if (isPasswordValidInput) {
      payload.currentPassword = form.currentPassword;
      payload.newPassword = form.newPassword;
    }

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }

    onSubmit(payload);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onClick={(e) => e.stopPropagation()}
      maxWidth="sm"
    >
      <DialogTitle component="div" variant="body1">
        Редактирование данных пользователя
      </DialogTitle>

      <DialogContent dividers sx={{ display: "grid", gap: 2 }}>
        <TextField
          placeholder="Новый логин"
          value={form.login}
          error={!!validationErrors.login}
          helperText={validationErrors.login}
          disabled={loading}
          fullWidth
          size="small"
          onChange={(e) => handleFieldChange("login", e.target.value)}
        />

        <TextField
          placeholder="Текущий пароль"
          type="password"
          value={form.currentPassword}
          error={!!validationErrors.currentPassword}
          helperText={validationErrors.currentPassword}
          disabled={loading}
          fullWidth
          size="small"
          onChange={(e) => handleFieldChange("currentPassword", e.target.value)}
        />

        <TextField
          placeholder="Новый пароль"
          type="password"
          value={form.newPassword}
          error={!!validationErrors.newPassword}
          helperText={validationErrors.newPassword}
          disabled={loading}
          fullWidth
          size="small"
          onChange={(e) => handleFieldChange("newPassword", e.target.value)}
        />

        <TextField
          placeholder="Повторите новый пароль"
          type="password"
          value={form.repeatPassword}
          error={!!validationErrors.repeatPassword}
          helperText={validationErrors.repeatPassword}
          disabled={loading}
          fullWidth
          size="small"
          onChange={(e) => handleFieldChange("repeatPassword", e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={handleSubmit}
          disabled={isSaveDisabled}
        >
          Сохранить
        </Button>

        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={onClose}
          disabled={loading}
        >
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};
