import React, { useState } from "react";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { Box, Card, CardContent, TextField } from "@mui/material";
import DykTypography from "../../components/UI/typography/DykTypography";
import DykButton from "../../components/UI/buttons/DykButton";
import { useNavigate } from "react-router-dom";
import { ApiFactory } from "../../api";

export default function AuthForm({
  isShowSignUp = false,
}: {
  isShowSignUp?: boolean;
}) {
  const authService =  ApiFactory.createAuthService();
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    login: "",
  });

  const title = isShowSignUp ? "Форма входа" : "Зарегистрируйтесь";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('32', name, value)
    setFormData((prevState: { password: string; login: string }) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (isShowSignUp) {
      const data = await authService.login(formData);
      console.log('LOGIN', data);
    } else {
      const data = await authService.signUp(formData)
      console.log('SING-UP', data);
    }
  };

  const signUp = () => {
    navigation("/sign-up");
  };

  return (
    <PageWrapper>
      <Card sx={{ width: 400, px: 1 }}>
        <CardContent>
          <DykTypography
            text={title}
            variant="h6"
            align="center"
            sx={{ my: 1 }}
          />
          <TextField
            placeholder="Login"
            name="login"
            fullWidth
            size="small"
            sx={{ my: 1 }}
            value={formData.login}
            onChange={handleChange}
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
          />
        </CardContent>
        <Box sx={{ px: 2, pb: 2 }}>
          <DykButton
            title="Войти"
            fullWidth
            sx={{ my: 1 }}
            onClick={handleSubmit}
          />
          {isShowSignUp && (
            <DykButton
              title="Зарегистироваться"
              fullWidth
              sx={{ my: 1 }}
              onClick={signUp}
            />
          )}
        </Box>
      </Card>
    </PageWrapper>
  );
}
