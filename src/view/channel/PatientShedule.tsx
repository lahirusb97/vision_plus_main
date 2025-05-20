import {
  Box,
  Button,
  Typography,
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
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../utils/authDataConver";

import {
  PatientResheduleModel,
  schemaPatientReshedule,
} from "../../validations/schemaPatientReshedule";
import useGetAppointmentSlots from "../../hooks/useGetAppointmentSlots";
import AppointmentDatePicker from "../../components/AppointmentDatePicker";
import BookedTimeSlotsDropdown from "../../components/common/BookedTimeSlotsDropdown";

const PatientShedule = () => {
  const {
    appointmentSlots,
    appointmentSlotsLoading,
    appointmentSlotsError,
    getAppointmentSlots,
  } = useGetAppointmentSlots();
  const { appointment_id } = useParams();
  const { data: doctorList, loading } = useGetDoctors();
  const navigate = useNavigate();
  const methods = useForm<PatientResheduleModel>({
    resolver: zodResolver(schemaPatientReshedule),
    defaultValues: {
      branch_id: getUserCurentBranch()?.id,
    },
  });
  const { control, watch, reset, formState } = methods;
  console.log(formState.errors);

  const onSubmit = async (data: PatientResheduleModel) => {
    const channelDate = dayjs(data.new_date).format("YYYY-MM-DD");
    const channelTime = dayjs(appointmentSlots?.doctor_arrival, "h:mm A")
      .add(((appointmentSlots?.total_appointments || 0) + 1) * 5, "minute")
      .format("HH:mm:ss");

    const payload = {
      appointment_id: appointment_id,
      new_doctor_id: data.new_doctor_id,
      branch_id: data.branch_id,
      new_date: channelDate,
      new_time: channelTime,
    };

    try {
      const response = await axiosClient.post("/channel/transfer/", payload);
      toast.success("Channel created successfully");
      navigate(`/channel/channel_invoice/${response.data.appointment.id}`); //!! apointment ID
      reset();
    } catch (error) {
      extractErrorMessage(error);
      console.log(error);
    }
  };
  const reloadAppointmentSlots = () => {
    if (watch("new_doctor_id") && watch("new_date")) {
      getAppointmentSlots(
        dayjs(watch("new_date")).format("YYYY-MM-DD"),
        watch("new_doctor_id")
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
          minWidth: "500px",
        }}
      >
        {/* Section Title */}
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
          Appointment Reshedule
        </Typography>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Controller
            name="new_doctor_id" // Field name in the form
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
                  if (newValue && watch("new_date")) {
                    getAppointmentSlots(
                      dayjs(watch("new_date")).format("YYYY-MM-DD"),
                      newValue
                    );
                  }
                }}
              />
            )}
          />

          <Paper sx={flexBoxStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="new_date"
                control={control}
                render={({ field }) => (
                  <AppointmentDatePicker
                    sheduleStatus={"Available"}
                    selectedDate={
                      field.value
                        ? dayjs(field.value).format("YYYY-MM-DD")
                        : null
                    }
                    onDateChange={(newValue) => {
                      field.onChange(newValue); // Pass selected date to react-hook-form
                      if (newValue && watch("new_doctor_id")) {
                        getAppointmentSlots(
                          dayjs(newValue).format("YYYY-MM-DD"),
                          watch("new_doctor_id")
                        );
                      }
                    }}
                    label="Date"
                    doctorId={watch("new_doctor_id") || undefined}
                  />
                )}
              />
            </LocalizationProvider>
            <BookedTimeSlotsDropdown
              doctorId={watch("new_doctor_id") || null}
              appointmentSlots={appointmentSlots?.appointments || []}
              appointmentSlotsLoading={appointmentSlotsLoading}
            />
            <Box>
              {watch("new_doctor_id") && watch("new_date") && (
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
                      <Typography>Time</Typography>
                      <Typography>
                        {appointmentSlots?.doctor_arrival
                          ? dayjs(appointmentSlots.doctor_arrival, "h:mm A")
                              .add(
                                ((appointmentSlots.total_appointments || 0) +
                                  1) *
                                  5,
                                "minute"
                              )
                              .format("hh:mm A")
                          : "N/A"}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
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

export default PatientShedule;
const flexBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  p: 1,
};
