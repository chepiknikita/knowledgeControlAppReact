import { memo } from "react";
import { Box } from "@mui/system";
import { Alert, Card, CardContent, TextField } from "@mui/material";
import { AuthFormData, FormErrors } from "../hooks/useAuthForm";
import PageWrapper from "../../../components/wrappers/PageWrapper";
import DykTypography from "../../../components/UI/typography/DykTypography";
import DykButton from "../../../components/UI/buttons/DykButton";

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
      <Card sx={{ width: 350 }} component="form" onSubmit={(e) => e.preventDefault()}>
        <CardContent>
          <DykTypography
            text={title}
            variant="h6"
            align="center"
          />

          <TextField
            placeholder="Логин"
            name="login"
            value={data.login}
            error={!!errors.login}
            helperText={errors.login}
            disabled={loading}
            fullWidth
            size="small"
            sx={{ my: 1, fontSize: '14px' }}
            onChange={(e) => onChange("login", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
               onSubmit();
              }
            }}
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
            size="small"
            onChange={(e) => onChange("password", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
               onSubmit();
              }
            }}
          />

          {error &&
            <Alert
              variant="outlined"
              severity="error"
              color="error"
              sx={{ my:1 }}
            >
              {error}
            </Alert>}
        </CardContent>

        <Box sx={{ px: 2, pb: 2 }}>
          <DykButton
            title={submitText}
            disabled={loading}
            fullWidth
            sx={{ mb: 1 }}
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
