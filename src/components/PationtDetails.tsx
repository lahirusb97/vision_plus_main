import { TextField, Box, Button, Paper, Typography, Chip } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { openStockDrawer } from "../features/invoice/stockDrawerSlice";
import { useEffect } from "react";
import DateInput from "./inputui/DateInput";
import FilterPatient from "./FilterPatient";
import { getBirthdateFromNIC } from "../utils/NictoBirthday";
import { birthdayToAge } from "../utils/BirthdayToAge";
import HidenNoteDialog from "./HidenNoteDialog";
export default function PationtDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const customerName = queryParams.get("customerName");
  const mobileNumber = queryParams.get("mobileNumber");
  const nic = queryParams.get("nic");
  const refractionNumber = queryParams.get("refractionNumber");

  const dispatch = useDispatch();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    if (customerName || mobileNumber) {
      setValue("name", customerName);
      setValue("phone_number", mobileNumber);
      setValue("nic", nic);
    }
  }, []);
  useEffect(() => {
    if (watch("nic").length >= 10) {
      const birthdate = getBirthdateFromNIC(watch("nic"));
      setValue("dob", ""); // Force clear first
      setTimeout(() => {
        setValue("dob", birthdate);
      }, 0); // Add a slight delay
    }
  }, [nic, watch("nic")]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* <Button color="info" variant="contained">
          <History />
        </Button> */}
        <Paper sx={{ p: 1, flexGrow: 2 }}>
          <Typography>R.N0: {refractionNumber}</Typography>
        </Paper>
        <Paper>
          <Typography sx={{ p: 1 }}>
            Date {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
        <TextField
          {...register("sales_staff_code")}
          error={!!errors.sales_staff_code}
          sx={{ width: 120 }}
          size="small"
          label="Staff Code"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          {...register("name")}
          error={!!errors.name}
          sx={{ flexGrow: 1 }}
          size="small"
          label="name"
        />
        <DateInput />
        {/* <TextField
          {...register("dob")}
          error={!!errors.dob}
          sx={{ width: 80 }}
          size="small"
          label="Age"
        /> */}
        <Chip
          sx={{ p: 1, fontWeight: "bold" }}
          label={birthdayToAge(watch("dob"))}
        ></Chip>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <FilterPatient />

        <TextField
          {...register("phone_number")}
          error={!!errors.phone_number}
          sx={{ flexGrow: 1 }}
          size="small"
          label="Mobile Number"
        />
        <TextField
          {...register("nic")}
          error={!!errors.nic}
          sx={{ flexGrow: 1 }}
          size="small"
          label="NIC"
        />
      </Box>
      <TextField
        {...register("address")}
        error={!!errors.address}
        size="small"
        label="Address"
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        <HidenNoteDialog />

        <Button
          onClick={() => dispatch(openStockDrawer("frame"))}
          color="primary"
          variant="contained"
        >
          Frames
        </Button>
        <Button
          onClick={() => dispatch(openStockDrawer("lense"))}
          color="primary"
          variant="contained"
        >
          Lense
        </Button>
        {/* <Button
            onClick={() => dispatch(openStockDrawer("none_stock_lense"))}
            color="secondary"
            variant="contained"
          >
            None Stock Lense
          </Button> */}
        <Button
          onClick={() => dispatch(openStockDrawer("other"))}
          color="secondary"
          variant="contained"
        >
          Other
        </Button>
      </Box>
    </Box>
  );
}
