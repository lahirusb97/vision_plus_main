import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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

import HighlightedDatePicker from "../../components/HighlightedDatePicker";
import {
  PatientResheduleModel,
  schemaPatientReshedule,
} from "../../validations/schemaPatientReshedule";

const PatientShedule = () => {
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
    const channelTime = dayjs(data.new_time, "HH:mm:ss", true).format(
      "HH:mm:ss"
    );

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
              />
            )}
          />
          {/* Date and Time Pickers (flex row) */}

          <Paper sx={flexBoxStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="new_date"
                control={control}
                render={({ field }) => (
                  <HighlightedDatePicker
                    selectedDate={
                      field.value
                        ? dayjs(field.value).format("YYYY-MM-DD")
                        : null
                    }
                    onDateChange={(newValue) => {
                      field.onChange(newValue); // Pass selected date to react-hook-form
                    }}
                    label="Date"
                    doctorId={
                      watch("new_doctor_id")
                        ? Number(watch("new_doctor_id"))
                        : undefined
                    } // Convert to number or pass undefined
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="new_time"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TimePicker
                    {...methods.register("new_time")}
                    {...field}
                    label="Time"
                    format="HH:mm:ss"
                    value={field.value ? dayjs(field.value, "HH:mm:ss") : null}
                    onChange={(newValue) => {
                      const formattedTime = newValue
                        ? dayjs(newValue).format("HH:mm:ss")
                        : "";
                      field.onChange(formattedTime);
                    }}
                    slotProps={{
                      textField: {
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
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
