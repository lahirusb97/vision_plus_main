import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import FilterPatient from "../../../components/FilterPatient";
import { getBirthdateFromNIC } from "../../../utils/NictoBirthday";
import DateInput from "../../../components/inputui/DateInput";
import { birthdayToAge } from "../../../utils/BirthdayToAge";

interface SolderingPatientDetailProps {
  disabledInput?: boolean;
}

export default function SolderingPatientDetail({
  disabledInput,
}: SolderingPatientDetailProps) {
  const [openSearchDialog, setOpenSearchDialog] = useState({
    open: false,
    searchType: "",
  });

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <FilterPatient
        open={openSearchDialog.open}
        searchType={openSearchDialog.searchType}
        handleClose={() => setOpenSearchDialog({ open: false, searchType: "" })}
      />

      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          sx={{ display: "flex", flexGrow: 1, gap: 1, alignItems: "center" }}
        >
          <TextField
            disabled={disabledInput}
            {...register("name")}
            error={!!errors.name}
            sx={{ flexGrow: 1 }}
            size="small"
            label="name"
            slotProps={{
              inputLabel: {
                shrink: Boolean(watch("name")),
              },
              input: {
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
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          disabled={disabledInput}
          {...register("phone_number")}
          error={!!errors.phone_number}
          sx={{ flexGrow: 1 }}
          size="small"
          label="Mobile Number"
          type="number"
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
          slotProps={{
            inputLabel: {
              shrink: Boolean(watch("phone_number")),
            },
          }}
        />
      </Box>
      <TextField
        disabled={disabledInput}
        {...register("nic")}
        error={watch("nic") === ""}
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
        onChange={(e) => {
          setValue("nic", e.target.value);
          // If value is valid, update DOB, else clear DOB
          if (e.target.value && e.target.value.length >= 10) {
            setValue("dob", getBirthdateFromNIC(e.target.value));
          } else {
            setValue("dob", null);
          }
        }}
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        <DateInput disabledInput={false} />
        <Chip
          sx={{ p: 1, fontWeight: "bold" }}
          label={birthdayToAge(watch("dob"))}
        ></Chip>
      </Box>
      <TextField
        disabled={disabledInput}
        {...register("address")}
        error={!!errors.address}
        size="small"
        label="Address"
        slotProps={{
          inputLabel: {
            shrink: Boolean(watch("address")),
          },
        }}
      />
    </Box>
  );
}
