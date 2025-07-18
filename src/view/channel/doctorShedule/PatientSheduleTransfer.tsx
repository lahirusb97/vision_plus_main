import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  doctorAbsentSchema,
  DoctorAbsentForm,
} from "../../../validations/schemaDoctorAbsent";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetDoctors from "../../../hooks/useGetDoctors";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import SaveButton from "../../../components/SaveButton";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import HighlightedDatePicker from "../../../components/HighlightedDatePicker";
import { CustomToast } from "../../../utils/customToast";

const flexBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: 2,
  minWidth: "300px",
};

export default function PatientSheduleTransfer() {
  const { data: doctorList, loading } = useGetDoctors();
  const { postHandler, postHandlerloading } = useAxiosPost();

  const { control, handleSubmit, register, reset, watch } =
    useForm<DoctorAbsentForm>({
      resolver: zodResolver(doctorAbsentSchema),
      defaultValues: {
        doctor_id: undefined,
        branch_id: getUserCurentBranch()?.id,
        from_date: undefined,
        to_date: undefined,
      },
    });

  const onSubmit = async (data: DoctorAbsentForm) => {
    const payload = {
      doctor_id: data.doctor_id,
      branch_id: data.branch_id,
      from_date: dayjs(data.from_date).format("YYYY-MM-DD"),
      to_date: dayjs(data.to_date).format("YYYY-MM-DD"),
    };

    try {
      await postHandler("doctor/transfer-appointments/", payload);
      CustomToast.success("Transfer completed");
      reset();
    } catch (error) {
      CustomToast.error("Transfer failed Use Manual Transfer");
      extractErrorMessage(error);
    }
  };

  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={flexBoxStyle}
    >
      <Typography variant="h6">
        Change Patient Appointments Shedules{" "}
      </Typography>

      <Controller
        name="doctor_id"
        control={control}
        render={({ field }) => (
          <AutocompleteInputField
            {...field}
            options={doctorList}
            loading={loading}
            labelName="Choose a Doctor"
            defaultId={watch("doctor_id") || undefined}
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="from_date"
          control={control}
          render={({ field }) => (
            <HighlightedDatePicker
              sheduleStatus={"Unavailable"}
              selectedDate={
                field.value ? dayjs(field.value).format("YYYY-MM-DD") : null
              }
              onDateChange={(newValue) => {
                field.onChange(newValue); // Pass selected date to react-hook-form
              }}
              label="From Date"
              doctorId={watch("doctor_id") || undefined} // Set doctorId or pass it as a prop
            />
          )}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="to_date"
          control={control}
          render={({ field }) => (
            <HighlightedDatePicker
              sheduleStatus={"DOCTOR"}
              selectedDate={
                field.value ? dayjs(field.value).format("YYYY-MM-DD") : null
              }
              onDateChange={(newValue) => {
                field.onChange(newValue); // Pass selected date to react-hook-form
              }}
              label=" To Date"
              doctorId={watch("doctor_id") || undefined} // Set doctorId or pass it as a prop
            />
          )}
        />
      </LocalizationProvider>

      <TextField
        sx={{ display: "none" }}
        inputProps={{ min: 0 }}
        {...register("branch_id", {
          setValueAs: (value) => (value === "" ? undefined : Number(value)),
        })}
        label="Branch ID"
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
