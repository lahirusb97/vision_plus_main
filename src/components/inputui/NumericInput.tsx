import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
// import returnPlusSymbol from "../../utils/returnPlusSymbol";

interface NumericInputProps extends Omit<TextFieldProps, "onChange"> {
  value?: string | null;
  onChange?: (value: string) => void;
  inputLabel: string;
  errorCheck?: (value: string) => boolean;
  slotProps?: TextFieldProps["slotProps"];
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  inputLabel,
  errorCheck,
  slotProps = {},
  // pull out any style‐related props you want to treat specially...
  sx,
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
  const safeValue = value ?? "";
  return (
    <TextField
    variant="outlined"
    label={inputLabel}
      {...rest}
      slotProps={{
        htmlInput: {
          step: 0.25,
          max: 0,
          inputMode: "numeric",
          ...(slotProps.htmlInput ?? {}),
        },
        inputLabel: {
          // shrink: true,
          ...(slotProps.inputLabel ?? {}),
        },
        ...slotProps, // spread any other slotProps you passed in
      }}
      type="text"
      value={safeValue} // return plus values also null covert to ""
      onChange={handleChange}
      error={getError()}
      size="small"
      sx={{
        "& .MuiInputBase-root": {
          height: 32,
        },
        ...sx,
      }}
      placeholder={inputLabel}
    />
  );
};

export default NumericInput;
