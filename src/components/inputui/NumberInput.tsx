import React from "react";
import { Input, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
interface NumberInputProps {
  registerName: string;
  lableName: string;
}
const NumberInput: React.FC<NumberInputProps> = ({
  registerName,
  lableName,
}) => {
  const {
    register,
    setValue,
    watch,
    // formState: { errors },
  } = useFormContext();
  const watchValue = watch(registerName);
  return (
    <TextField
      label={lableName}
      {...register(registerName, { valueAsNumber: true })}
      sx={{ width: 120 }} // Optional for full width
      type="number"
      size="small"
      slotProps={{
        //add shirink lable
        inputLabel: {
          shrink: true,
        },
        input: {
          sx: {
            "&::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&[type=number]": { MozAppearance: "textfield" },
          },
        },
      }} // Correct way
      onFocus={(e) => {
        if (e.target.value === "0") {
          setValue(registerName, "");
        }
      }}
      onBlur={(e) => {
        if (e.target.value === "") {
          setValue(registerName, 0);
        }
      }}
    />
  );
};

export default NumberInput;
