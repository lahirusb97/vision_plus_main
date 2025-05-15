import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { AppointmentsTimeSlots } from "../../hooks/useGetAppointmentSlots";

interface BookedTimeSlotsDropdownProps {
  doctorId: number | null;
  appointmentSlots: AppointmentsTimeSlots[];
  appointmentSlotsLoading: boolean;
}

export default function BookedTimeSlotsDropdown({
  doctorId,
  appointmentSlots,
  appointmentSlotsLoading,
}: BookedTimeSlotsDropdownProps) {
  const isDisabled = !doctorId || appointmentSlots?.length === 0;

  return (
    <Box>
      <FormControl fullWidth size="small" disabled={isDisabled}>
        <InputLabel shrink>Bookings</InputLabel>

        {appointmentSlotsLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 1,
              ml: 1,
            }}
          >
            <CircularProgress size={18} />
            <Typography variant="body2">Loading...</Typography>
          </Box>
        ) : appointmentSlots.length > 0 ? (
          <Select sx={{ width: 200 }} value="" label="Bookings" displayEmpty>
            {appointmentSlots.map((slot) => (
              <MenuItem key={slot.time} value={slot.time}>
                {slot.time}-({slot.channel_no})
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography variant="body2" sx={{ mt: 1, ml: 1 }}>
            {isDisabled
              ? "Select a doctor & channel Date to view bookings."
              : "No bookings for this date."}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
}
