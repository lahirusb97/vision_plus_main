import React from "react";
import { Grid } from "@mui/material";
import CustomInputWithLabel from "./CustomInputWithLabel";
import CustomInput from "./CustomInput";

interface InputLeftRightProps {
  register: any;
  errors: Record<string, any>;
  inputName: string;
  labelName: string;
}

export default function InputLeftRight({
  register,
  errors,
  inputName,
  labelName,
}: InputLeftRightProps) {
  return (
    <Grid container spacing={3}>
      {/* Row 1: Inputs 1 and 2 */}
      <Grid item xs={12} md={6}>
        <CustomInputWithLabel
          {...register(inputName)}
          label={labelName}
          placeholder="Enter value1"
          type="number"
          error={errors?.[inputName]?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomInput
          {...register(inputName)}
          placeholder="Enter value2"
          type="number"
          error={errors?.[inputName]?.message}
        />
      </Grid>
    </Grid>
  );
}
