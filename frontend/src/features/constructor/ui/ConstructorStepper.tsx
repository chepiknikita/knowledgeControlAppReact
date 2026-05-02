import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";

interface Props {
  steps: string[];
  activeStep: number;
  title: string;
}

function StepIcon({ active, completed }: { active?: boolean; completed?: boolean }) {
  if (completed) return <CheckCircleIcon sx={{ color: "#6D28D9", fontSize: 26 }} />;
  if (active) return <AdjustIcon sx={{ color: "#7C3AED", fontSize: 26 }} />;
  return <RadioButtonUncheckedIcon sx={{ color: "#D4D4D8", fontSize: 26 }} />;
}

export default function ConstructorStepper({ steps, activeStep, title }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 2.5, color: "#18181B", fontWeight: 700 }}
      >
        {title} теста
      </Typography>

      <Stepper activeStep={activeStep} aria-label="task-stepper">
        {steps.map((label, index) => {
          const completed = index < activeStep;
          const current = index === activeStep;

          return (
            <Step key={label} completed={completed}>
              <StepLabel
                slots={{ stepIcon: StepIcon }}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "0.8rem",
                    fontWeight: completed || current ? 600 : 400,
                    color: completed ? "#6D28D9" : current ? "#18181B" : "#A1A1AA",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
