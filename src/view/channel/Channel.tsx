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
  IconButton,
  Input,
  Paper,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";

import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostApiCall } from "../../hooks/usePostApiCall";
import useGetDoctors from "../../hooks/useGetDoctors";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import axiosClient from "../../axiosClient";
interface PostData {
  id: number;
  title: string;
  body: string;
}
const Channel = () => {
  const { error, loading, postApi } = usePostApiCall<PostData>();
  const {
    data: doctorList,
    loading: loadingDoctors,
    error: doctorError,
  } = useGetDoctors();
  console.log(doctorList);

  const validationSchema = Yup.object().shape({
    doctor_id: Yup.number().required("Doctor ID is required"),
    name: Yup.string().required("Patient Name is required"),
    address: Yup.string().required("Patient Address is required"),
    contact_number: Yup.string().required("Patient Contact is required"),
    channel_date: Yup.date().required("Channel Date is required"),
    time: Yup.date().required("Time is required"),
    channeling_fee: Yup.number().required("Channeling Fee is required"),
    cash_amount: Yup.number().required("Cash Amount is required"),
    card_amount: Yup.number().required("Card Amount is required"),
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const channelingFee = Number(watch("channeling_fee"));
  const cashAmount = Number(watch("cash_amount"));
  const cardAmount = Number(watch("card_amount"));
  const onSubmit = async (data) => {
    const channelDate = new Date(data.channel_date);
    const time = new Date(data.time);
    const payload = {
      doctor_id: data.doctor_id,
      name: data.name,
      address: data.address,
      contact_number: data.contact_number,
      channel_date: channelDate.toISOString().split("T")[0],
      time: time.toLocaleTimeString("en-GB", { hour12: false }),
      channeling_fee: data.channeling_fee,
      payments: [
        {
          amount: data.cash_amount,
          payment_method: "Cash",
        },
        {
          amount: data.card_amount,
          payment_method: "Card",
        },
      ],
    };
    console.log(payload);

    try {
      const response = await postApi("/channel/", payload);

      console.log("Appointment saved:", response);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
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
        {/* Doctor Name */}

        <Controller
          name="doctor_id" // Field name in the form
          control={control} // Pass the control from useForm
          render={({ field }) => (
            <AutocompleteInputField
              {...field} // Spread the field props (value and onChange)
              options={doctorList} // Pass the options array
              loading={loading} // Pass the loading state
              labelName="Choose a Doctor" // Label for the input field
              defaultId={undefined} // Optionally pass a default selected ID
            />
          )}
        />

        {/* Patient Name */}
        <TextField
          variant="outlined"
          fullWidth
          label="Patient Name"
          {...register("name")}
          sx={{ mb: 1 }}
        />

        {/* Patient Address */}
        <TextField
          variant="outlined"
          fullWidth
          label="Patient Address"
          {...register("address")}
          sx={{ mb: 1 }}
        />

        {/* Patient Contact */}
        <TextField
          variant="outlined"
          fullWidth
          label="Patient Contact"
          {...register("contact_number")}
          sx={{ mb: 1 }}
        />

        {/* Date and Time Pickers (flex row) */}

        <Paper sx={flexBoxStyle}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="channel_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...register("channel_date")}
                  {...field}
                  label="Channel Date"
                  format="YYYY-MM-DD"
                />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...register("time")}
                  {...field}
                  label="Time"
                  format="HH:MM:ss"
                />
              )}
            />
          </LocalizationProvider>
        </Paper>

        <Paper sx={flexBoxStyle}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Channeling Fee
          </Typography>

          <Input type="number" {...register("channeling_fee")} />
        </Paper>

        {/* First Payment */}

        <Paper sx={flexBoxStyle}>
          <Typography variant="h6">First Payment</Typography>
          <Typography variant="h6">{cashAmount + cardAmount}</Typography>
        </Paper>
        {/* Balance */}

        <Paper sx={flexBoxStyle}>
          <Typography variant="h6">Balance</Typography>

          <Typography variant="h6">
            {channelingFee - (cashAmount + cardAmount)}
          </Typography>
        </Paper>

        {/* Payment Method */}

        <Paper sx={flexBoxStyle}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Cash</InputLabel>
            <Input
              {...register("cash_amount")}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <PaymentsIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Cash</InputLabel>
            <Input
              {...register("card_amount")}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Paper>

        {/* Submit Button */}
        <Button
          disabled={loading}
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : "OK"}
        </Button>
      </form>
    </Box>
  );
};

export default Channel;
const flexBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  my: 2,
  py: 1,
  px: 2,
};
