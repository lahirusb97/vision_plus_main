import React from "react";
import { Grid } from "@mui/material";
import CustomInputWithLabel from "./CustomInputWithLabel";
import CustomInput from "./CustomInput";

interface InputLeftRightProps {
  register: any;
  errors: Record<string, any>;
  inputOneName: string;
  inputTwoName: string;
  labelName: string;
}

export default function InputLeftRight({
  register,
  errors,
  inputOneName,
  inputTwoName,
  labelName,
}: InputLeftRightProps) {
  return (
    <Grid container spacing={3}>
      {/* Row 1: Inputs 1 and 2 */}
      <Grid item xs={12} md={6}>
        <CustomInputWithLabel
          {...register(inputOneName)}
          label={labelName}
          placeholder={`${labelName} Right`}
          type="number"
          step="any"
          error={errors?.[inputOneName]?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomInput
          {...register(inputTwoName)}
          placeholder={`${labelName} Left`}
          type="number"
          step="any"
          error={errors?.[inputTwoName]?.message}
        />
      </Grid>
    </Grid>
  );
}
