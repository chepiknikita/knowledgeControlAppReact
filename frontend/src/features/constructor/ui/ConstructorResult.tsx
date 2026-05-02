import { Box, Button, Typography } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import React from "react";

interface Props {
  title: string;
  onHome: () => void;
}

export default function ConstructorResult({ title, onHome }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2.5,
        px: 2,
        py: 4,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "22px",
          background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(109, 40, 217, 0.3)",
        }}
      >
        <RocketLaunchIcon sx={{ fontSize: 38, color: "#FFFFFF" }} />
      </Box>

      {/* Text */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#18181B", mb: 0.75 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#71717A" }}>
          Тест доступен на главной странице
        </Typography>
      </Box>

      {/* CTA */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onHome}
        sx={{ px: 4, mt: 0.5 }}
      >
        На главную
      </Button>
    </Box>
  );
}
