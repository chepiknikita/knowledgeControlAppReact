import { memo } from "react";
import { Box } from "@mui/system";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import { AuthFormData, FormErrors } from "../hooks/useAuthForm";
import PageWrapper from "../../../components/wrappers/PageWrapper";
import DykButton from "../../../components/UI/buttons/DykButton";
import { ErrorAlert } from "../../../components/UI/alerts/ErrorAlert";

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
      <Card
        sx={{ width: 400, overflow: "visible" }}
        component="form"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Brand header with gradient accent bar */}
        <Box
          sx={{
            height: 4,
            background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 50%, #E11D48 100%)",
            borderRadius: "20px 20px 0 0",
          }}
        />

        <Box
          sx={{
            pt: 3,
            pb: 1.5,
            px: 3,
            textAlign: "center",
            borderBottom: "1px solid #F4F4F5",
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 800,
              fontSize: "1.6rem",
              letterSpacing: ".3rem",
              background: "linear-gradient(135deg, #7C3AED 0%, #E11D48 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 1,
            }}
          >
            DYK
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#18181B", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.01em" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717A", mt: 0.5, mb: 1 }}>
            Добро пожаловать
          </Typography>
        </Box>

        <CardContent sx={{ px: 3, pt: 2.5 }}>
          <TextField
            placeholder="Введите логин"
            label="Логин"
            name="login"
            value={data.login}
            error={!!errors.login}
            helperText={errors.login}
            disabled={loading}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            onChange={(e) => onChange("login", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
          />

          <TextField
            placeholder="Введите пароль"
            label="Пароль"
            name="password"
            type="password"
            value={data.password}
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            onChange={(e) => onChange("password", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
          />

          <ErrorAlert error={error} />
        </CardContent>

        <Box sx={{ px: 3, pb: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <DykButton
            title={submitText}
            disabled={loading}
            fullWidth
            variant="contained"
            onClick={onSubmit}
          />
          <DykButton
            title={switchText}
            disabled={loading}
            fullWidth
            variant="outlined"
            onClick={onSwitch}
          />
        </Box>
      </Card>
    </PageWrapper>
  );
});
