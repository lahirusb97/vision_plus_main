import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";

export default function DateInput() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        {...register("dob")}
        control={control}
        defaultValue={null} // Default to empty
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="Select Birth Day"
            value={field.value ? dayjs(field.value) : null} // Convert string to dayjs object
            onChange={(newValue) => {
              // Format the date to YYYY-MM-DD before updating the field
              const formattedDate = newValue
                ? newValue.format("YYYY-MM-DD")
                : null;
              field.onChange(formattedDate);
            }}
            format="YYYY-MM-DD"
            slotProps={{
              textField: {
                size: "small",
                sx: { width: 170 },
                error: watch("dob") === "",
                helperText:
                  typeof errors.dob?.message === "string"
                    ? errors.dob.message
                    : undefined,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
