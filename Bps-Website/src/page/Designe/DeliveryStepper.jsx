import { Stepper, Step, StepLabel, Paper } from "@mui/material";
import { memo } from "react";

// Define steps as a constant outside the component
const DELIVERY_STEPS = [
  "Order Received",
  "Processing",
  "In Transit",
  "Out for Delivery",
  "Delivered",
] as const;

interface DeliveryStepperProps {
  activeStep?: number;
}

const DeliveryStepper = memo(({ activeStep = 2 }: DeliveryStepperProps) => {
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {DELIVERY_STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
});

export default DeliveryStepper;