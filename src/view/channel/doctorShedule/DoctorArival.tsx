import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Paper, Typography } from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  DoctorArrivalForm,
  doctorArrivalSchema,
} from "../../../validations/schemaDoctorArrival";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetDoctors from "../../../hooks/useGetDoctors";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SaveButton from "../../../components/SaveButton";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import toast from "react-hot-toast";
import HighlightedDatePicker from "../../../components/HighlightedDatePicker";

const flexBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: 2,
  minWidth: "300px",
};

export default function DoctorArival() {
  const { data: doctorList, loading } = useGetDoctors();
  const { postHandler, postHandlerloading } = useAxiosPost();
  const { control, handleSubmit, register, reset, watch } =
    useForm<DoctorArrivalForm>({
      resolver: zodResolver(doctorArrivalSchema),
      defaultValues: {
        doctor_id: undefined,
        branch_id: getUserCurentBranch()?.id,
        date: undefined,
        start_time: undefined,
      },
    });

  const onSubmit = async (data: DoctorArrivalForm) => {
    const arivalDate = dayjs(data.date).format("YYYY-MM-DD");
    const arivalTime = dayjs(data.start_time, "HH:mm:ss", true).format(
      "HH:mm:ss"
    );
    const payload = {
      doctor_id: data.doctor_id,
      branch_id: data.branch_id,
      date: arivalDate,
      start_time: arivalTime,
    };

    try {
      await postHandler("doctor-schedule/create/", payload);
      toast.success("Doctor Arrival Created Successfully");
      reset();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={flexBoxStyle}
    >
      <Typography variant="h6">Doctor Arrival Schedule</Typography>

      <Controller
        name="doctor_id" // Field name in the form
        control={control} // Pass the control from useForm
        render={({ field }) => (
          <AutocompleteInputField
            {...field} // Spread the field props (value and onChange)
            options={doctorList} // Pass the options array
            loading={loading} // Pass the loading state
            labelName="Choose a Doctor" // Label for the input field
            defaultId={watch("doctor_id") || undefined} // Optionally pass a default selected ID
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <HighlightedDatePicker
              selectedDate={
                field.value ? dayjs(field.value).format("YYYY-MM-DD") : null
              }
              onDateChange={(newValue) => {
                field.onChange(newValue); // Pass selected date to react-hook-form
              }}
              label="Date"
              doctorId={watch("doctor_id") || undefined} // Set doctorId or pass it as a prop
            />
          )}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="start_time"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TimePicker
              {...register("start_time")}
              {...field}
              label="Start Time"
              format="HH:mm:ss"
              value={field.value ? dayjs(field.value, "HH:mm:ss") : null}
              onChange={(newValue) => {
                const formatted = newValue
                  ? dayjs(newValue).format("HH:mm:ss")
                  : "";
                field.onChange(formatted);
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
      <TextField
        sx={{ display: "none" }}
        inputProps={{
          min: 0,
        }}
        {...register("branch_id", {
          setValueAs: (value) => (value === "" ? undefined : Number(value)),
        })}
        label="Branch Id"
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
        defaultValue={getUserCurentBranch()?.id}
      />
      <SaveButton btnText="Save" loading={postHandlerloading} />
    </Paper>
  );
}
