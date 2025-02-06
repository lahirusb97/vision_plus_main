import React, { useEffect } from "react";
import { Input, Box, Button, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { useFormContext } from "react-hook-form";
import PowerToFrameFilter from "../../../components/PowerToFrameFilter";
import PowerToLenseFilter from "../../../components/PowerToLenseFilter";
interface dataList {
  id: number;
  name: string;
  brand: number;
}
export default function FactoryFromTwo({ handleNext, handleBack }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const location = useLocation();
  const { customerName, mobileNumber, date } = location.state || {
    customerName: "",
    mobileNumber: "",
    date: "",
  };
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
              {...register("customer_name")}
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
            <Typography>Address</Typography>
            <Input
              error={!!errors.customer_address}
              sx={inputStyle}
              {...register("customer_address")}
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
              error={!!errors.customer_mobile}
              sx={inputStyle}
              {...register("customer_mobile")}
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
              error={!!errors.customer_age}
              sx={inputStyle}
              {...register("customer_age")}
            />
          </Paper>
        </Paper>
      </Box>
      <PowerToFrameFilter />
      {/* <PowerToLenseFilter /> */}
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
        <Button onClick={handleBack} variant="contained">
          Back
        </Button>
        <Button onClick={handleNext} variant="contained">
          Next
        </Button>
      </Box>
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
