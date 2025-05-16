import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import FilterPatient from "../../../components/FilterPatient";

export default function ChannelPatientDetail() {
  const [openSearchDialog, setOpenSearchDialog] = useState({
    open: false,
    searchType: "",
  });

  const {
    register,
    watch,
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
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
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
          InputLabelProps={{
            shrink: Boolean(watch("phone_number")),
          }}
        />
      </Box>
      <TextField
        {...register("note")}
        label="Mobile Number 2"
        variant="outlined"
        type="text"
        size="small"
        fullWidth
        autoComplete="off"
      />
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
