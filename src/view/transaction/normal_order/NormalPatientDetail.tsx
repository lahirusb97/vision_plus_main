import {
  TextField,
  Box,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import { getBirthdateFromNIC } from "../../../utils/NictoBirthday";
import FilterPatient from "../../../components/FilterPatient";
import DateInput from "../../../components/inputui/DateInput";
import { birthdayToAge } from "../../../utils/BirthdayToAge";

export default function NormalPatientDetail() {
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
    if (watch("nic")?.length >= 10 && watch("nic") !== "") {
      setValue("dob", getBirthdateFromNIC(watch("nic")));
    } else {
      setValue("dob", null);
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

        <Box
          sx={{ display: "flex", flexGrow: 1, gap: 1, alignItems: "center" }}
        >
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DateInput />

            <Chip
              sx={{ p: 1, fontWeight: "bold" }}
              label={birthdayToAge(watch("dob"))}
            ></Chip>
          </Box>
        </Box>
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
