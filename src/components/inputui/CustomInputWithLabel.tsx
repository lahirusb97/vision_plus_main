import React from "react";
import { styled, Input, Paper, Typography } from "@mui/material";

// Styled Wrapper for Layout
const StyledContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center", // Aligns label and input horizontally
  gap: theme.spacing(2), // Gap between label and input
  marginBottom: theme.spacing(3), // Space between inputs when stacked
}));

// Styled Label
const StyledLabel = styled("label")(({ theme, ...props }) => ({
  color: "#ffff",
  backgroundColor: theme.palette.primary.contrastText, // Set background color from theme
  padding: theme.spacing(1, 1), // Add padding for better appearance
  borderRadius: theme.shape.borderRadius, // Rounded corners
  fontFamily: "Roboto, sans-serif", // Ensure Roboto font is applied
  ...props,
  fontSize: "14px", // Set font size to 1rem
  minWidth: "120px", // Set minimum width to 120px
  minHeight: "20px", // Set minimum height to 40px
  display: "flex", // Use flexbox for centering
  alignItems: "center", // Center items vertically
  justifyContent: "right", // Center items horizontally
}));

// Styled Input
const StyledInput = styled(Input)(({ ...props }) => ({
  width: "350px", // Set width to 100%
  minHeight: "40px", // Add padding for better appearance
  margin: 0, // Add margin for better appearance
  padding:'0 10px',
  ...props,
}));

// Custom Input Component
interface CustomInputProps {
  label: string;
  placeholder: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  error:string
}

import { forwardRef } from "react";

const CustomInputWithLabel = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ error,label, ...props }, ref) => (
   <div>
     <Paper sx={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput error={error?true:false} {...props} ref={ref} />
      <Typography m={.5} color="error" variant="caption">{error && <span>{error}</span>}</Typography>
    </Paper>
   </div>
  )
);

export default CustomInputWithLabel;
