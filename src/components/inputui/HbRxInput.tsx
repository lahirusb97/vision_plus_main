import React from "react";
import { Grid } from "@mui/material";
import CustomInputWithLabel from "./CustomInputWithLabel";
import CustomInput from "./CustomInput";

interface HbRxInputProps {
  register: any;
  errors: any;
}

export default function HbRxInput({ register, errors }: HbRxInputProps) {
  return (
    <Grid container spacing={2}>
      {/* Row 1: Inputs 1 and 2 */}
      <Grid item xs={12} md={6}>
        <CustomInputWithLabel
          {...register("hb_rx_right_dist")}
          label="HB Rx Right Dist"
          placeholder="Enter value1"
          type="text"
          error={errors?.hb_rx_right_dist?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomInput
          {...register("hb_rx_left_near")}
          placeholder="Enter value2"
          type="text"
          error={errors?.hb_rx_left_near?.message}
        />
      </Grid>

      {/* Row 2: Inputs 3 and 4 */}
      <Grid item xs={12} md={6}>
        <CustomInput
          {...register("hb_rx_left_dist")}
          placeholder="Enter value3"
          type="text"
          error={errors?.hb_rx_left_dist?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomInput
          {...register("hb_rx_right_near")}
          placeholder="Enter value4"
          type="text"
          error={errors?.hb_rx_right_near?.message}
        />
      </Grid>
    </Grid>
  );
}
