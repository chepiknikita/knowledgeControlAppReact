import { memo } from "react";
import PageWrapper from "../../../components/wrappers/PageWrapper";
import { Alert, Card, CardContent, TextField } from "@mui/material";
import DykTypography from "../../../components/UI/typography/DykTypography";
import { Box } from "@mui/system";
import DykButton from "../../../components/UI/buttons/DykButton";
import { AuthFormData, FormErrors } from "../hooks/useAuthForm";

interface Props {
  title: string;
  submitText: string;
  switchText: string;
  loading: boolean;
  error: string | null;
  data: AuthFormData;
  errors: FormErrors;
  onChange: (name: keyof AuthFormData, value: string) => void;
  onSubmit: () => Promise<void>;
  onSwitch: () => void;
}

export const AuthFormView = memo(function AuthFormView({
  title,
  submitText,
  switchText,
  loading,
  error,
  data,
  errors,
  onChange,
  onSubmit,
  onSwitch,
}: Props): JSX.Element {
  return (
    <PageWrapper>
      <Card sx={{ width: 400 }} component="form" onSubmit={(e) => e.preventDefault()}>
        <CardContent>
          <DykTypography
            text={title}
            variant="h6"
            align="center"
          />

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            placeholder="Логин"
            name="login"
            value={data.login}
            error={!!errors.login}
            helperText={errors.login}
            disabled={loading}
            fullWidth
            onChange={(e) => onChange("login", e.target.value)}
          />

          <TextField
            placeholder="Пароль"
            name="password"
            type="password"
            value={data.password}
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
            fullWidth
            onChange={(e) => onChange("password", e.target.value)}
          />
        </CardContent>

        <Box sx={{ px: 2, pb: 2 }}>
          <DykButton
            title={submitText}
            disabled={loading}
            fullWidth
            onClick={onSubmit}
          />
          <DykButton
            title={switchText}
            disabled={loading}
            fullWidth
            onClick={onSwitch}
          />
        </Box>
      </Card>
    </PageWrapper>
  );
});
