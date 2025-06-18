import { Box } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import NumericInput from "../../../components/inputui/NumericInput";

export default function PdAndHeightInputs() {
  const { control } = useFormContext();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Controller
          name="pd"
          control={control}
          render={({ field }) => (
            <NumericInput {...field} inputLabel="PD" sx={{ width: 100 }} />
          )}
        />
        <Controller
          name="height"
          control={control}
          render={({ field }) => (
            <NumericInput {...field} inputLabel="Height" sx={{ width: 100 }} />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Controller
            name="right_pd"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                inputLabel="Right-PD"
                sx={{ width: 100 }}
              />
            )}
          />
          <Controller
            name="left_pd"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                inputLabel="Left-PD"
                sx={{ width: 100 }}
              />
            )}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Controller
            name="right_height"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                inputLabel="Right-H"
                sx={{ width: 100 }}
              />
            )}
          />
          <Controller
            name="left_height"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                inputLabel="Left-H"
                sx={{ width: 100 }}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
}
