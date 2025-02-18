import { Input, Box, Typography, Paper } from "@mui/material";

import { useFormContext } from "react-hook-form";
import PowerToFrameFilter from "../../../components/PowerToFrameFilter";
import PowerToLenseFilter from "../../../components/PowerToLenseFilter";

export default function FactoryFromTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Box sx={{ width: "1200px", marginY: 3, p: 2 }}>
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "right",
            gap: 2,
            p: 2,
            backgroundColor: "skyblue",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
              p: 0.5,
              alignItems: "center",
            }}
          >
            <Typography>Customer Name</Typography>
            <Input
              error={!!errors.customer_name}
              sx={inputStyle}
              {...register("name")}
            />
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
              p: 0.5,
              alignItems: "center",
            }}
          >
            <Typography>Nic</Typography>
            <Input error={!!errors.nic} sx={inputStyle} {...register("nic")} />
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
              p: 0.5,
              alignItems: "center",
            }}
          >
            <Typography>Address</Typography>
            <Input
              error={!!errors.address}
              sx={inputStyle}
              {...register("address")}
            />
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
              p: 0.5,
              alignItems: "center",
            }}
          >
            <Typography>Contact No.</Typography>
            <Input
              error={!!errors.phone_number}
              sx={inputStyle}
              {...register("phone_number")}
            />
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
              p: 0.5,
              alignItems: "center",
            }}
          >
            <Typography>Age</Typography>
            <Input
              type="number"
              error={!!errors.dob}
              sx={inputStyle}
              {...register("dob")}
            />
          </Paper>
        </Paper>
      </Box>
      <PowerToFrameFilter />
      <PowerToLenseFilter />
    </div>
  );
}
const inputStyle = {
  width: "300px",
  borderTop: "1px solid black",
  borderLeft: "1px solid black",
  borderRight: "1px solid black",
  padding: "0 0.4rem",
};
