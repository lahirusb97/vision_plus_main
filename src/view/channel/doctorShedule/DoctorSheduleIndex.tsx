import DoctorArival from "./DoctorArival";
import DoctorAbsent from "./DoctorAbsent";
import PatientSheduleTransfer from "./PatientSheduleTransfer";
import { Box } from "@mui/material";
export default function DoctorSheduleIndex() {
  return (
    <Box>
      <DoctorArival />

      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <DoctorAbsent />
        <PatientSheduleTransfer />
      </Box>
    </Box>
  );
}
