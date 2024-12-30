import React, { forwardRef } from "react";
import { styled, Input, Paper } from "@mui/material";

// Styled Wrapper for Layout
const StyledContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

// Styled Input
const StyledInput = styled(Input)(() => ({
  minHeight: "40px",
  width: "100%",
}));

// Props Interface
interface CustomInputProps {
  placeholder: string;
  fullWidth?: boolean;
  type: string;
  error?: string;
}

// Custom Input Component
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ error, ...props }, ref) => (
    <StyledContainer>
      <StyledInput {...props} ref={ref} />
      {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
    </StyledContainer>
  )
);

export default CustomInput;
