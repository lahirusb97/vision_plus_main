import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

interface DateRange {
  start_date: Dayjs | null;
  end_date: Dayjs | null;
}

interface DateRangePickerManualProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangePickerManual({
  value,
  onChange,
}: DateRangePickerManualProps) {
  const handleFromChange = (newFrom: Dayjs | null) => {
    onChange({ ...value, start_date: newFrom });
  };

  const handleToChange = (newTo: Dayjs | null) => {
    onChange({ ...value, end_date: newTo });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={1}>
        <DatePicker
          label="Start Date"
          value={value.start_date}
          format="YYYY-MM-DD"
          onChange={handleFromChange}
          maxDate={value.end_date || undefined}
          slotProps={{ textField: { size: "small", sx: { width: 170 } } }}
        />
        <DatePicker
          label="End Date"
          value={value.end_date}
          format="YYYY-MM-DD"
          onChange={handleToChange}
          minDate={value.start_date || undefined}
          slotProps={{ textField: { size: "small", sx: { width: 170 } } }}
        />
      </Box>
    </LocalizationProvider>
  );
}
