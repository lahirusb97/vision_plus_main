import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface SingleDatePickerProps {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

export default function SingleDatePicker({
  value,
  onChange,
}: SingleDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={value}
        onChange={onChange}
        slotProps={{ textField: { size: "small" } }}
      />
    </LocalizationProvider>
  );
}
