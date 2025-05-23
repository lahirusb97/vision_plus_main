import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
export default function ProgressStatusSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <Controller
        name="progress_status"
        control={control}
        render={({ field }) => (
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel id="demo-simple-select-label">
              Order Progress Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={field.value || ""} // Ensure value is never undefined
              onChange={(e) => field.onChange(e.target.value)} // Pass the value directly
              label="Order Progress Status"
              error={!!errors.progress_status?.message}
            >
              <MenuItem value="received_from_customer">
                Received From Customer
              </MenuItem>
              <MenuItem value="issue_to_factory">Issue to Factory</MenuItem>
              <MenuItem value="received_from_factory">
                Received from Factory
              </MenuItem>
              <MenuItem value="issue_to_customer">Issue to Customer</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}
