import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface NumericInputProps extends Omit<TextFieldProps, "onChange"> {
  value?: string | null;
  onChange?: (value: string) => void;
  inputLabel: string;
  errorCheck?: (value: string) => boolean;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  inputLabel,
  errorCheck,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value?.replace(/[^0-9+-.]/g, "") || "";
    if (onChange) onChange(rawValue); // Handle the value change
  };

  const getError = () => {
    if (!value) return false;
    if (errorCheck) return errorCheck(value);
  };

  return (
    <TextField
      inputProps={{
        step: 0.25,
        max: 0,
        inputMode: "numeric",
        ...rest.inputProps,
      }}
      type="text"
      value={value || ""} // Ensure the value is a string, even if it's null
      onChange={handleChange}
      error={getError()}
      size="small"
      label={inputLabel}
      sx={{
        "& .MuiInputBase-root": {
          height: 32,
        },
        ...rest.sx,
      }}
      InputLabelProps={{
        shrink: true,
        ...rest.InputLabelProps,
      }}
      placeholder={inputLabel}
    />
  );
};

export default NumericInput;
