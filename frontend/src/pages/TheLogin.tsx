import React, { useEffect } from "react";
import { useAuth } from "../features/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthController from "../features/auth/AuthController";

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  return <AuthController />;
}
