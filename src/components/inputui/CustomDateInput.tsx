import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";

interface CustomDateInputProps {
  disabledInput?: boolean;
  name: string;
  label: string;
}

export default function CustomDateInput({
  disabledInput,
  name,
  label,
}: CustomDateInputProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={null} // Default to empty
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <DatePicker
            disabled={disabledInput}
            {...field}
            label={label}
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
                error: watch(name) === "",
                helperText:
                  typeof errors[name]?.message === "string"
                    ? errors[name].message
                    : undefined,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
