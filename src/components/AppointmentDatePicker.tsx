import React, { useState, useEffect } from "react";
import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Tooltip, CircularProgress, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import useGetDoctorShedule from "../hooks/useGetDoctorShedule";
// only for appointment purpose date picker
interface HighlightedDatePickerProps {
  selectedDate: string | null;
  onDateChange: (value: string | null) => void;
  label?: string;
  doctorId?: number; // Make doctorId configurable
}

const HighlightedPickersDay = styled(PickersDay)<PickersDayProps<Dayjs>>(
  ({ theme }) => ({
    backgroundColor: "#C41E3A", // or "#FFE082"
    color: theme.palette.getContrastText(theme.palette.primary.light),
    fontWeight: "bold",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  })
);

export default function AppointmentDatePicker({
  selectedDate,
  onDateChange,
  label = "Select Date",
  doctorId, // Default doctorId
}: HighlightedDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    doctorShedule: schedules,
    doctorSheduleLoading,
    error,
  } = useGetDoctorShedule(doctorId);

  // Fetch data when date picker opens

  const scheduleMap = React.useMemo(
    () =>
      schedules.reduce((acc, { date, start_time }) => {
        acc[date] = start_time;
        return acc;
      }, {} as Record<string, string>),
    [schedules]
  );

  const renderLoadingDay = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress size={20} />
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        format="YYYY-MM-DD"
        value={selectedDate ? dayjs(selectedDate) : null}
        onChange={(newValue: Dayjs | null) => {
          onDateChange(newValue ? newValue.format("YYYY-MM-DD") : null);
        }}
        disabled={!doctorId}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        slots={{
          day: (props) => {
            const dateStr = dayjs(props.day).format("YYYY-MM-DD");
            const time = scheduleMap[dateStr];

            if (doctorSheduleLoading) {
              return renderLoadingDay();
            }

            if (time) {
              return (
                <Tooltip title={`Available at ${time}`} arrow>
                  <span>
                    <HighlightedPickersDay {...props} />
                  </span>
                </Tooltip>
              );
            }

            return <PickersDay {...props} />;
          },
        }}
        slotProps={{
          textField: {
            size: "small", // <-- Makes the input field compact
          },
          popper: {
            sx: {
              "& .MuiPickersDay-root": {
                // Optional: Style for days in the calendar
              },
            },
          },
          actionBar: {
            actions: ["today", "cancel", "accept"],
          },
        }}
      />
    </LocalizationProvider>
  );
}
