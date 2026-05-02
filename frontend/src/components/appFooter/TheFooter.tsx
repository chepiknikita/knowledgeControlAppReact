import { Box, Typography } from "@mui/material";
import React from "react";

export default function TheFooter() {
  return (
    <footer>
      <Box
        sx={{
          borderTop: "1px solid #E4E4E7",
          backgroundColor: "#FFFFFF",
          py: 2,
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "xl",
            mx: "auto",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: ".2rem",
              background: "linear-gradient(135deg, #7C3AED 0%, #E11D48 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DYK
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#A1A1AA", letterSpacing: "0.02em" }}
          >
            &copy; 2025 NikitaChepik. Все права защищены.
          </Typography>
        </Box>
      </Box>
    </footer>
  );
}
