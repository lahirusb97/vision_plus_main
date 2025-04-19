import DoctorArival from "./DoctorArival";
import DoctorAbsent from "./DoctorAbsent";

import { Box } from "@mui/material";
export default function DoctorSheduleIndex() {
  return (
    <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
      <DoctorArival />
      <DoctorAbsent />
    </Box>
  );
}
