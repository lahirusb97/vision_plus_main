import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

import { useForm, Controller } from "react-hook-form";

const Channel = () => {
  const { control, handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: 2,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#fff",
        border: "1px solid #E0E0E0",
      }}
    >
      {/* Section Title */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Appointment Details
      </Typography>

      {/* Doctor and Patient Information Group */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Doctor Name</InputLabel>
              <Select label="Doctor Name" {...register("doctorName")}>
                <MenuItem value="Doctor 1">Doctor 1</MenuItem>
                <MenuItem value="Doctor 2">Doctor 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Patient Name"
              {...register("patientName")}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Patient Contact"
              {...register("patientContact")}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Patient Email"
              {...register("patientEmail")}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        {/* Date and Time Picker Group */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="appointmentDate"
                control={control}
                render={({ field }) => (
                  <StaticDatePicker
                    {...field}
                    orientation="landscape"
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <Controller
                  name="appointmentTime"
                  control={control}
                  render={({ field }) => (
                    <StaticTimePicker {...field} sx={{ width: "100%" }} />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            textTransform: "none",
            height: 48,
            backgroundColor: "blue",
            color: "white",
          }}
        >
          OK
        </Button>
      </form>
    </Box>
  );
};

export default Channel;
