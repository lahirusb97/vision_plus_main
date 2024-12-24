import React, { forwardRef } from "react";
import { styled, Input, Paper } from "@mui/material";

// Styled Wrapper for Layout
const StyledContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center", // Aligns label and input horizontally
  gap: theme.spacing(2), // Gap between label and input
  marginBottom: theme.spacing(3), // Space between inputs when stacked
}));

// Styled Label

// Styled Input
const StyledInput = styled(Input)(({ ...props }) => ({
  minHeight: "40px", // Add padding for better appearance
  margin: 0, // Add margin for better appearance
  ...props,
  width: "520px",
}));

// Custom Input Component
interface CustomInputProps {
  placeholder: string;
  fullWidth?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ ...props }, ref) => (
    <StyledContainer>
      <StyledInput {...props} ref={ref} />
    </StyledContainer>
  )
);
export default CustomInput;
