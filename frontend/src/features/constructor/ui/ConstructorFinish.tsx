import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import ConstructorActions from "./ConstructorActions";
import { ErrorAlert } from "../../../components/UI/alerts/ErrorAlert";

interface Props {
  loading: boolean;
  error: string | null;
  onSave: () => void;
  onBack: () => void;
}

export default function ConstructorFinish({ loading, error, onSave, onBack }: Props) {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          px: 2,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 40, color: "#6D28D9" }} />
        </Box>

        {/* Text */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#18181B", mb: 0.5 }}>
            Тест готов к сохранению!
          </Typography>
          <Typography variant="body2" sx={{ color: "#71717A", maxWidth: 320 }}>
            Всё заполнено. Нажмите «Сохранить», чтобы опубликовать тест.
          </Typography>
        </Box>
      </Box>

      <ErrorAlert error={error} />

      <ConstructorActions
        textApplyBtn={loading ? "Сохранение..." : "Сохранить"}
        disabledPrev={loading}
        disabledNext={loading}
        onBack={onBack}
        onNext={onSave}
      />
    </Box>
  );
}
