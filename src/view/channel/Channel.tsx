import {
  Box,
  TextField,
  Button,
  Typography,
  Input,
  Paper,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm, Controller, FormProvider } from "react-hook-form";

import useGetDoctors from "../../hooks/useGetDoctors";
import AutocompleteInputField from "../../components/inputui/DropdownInput";
import dayjs from "dayjs";
import axiosClient from "../../axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChannelAppointmentForm,
  ChannelAppointmentSchema,
} from "../../validations/schemaChannelAppointment";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../utils/authDataConver";
import ChannelPatientDetail from "./apointments/ChannelPatientDetail";
import { formatUserPayments } from "../../utils/formatUserPayments";
import AppointmentDatePicker from "../../components/AppointmentDatePicker";
import useGetAppointmentSlots from "../../hooks/useGetAppointmentSlots";
import { TimePicker } from "@mui/x-date-pickers";
import BookedTimeSlotsDropdown from "../../components/common/BookedTimeSlotsDropdown";
import PaymentMethodsLayout from "../transaction/factory_layouts/PaymentMethodsLayout";
const Channel = () => {
  const { data: doctorList, loading } = useGetDoctors();
  const {
    appointmentSlots,
    appointmentSlotsLoading,
    appointmentSlotsError,
    getAppointmentSlots,
  } = useGetAppointmentSlots();

  const navigate = useNavigate();
  const methods = useForm<ChannelAppointmentForm>({
    resolver: zodResolver(ChannelAppointmentSchema),
    defaultValues: {
      credit_card: 0,
      cash: 0,
      online_transfer: 0,
      branch_id: getUserCurentBranch()?.id,
    },
  });
  const { control, watch } = methods;

  const onSubmit = async (data: ChannelAppointmentForm) => {
    const channelDate = dayjs(data.channel_date).format("YYYY-MM-DD");

    const userPayments = {
      credit_card: data.credit_card,
      cash: data.cash,
      online_transfer: data.online_transfer,
    };
    const payload = {
      doctor_id: data.doctor_id,
      branch_id: data.branch_id,
      name: data.name,
      address: data.address,
      contact_number: data.phone_number,
      channel_date: channelDate,
      time: data.channel_time.format("HH:mm:ss"),
      note: data.note,
      channeling_fee: data.channeling_fee,
      payments: formatUserPayments(userPayments),
    };

    try {
      const response = await axiosClient.post("/channel/", payload);
      toast.success("Channel created successfully");
      navigate(`/channel/channel_invoice/${response.data.appointment.id}`); //!! apointment ID
    } catch (error) {
      extractErrorMessage(error);
      console.log(error);
    }
  };
  const channelingFee = Number(methods.watch("channeling_fee") || 0);
  const cashAmount = Number(methods.watch("cash") || 0);
  const cardAmount = Number(methods.watch("credit_card") || 0);
  const onlineAmount = Number(methods.watch("online_transfer") || 0);

  const reloadAppointmentSlots = () => {
    if (watch("doctor_id") && watch("channel_date")) {
      getAppointmentSlots(
        dayjs(watch("channel_date")).format("YYYY-MM-DD"),
        watch("doctor_id")
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          width: "100%",
          margin: 1,
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "#fff",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* Section Title */}
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
          Appointment Details
        </Typography>

        {/* Doctor and Patient Information Group */}
        <form
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {/* Doctor Name */}

          <ChannelPatientDetail />

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
                onChange={(newValue) => {
                  field.onChange(newValue); // Pass selected date to react-hook-form
                  if (newValue && watch("channel_date")) {
                    getAppointmentSlots(
                      dayjs(watch("channel_date")).format("YYYY-MM-DD"),
                      newValue
                    );
                  }
                }}
              />
            )}
          />
          {/* Date and Time Pickers (flex row) */}

          <Paper sx={flexBoxStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="channel_date"
                control={control}
                render={({ field }) => (
                  <AppointmentDatePicker
                    selectedDate={
                      field.value
                        ? dayjs(field.value).format("YYYY-MM-DD")
                        : null
                    }
                    sheduleStatus="DOCTOR"
                    onDateChange={(newValue) => {
                      field.onChange(newValue); // Pass selected date to react-hook-form
                      if (newValue && watch("doctor_id")) {
                        getAppointmentSlots(
                          dayjs(newValue).format("YYYY-MM-DD"),
                          watch("doctor_id")
                        );
                      }
                    }}
                    label="Date"
                    doctorId={watch("doctor_id") || undefined} // Set doctorId or pass it as a prop
                  />
                )}
              />
            </LocalizationProvider>
            {appointmentSlots && (
              <BookedTimeSlotsDropdown
                doctorId={watch("doctor_id") || null}
                appointmentSlots={appointmentSlots?.appointments || []}
                appointmentSlotsLoading={appointmentSlotsLoading}
              />
            )}
            <Box>
              {watch("doctor_id") && watch("channel_date") && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Avilable Number{" - "}
                  {/* {appointmentSlotsLoading&& <CircularProgress size={20} />} */}
                  {appointmentSlotsLoading && <CircularProgress size={20} />}
                  {!appointmentSlotsLoading && appointmentSlotsError && (
                    <Button
                      size="small"
                      onClick={reloadAppointmentSlots}
                      variant="contained"
                      color="error"
                    >
                      Try Again
                    </Button>
                  )}
                  {!appointmentSlotsError && !appointmentSlotsLoading && (
                    <>
                      <Typography>
                        {appointmentSlots?.total_appointments
                          ? appointmentSlots?.total_appointments + 1
                          : "1"}
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="channel_time"
                          control={control}
                          render={({ field, fieldState }) => (
                            <TimePicker
                              label="Channel Time"
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(time) => {
                                field.onChange(time);
                              }}
                              slotProps={{
                                textField: {
                                  error: !!fieldState.error,
                                  helperText: fieldState.error?.message,
                                  size: "small",
                                  sx: { width: 200 },
                                },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Paper>

          <Paper sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                gap: 2,
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
                px: 1,
              }}
            >
              Channeling Fee
            </Typography>

            <Input
              type="number"
              sx={{ gap: 1 }}
              {...methods.register("channeling_fee", { valueAsNumber: true })}
            />
          </Paper>

          {/* First Payment */}

          <Paper sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
                px: 1,
              }}
            >
              Payment
            </Typography>
            <Typography variant="body2">
              {cashAmount + cardAmount + onlineAmount}
            </Typography>
          </Paper>
          {/* Balance */}

          <Paper sx={flexBoxStyle}>
            <Typography
              variant="body2"
              sx={{
                gap: 1,
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
                px: 1,
              }}
            >
              Balance
            </Typography>

            <Typography variant="body2">
              {channelingFee - (cashAmount + cardAmount + onlineAmount)}
            </Typography>
          </Paper>

          {/* Payment Method */}

          <Paper sx={flexBoxStyle}>
            <PaymentMethodsLayout />
          </Paper>
          <TextField
            sx={{ display: "none" }}
            inputProps={{
              min: 0,
            }}
            {...methods.register("branch_id", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            label="Branch Id"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            defaultValue={getUserCurentBranch()?.id}
          />
          {/* Submit Button */}
          <Button
            disabled={loading}
            variant="contained"
            fullWidth
            type="submit"
            size="small"
          >
            {loading ? <CircularProgress size={24} /> : "OK"}
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};

export default Channel;
const flexBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  p: 1,
};
