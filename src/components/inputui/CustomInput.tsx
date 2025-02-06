import { forwardRef } from "react";
import { styled, Input, Paper, Typography } from "@mui/material";

// Styled Wrapper for Layout
const StyledContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

// Styled Input
const StyledInput = styled(Input)(() => ({
  minHeight: "40px",
  width: "100%",
  padding:'0 10px'
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
      <StyledInput error={!!error} {...props} ref={ref} />
      <Typography px={0.5} color="error" variant="caption">{error && <span>{error}</span>}</Typography>
    </StyledContainer>
  )
);

export default CustomInput;
