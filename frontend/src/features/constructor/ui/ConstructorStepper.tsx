import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useMemo } from "react";
import DykTypography from "../../../components/UI/typography/DykTypography";

interface Props {
  steps: string[];
  activeStep: number;
  title: string;
}

export default function ConstructorStepper({
  steps,
  activeStep,
  title,
}: Props) {
  const memoSteps = useMemo(() => steps, [steps]);

  return (
    <Box>
      <DykTypography
        text={`${title} теста`}
        variant="body1"
        align="center"
      />
      <Stepper
        activeStep={activeStep}
        sx={{ my: 2 }}
        aria-label="task-stepper"
      >
        {memoSteps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
