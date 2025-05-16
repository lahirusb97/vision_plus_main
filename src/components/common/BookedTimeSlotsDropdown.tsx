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
  const noDoctorSelected = !doctorId;
  const noAppointments = appointmentSlots?.length === 0;
  const isDisabled = noDoctorSelected;

  return (
    <Box>
      <FormControl fullWidth size="small" disabled={isDisabled}>
        <InputLabel shrink>Bookings</InputLabel>

        {appointmentSlotsLoading ? (
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, ml: 1 }}
          >
            <CircularProgress size={18} />
            <Typography variant="body2">Loading...</Typography>
          </Box>
        ) : noAppointments ? (
          <Typography variant="body2" sx={{ mt: 1, ml: 1 }}>
            {noDoctorSelected
              ? "Select a doctor & channel date to view bookings."
              : "No appointments have been booked for this date."}
          </Typography>
        ) : (
          <Select sx={{ width: 200 }} value="" label="Bookings" displayEmpty>
            {appointmentSlots.map((slot) => (
              <MenuItem key={slot.time} value={slot.time}>
                {slot.time} - ({slot.channel_no})
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Box>
  );
}
