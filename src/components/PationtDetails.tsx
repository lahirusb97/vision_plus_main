import {
  TextField,
  Box,
  Paper,
  Typography,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

import { useEffect, useState } from "react";
import DateInput from "./inputui/DateInput";
import FilterPatient from "./FilterPatient";
import { getBirthdateFromNIC } from "../utils/NictoBirthday";

import { SearchSharp } from "@mui/icons-material";
import { birthdayToAge } from "../utils/BirthdayToAge";
import { useFactoryOrderContext } from "../context/FactoryOrderContext";
export default function PationtDetails() {
  const { refractionDetail, singlerefractionNumber, refractionDetailLoading } =
    useFactoryOrderContext();

  const [openSearchDialog, setOpenSearchDialog] = useState({
    open: false,
    searchType: "",
  });

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (watch("nic")?.length >= 10) {
      const birthdate = getBirthdateFromNIC(watch("nic"));
      setValue("dob", ""); // Force clear first
      setTimeout(() => {
        setValue("dob", birthdate);
      }, 0); // Add a slight delay
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("nic")]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <FilterPatient
        open={openSearchDialog.open}
        searchType={openSearchDialog.searchType}
        handleClose={() => setOpenSearchDialog({ open: false, searchType: "" })}
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* <Button color="info" variant="contained">
          <History />
        </Button> */}
        <Paper
          sx={{
            p: 1,
            flexGrow: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={"bolder"}>
            R.N0: {singlerefractionNumber?.refraction_number}
          </Typography>
          <Typography fontWeight={"bolder"} color="error">
            {!refractionDetailLoading && refractionDetail?.prescription
              ? "Prescription "
              : !refractionDetailLoading && !refractionDetail?.prescription
              ? " "
              : ""}{" "}
          </Typography>
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setOpenSearchDialog({ open: true, searchType: "name" })
                  }
                >
                  <SearchSharp />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: Boolean(watch("name")),
          }}
        />
        <DateInput />

        <Chip
          sx={{ p: 1, fontWeight: "bold" }}
          label={birthdayToAge(watch("dob"))}
        ></Chip>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          {...register("phone_number")}
          error={!!errors.phone_number}
          sx={{ flexGrow: 1 }}
          size="small"
          label="Mobile Number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setOpenSearchDialog({
                      open: true,
                      searchType: "phone_number",
                    })
                  }
                >
                  <SearchSharp />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: Boolean(watch("phone_number")),
          }}
        />
        <TextField
          {...register("nic")}
          error={!!errors.nic}
          sx={{ flexGrow: 1 }}
          size="small"
          label="NIC"
          InputLabelProps={{
            shrink: Boolean(watch("nic")),
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setOpenSearchDialog({ open: true, searchType: "nic" })
                  }
                >
                  <SearchSharp />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TextField
        {...register("address")}
        error={!!errors.address}
        size="small"
        label="Address"
        InputLabelProps={{
          shrink: Boolean(watch("address")),
        }}
      />
    </Box>
  );
}
